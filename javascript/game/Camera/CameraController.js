import { OrbitControls } from "../../../addons/OrbitControls.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";
import { GameObject } from "../Entities/GameObject.js";
import { GameManager } from "../GameManager.js";
import { CameraRaycaster } from "./CameraRaycaster.js";
import { CameraZoomHandler } from "./CameraZoomHandler.js";

class CameraController extends GameObject {
    constructor(camera, renderer) {
        super({ camera, renderer });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.cameraRaycaster = {};
        this.cameraSpeed = 0.01;
        this.currentDirection = new THREE.Vector3();
        this.initialCameraPosition = new THREE.Vector3();
        this.isInteracting = false;
        this.isLerping = false;
        this.lastPosition = new THREE.Vector3();
        this.lerpFactor = 0.05;
        this.mainCamera = parameters.camera;
        this.orbitControls = {};
        this.renderer = parameters.renderer;
        this.targetRotation = new THREE.Quaternion();
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.

        this.zoomMaxDistance = 100;
        this.zoomMinDistance = 0.4;
        this.zoomSpeed = 0.2; // Adjust this value based on your sensitivity preference

        // Components
        this.cameraZoomHandler = new CameraZoomHandler(
            this.mainCamera,
            {
                CaptureCameraLastPosition: this.CaptureCameraLastPosition.bind(this),
                DisableLerp: this.DisableLerp.bind(this),
                GetViewTargetPosition: this.GetViewTargetPosition.bind(this),
                IsControllerInteracting: this.IsControllerInteracting.bind(this)
            },
            this.zoomMaxDistance,
            this.zoomMinDistance,
            this.zoomSpeed
        );
    }

    Awake() {
        // Handle Events
        // const onMouseWheelEndEvent = this.cameraZoomController.OnMouseWheelTimeout().bind(this.cameraZoomController);

        const canvas = document.getElementById("canvas-container");
        canvas.addEventListener("mousedown", this.OnMouseDown.bind(this));
        canvas.addEventListener("mouseup", this.OnMouseUp.bind(this));
        // canvas.addEventListener("wheel", this.OnMouseWheel.bind(this), 300);

        GameManager.gameObserver.Subscribe("OnPointerEnter", this.SetNewViewTarget.bind(this));
    }

    Start() {
        // Setup default controls
        this.orbitControls = new OrbitControls(this.mainCamera.GetControlledCamera(), this.renderer.domElement);
        this.orbitControls.enabled = true;
        this.orbitControls.enableDamping = true;
        this.orbitControls.enableZoom = false;
        this.orbitControls.minDistance = 0.4;
        this.orbitControls.maxDistance = 50;
        this.orbitControls.target = this.viewTargetPosition;
        this.orbitControls.update();

        this.cameraRaycaster = new CameraRaycaster(this.mainCamera);
    }

    // Events

    OnMouseUp(event) {
        this.isInteracting = false;
    }

    OnMouseDown(event) {
        this.isInteracting = true;
    }

    // OnMouseWheel(event) {
    //     this.DisableLerp();
    //     this.zoomSignedDirection = Math.sign(event.deltaY);
    //     setTimeout(this.OnMouseWheelTimeout.bind(this), 300);
    // }

    // OnMouseWheelTimeout() {
    //     this.zoomSignedDirection = 0.0;
    // }

    // Methods

    Update() {
        if (ObjectValidator.IsValid(this.viewTarget)) {
            this.viewTargetPosition = this.viewTarget.object.position.clone();
        } else {
            return;
        }

        if (this.isLerping) {
            this.InterpolateToTargetPosition();
        } else {
            this.cameraZoomHandler.CalculateZoom();
            this.FollowTarget();
            this.orbitControls.update();
        }
    }

    // CalculateZoom() {
    //     if (this.zoomSignedDirection === 0.0) {
    //         return;
    //     }

    //     const direction = new THREE.Vector3().subVectors(
    //         this.orbitControls.target,
    //         this.mainCamera.GetPosition()
    //     ).normalize();

    //     let distance = this.mainCamera.GetPosition().distanceTo(this.viewTargetPosition);
    //     distance += this.zoomSignedDirection * this.zoomSpeed; // This might be wrong. distance being the direction + the zoomspeed ????
    //     distance = MathHelper.Clamp(distance, this.zoomMinDistance, this.zoomMaxDistance);

    //     const newPosition = direction.multiplyScalar(-distance).add(this.viewTargetPosition);

    //     // Sets the last position to the current position if not interacting the orbit controls.
    //     if (!this.isInteracting) {
    //         this.lastPosition.copy(newPosition).sub(this.viewTargetPosition);
    //     } else {
    //         this.mainCamera.SetPosition(newPosition);
    //     }
    // }

    DisableLerp() {
        this.isLerping = false;
        this.orbitControls.enabled = true;
    }

    EnableLerp() {
        this.isLerping = true;
        this.orbitControls.enabled = false;
    }

    FollowTarget() {
        if (!this.isInteracting) {
            this.mainCamera.SetPosition(this.viewTargetPosition).add(this.lastPosition);
        }

        this.lastPosition.copy(this.mainCamera.GetPosition()).sub(this.viewTargetPosition);
        this.orbitControls.target.copy(this.viewTargetPosition);
    }

    GetTargetRotation() {
        const lookAtMatrix = new THREE.Matrix4().lookAt(
            this.mainCamera.GetPosition(),
            this.viewTargetPosition,
            new THREE.Vector3(0, 1, 0) // Up vector
        );

        return new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);
    }

    GetTargetPosition() {
        const initialCameraPosition = this.mainCamera.GetPosition();
        const offset = initialCameraPosition.clone().sub(this.viewTargetPosition).normalize().multiplyScalar(-5);
        const targetPosition = this.viewTargetPosition.clone().add(offset);

        return new THREE.Vector3().lerpVectors(
            initialCameraPosition,
            targetPosition,
            this.lerpFactor
        );
    }

    InterpolateToTargetPosition() {
        const newRotation = this.GetTargetRotation();
        const newPosition = this.GetTargetPosition();

        // Ensures that the positions are only updates if exceeding zoom distance
        const distanceToTarget = this.mainCamera.GetPosition().distanceTo(this.viewTargetPosition);
        if (distanceToTarget > this.zoomMinDistance) {
            this.mainCamera.SetPosition(newPosition);
            this.lastPosition.copy(this.mainCamera.GetPosition()).sub(this.viewTargetPosition);
        }

        this.mainCamera.GetControlledCamera().quaternion.slerp(newRotation, this.lerpFactor);

        if (distanceToTarget < 5 && this.IsRotationComplete(this.mainCamera.GetQuaternion(), newRotation, 0.01)) {
            this.DisableLerp();
        }
    }

    IsRotationComplete(currentQuaternion, targetQuaternion, threshold) {
        const dot = currentQuaternion.dot(targetQuaternion);
        const similarity = Math.abs(dot);
        return similarity > (1 - threshold);
    }

    SetNewViewTarget(target) {
        if (ObjectValidator.IsValid(this.viewTarget) &&
            this.viewTarget.object.gameObject.identifier === target.object.gameObject.identifier) {
            return;
        }

        this.initialCameraPosition = this.mainCamera.GetPosition();
        this.EnableLerp();
        this.viewTarget = target;
    }

    CaptureCameraLastPosition() {
        this.lastPosition.copy(this.mainCamera.GetPosition()).sub(this.viewTargetPosition);
    }

    IsControllerInteracting() {
        return this.isInteracting;
    }

    GetViewTargetPosition() {
        return this.viewTargetPosition;
    }
}

export { CameraController };
