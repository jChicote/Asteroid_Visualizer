import { OrbitControls } from "../../../addons/OrbitControls.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";
import { MathHelper } from '../../utils/math-library.js';
import { GameObject } from "../Entities/GameObject.js";
import { GameManager } from "../GameManager.js";
import { CameraRaycaster } from "./CameraRaycaster.js";

class CameraController extends GameObject {
    constructor(camera, renderer) {
        super({ camera, renderer });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        this.cameraRaycaser = {};
        this.cameraSpeed = 0.1;
        this.scrollWheelSpeed = 1.5;
        this.mainCamera = parameters.camera;
        this.orbitControls = {};
        this.renderer = parameters.renderer;
        this.viewTargetPosition = {};
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.
        this.isLerping = false;
        this.dummyObject = {};
        this.currentScroll = 0.0;
        this.preferredDistance = 10.0;

        this.lastPosition = new THREE.Vector3();
        this.isInteracting = false;

        const canvas = document.getElementById("canvas-container");

        canvas.addEventListener("mousedown", this.OnMouseDown.bind(this));
        canvas.addEventListener("mouseup", this.OnMouseUp.bind(this));
        canvas.addEventListener("wheel", this.OnMouseWheel.bind(this));

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
        this.orbitControls.autoRotate = false
        this.orbitControls.enableZoom = true;
        this.orbitControls.minDistance = 5;
        this.orbitControls.maxDistance = 100;
        this.orbitControls.target = this.viewTargetPosition;
        this.orbitControls.update();

        this.cameraRaycaster = new CameraRaycaster(this.mainCamera);
    }

    OnMouseUp(event) {
        this.isInteracting = false;
    }

    OnMouseDown(event) {
        this.isInteracting = true;
    }

    OnMouseWheel(event) {
        this.preferredDistance += Math.sign(event.deltaY) * this.scrollWheelSpeed;
        this.preferredDistance = MathHelper.Clamp(this.preferredDistance, 0.0, 100);

        // if (ObjectValidator.IsValid(this.viewTarget)) {
        //     const scrollPosition = this.CalculateScrollPosition();
        //     this.mainCamera.SetPosition(scrollPosition);

        //     this.orbitControls.update();
        // }

        // const zoomSpeed = 0.1; // Adjust this value based on your sensitivity preference
        // const minDistance = 1;
        // const maxDistance = 100;

        // // Calculate the direction from the camera towards the orbit controls target
        // const direction = new THREE.Vector3().subVectors(this.orbitControls.target, this.mainCamera.GetPosition()).normalize();

        // // Calculate the new distance from the target
        // let distance = this.mainCamera.GetPosition().distanceTo(this.orbitControls.target);
        // distance += event.deltaY * zoomSpeed;

        // // Clamp the distance
        // distance = Math.max(minDistance, Math.min(distance, maxDistance));

        // // Calculate the new position
        // const newPosition = direction.multiplyScalar(distance).add(this.orbitControls.target);

        // // Update the camera position
        // this.mainCamera.GetControlledCamera().position.copy(newPosition);

        // // Update OrbitControls (if necessary)
        // this.orbitControls.update();
    }

    Update() {
        if (ObjectValidator.IsValid(this.viewTarget)) {
            this.orbitControls.enabled = true;
            this.FollowTarget(); // This does nothing.
            this.lastPosition.copy(this.mainCamera.GetControlledCamera().position).sub(this.viewTarget.object.position);
        }

        this.orbitControls.update();
    }

    CalculateScrollPosition() {
        const targetPosition = this.viewTarget.object.position.clone();
        const viewDirection = new THREE.Vector3().subVectors(this.mainCamera.GetPosition(), targetPosition).normalize();
        const scrollVector = viewDirection.multiplyScalar(this.preferredDistance);
        const finalPosition = targetPosition.add(scrollVector);

        return finalPosition;
    }

    FollowTarget() {
        // const currentDistance = this.orbitControls.target.distanceTo(this.mainCamera.GetPosition());
        // const scalingFactor = preferredDistance / currentDistance;

        const targetObjectPosition = this.viewTarget.object.position.clone();
        if (!this.isInteracting) {
            this.mainCamera.GetControlledCamera().position.copy(targetObjectPosition).add(this.lastPosition);
        }

        // const cameraPosition = this.mainCamera.GetPosition().clone();
        // const direction = new THREE.Vector3().subVectors(cameraPosition, targetObjectPosition).normalize();
        // const offset = direction.multiplyScalar(6);
        // const viewPosition = new THREE.Vector3().addVectors(targetObjectPosition, offset);

        // this.mainCamera.TrackPosition(targetObjectPosition, targetPosition);
        // calculates direction and combines with orbit control target
        //this.dummyObject.position.copy(targetObjectPosition);
        // this.orbitControls.target.copy(targetObjectPosition);

        // this.mainCamera.GetControlledCamera().position.copy(viewPosition);

        // this.mainCamera.GetControlledCamera().position.sub(this.orbitControls.target).multiplyScalar(scalingFactor).add(this.orbitControls.target);
        // this.orbitControls.target.copy(targetObjectPosition);
    }

    SetNewViewTargetPosition(targetPosition) {
        this.viewTargetPosition = targetPosition;
        this.isLerping = true;
        this.orbitControls.target.copy(this.viewTarget.object.position.clone());
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

