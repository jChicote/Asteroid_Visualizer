import { OrbitControls } from "../../../addons/OrbitControls.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";
import { MathHelper } from "../../utils/math-library.js";
import { GameObject } from "../Entities/GameObject.js";
import { GameManager } from "../GameManager.js";
import { CameraRaycaster } from "./CameraRaycaster.js";

class CameraController extends GameObject {
    constructor(camera, renderer) {
        super({ camera, renderer });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        this.cameraSpeed = 0.1;
        this.isInteracting = false;
        this.isLerping = false;
        this.lastPosition = new THREE.Vector3();
        this.mainCamera = parameters.camera;
        this.orbitControls = {};
        this.renderer = parameters.renderer;
        this.scrollDirection = 0.0;
        this.scrollWheelSpeed = 1.5;
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.

        const canvas = document.getElementById("canvas-container");
        canvas.addEventListener("mousedown", this.OnMouseDown.bind(this));
        canvas.addEventListener("mouseup", this.OnMouseUp.bind(this));
        canvas.addEventListener("wheel", this.OnMouseWheel.bind(this));

        GameManager.gameObserver.Subscribe("OnPointerEnter", this.SetNewViewTarget.bind(this));
    }

    Start() {
        this.mainCamera.SetPosition(new THREE.Vector3(0, 20, 100));

        // Setup default controls
        this.orbitControls = new OrbitControls(this.mainCamera.GetControlledCamera(), this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.autoRotate = false;
        this.orbitControls.enableZoom = false;
        this.orbitControls.minDistance = 2;
        this.orbitControls.maxDistance = 20;
        this.orbitControls.target = this.viewTargetPosition;
        this.orbitControls.update();

        this.cameraRaycaster = new CameraRaycaster(this.mainCamera);
    }

    // Events

    OnMouseUp(event) {
        this.isInteracting = false;
        this.orbitControls.enabled = false;
    }

    OnMouseDown(event) {
        this.isInteracting = true;
        this.orbitControls.enabled = true;
    }

    OnMouseWheel(event) {
        this.scrollDirection = Math.sign(event.deltaY);
        setTimeout(this.OnMouseWheelTimeout.bind(this), 300);
    }

    OnMouseWheelTimeout() {
        this.scrollDirection = 0.0;
    }

    Update() {
        if (!ObjectValidator.IsValid(this.viewTarget)) {
            return;
        }

        this.orbitControls.enabled = true;
        this.FollowTarget(); // This does nothing.

        this.lastPosition.copy(this.mainCamera.GetControlledCamera().position).sub(this.viewTarget.object.position);
        this.CalculateScrollPosition();

        this.orbitControls.update();
    }

    CalculateScrollPosition() {
        if (this.scrollDirection === 0.0) {
            return;
        }

        const zoomSpeed = 0.2; // Adjust this value based on your sensitivity preference
        const minDistance = 0.4;
        const maxDistance = 100;

        const direction = new THREE.Vector3().subVectors(this.orbitControls.target, this.mainCamera.GetPosition()).normalize();

        let distance = this.mainCamera.GetPosition().distanceTo(this.orbitControls.target);
        distance += this.scrollDirection * zoomSpeed;
        distance = MathHelper.Clamp(distance, minDistance, maxDistance);

        const newPosition = direction.multiplyScalar(-distance).add(this.orbitControls.target);

        if (!this.isInteracting) {
            this.lastPosition.copy(newPosition).sub(this.viewTarget.object.position);
        } else {
            this.mainCamera.GetControlledCamera().position.copy(newPosition);
            this.orbitControls.update();
        }
    }

    FollowTarget() {
        const targetObjectPosition = this.viewTarget.object.position.clone();
        if (!this.isInteracting) {
            this.mainCamera.SetPosition(targetObjectPosition).add(this.lastPosition);
        }

        this.orbitControls.target.copy(targetObjectPosition);
    }

    SetNewViewTargetPosition(targetPosition) {
        this.viewTargetPosition = targetPosition;
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
        this.viewTarget = target;
        this.SetNewViewTargetPosition(target.object.position.clone());
        this.isLerping = true;
    }
}

export { CameraController };
