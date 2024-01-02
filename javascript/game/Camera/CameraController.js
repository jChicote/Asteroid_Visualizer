import * as THREE from "../../../node_modules/three/build/three.module.js";
import { OrbitControls } from "../../../addons/OrbitControls.js";
import { GameObject } from "../Entities/GameObject.js";
import { CameraRaycaster } from "./CameraRaycaster.js";
import { GameManager } from "../GameManager.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";

class CameraController extends GameObject {
    constructor(camera, renderer) {
        super({ camera, renderer });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        this.cameraRaycaser = {};
        this.cameraSpeed = 0.1;
        this.mainCamera = parameters.camera;
        this.orbitControls = {};
        this.renderer = parameters.renderer;
        this.viewTargetPosition = {};
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.
        this.isLerping = false;
        this.dummyObject = {};

        this.lastPosition = new THREE.Vector3();
        this.isInteracting = false;

        const canvas = document.getElementById('canvas-container');

        canvas.addEventListener("mousedown", this.OnMouseDown.bind(this));
        canvas.addEventListener("mouseup", this.OnMouseUp.bind(this));

        GameManager.gameObserver.Subscribe("OnPointerEnter", this.SetNewViewTarget.bind(this));
    }

    Start() {
        this.mainCamera.SetPosition(new THREE.Vector3(0, 20, 100));

        this.dummyObject = new THREE.Object3D();
        GameManager.scene.add(this.dummyObject);

        this.dummyObject.add(this.mainCamera.GetControlledCamera());

        // Setup default controls
        this.orbitControls = new OrbitControls(this.mainCamera.GetControlledCamera(), this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.autoRotate = false;
        this.orbitControls.minDistance = 5;
        this.orbitControls.maxDistance = 100;
        this.orbitControls.target = this.viewTargetPosition;
        this.orbitControls.update();

        this.cameraRaycaster = new CameraRaycaster(this.mainCamera);
    }

    OnMouseUp(event) {
        // console.log("Mouse up");
        console.log("always up");
        this.isInteracting = false;
    }

    OnMouseDown(event) {
        console.log("Mouse down");
        this.isInteracting = true;
        console.log(this.isInteracting);
    }

    Update() {
        if (ObjectValidator.IsValid(this.viewTarget)) {
            this.FollowTarget(); // This does nothing.
            this.lastPosition.copy(this.mainCamera.GetControlledCamera().position).sub(this.viewTarget.object.position);
        }

        this.orbitControls.update();
    }

    FollowTarget() {
        const preferredDistance = 10;
        // const currentDistance = this.orbitControls.target.distanceTo(this.mainCamera.GetPosition());
        // const scalingFactor = preferredDistance / currentDistance;

        const targetObjectPosition = this.viewTarget.object.position.clone();
        console.log(this.isInteracting);
        if (!this.isInteracting) {
            console.log("Saving last position");
            this.mainCamera.GetControlledCamera().position.copy(targetObjectPosition).add(this.lastPosition);
        }

        // const cameraPosition = this.mainCamera.GetPosition().clone();
        // const direction = new THREE.Vector3().subVectors(cameraPosition, targetObjectPosition).normalize();
        // const offset = direction.multiplyScalar(6);
        // const viewPosition = new THREE.Vector3().addVectors(targetObjectPosition, offset);

        // this.mainCamera.TrackPosition(targetObjectPosition, targetPosition);
        // calculates direction and combines with orbit control target
        //this.dummyObject.position.copy(targetObjectPosition);
        this.orbitControls.target.copy(targetObjectPosition);

        // this.mainCamera.GetControlledCamera().position.copy(viewPosition);

        // this.mainCamera.GetControlledCamera().position.sub(this.orbitControls.target).multiplyScalar(scalingFactor).add(this.orbitControls.target);
        // this.orbitControls.target.copy(targetObjectPosition);
    }

    SetNewViewTargetPosition(targetPosition) {
        this.viewTargetPosition = targetPosition;
        this.isLerping = true;
        // this.orbitControls.enabled = false;
    }

    InterpolateToTargetPosition() {
        const cameraPosition = this.mainCamera.GetPosition();
        const direction = cameraPosition.sub(this.viewTarget.object.position.clone()).normalize();
        const offset = direction.multiplyScalar(-6);
        // const adjustedPosition = newPosition.add(offset);
        const targetPosition = this.viewTarget.object.position.add(offset);

        const distanceToTarget = cameraPosition.distanceTo(targetPosition);
        if (distanceToTarget > 5) {
            const directionToTarget = targetPosition
                .clone()
                .sub(cameraPosition)
                .normalize();
            const distanceToMove = distanceToTarget * this.cameraSpeed;

            const newPosition = this.mainCamera.GetPosition().add(directionToTarget.multiplyScalar(distanceToMove));

            this.mainCamera.TrackPosition(this.viewTargetPosition, newPosition);
            // this.orbitControls.target.copy(this.viewTarget.object.position);
        } else {
            this.isLerping = false;
            // this.orbitControls.target = this.viewTargetPosition;
            // this.orbitControls.enabled = true;
        }
    }

    SetNewViewTarget(target) {
        this.SetNewViewTargetPosition(target.object.position.clone());
        this.viewTarget = target;
    }
}

export { CameraController };
