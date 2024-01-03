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

        this.cameraRaycaster = {};
        this.cameraSpeed = 0.01;
        this.isInteracting = false;
        this.isLerping = false;
        this.lerpFactor = 0.0;
        this.lastPosition = new THREE.Vector3();
        this.mainCamera = parameters.camera;
        this.orbitControls = {};
        this.renderer = parameters.renderer;
        this.scrollWheelSpeed = 1.5;
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.
        this.zoomDirection = 0.0;
        this.zoomMaxDistance = 100;
        this.zoomMinDistance = 0.4;
        this.zoomSpeed = 0.2; // Adjust this value based on your sensitivity preference

        const canvas = document.getElementById("canvas-container");
        canvas.addEventListener("mousedown", this.OnMouseDown.bind(this));
        canvas.addEventListener("mouseup", this.OnMouseUp.bind(this));
        canvas.addEventListener("wheel", this.OnMouseWheel.bind(this));

        GameManager.gameObserver.Subscribe("OnPointerEnter", this.SetNewViewTarget.bind(this));
    }

    Start() {
        this.mainCamera.SetPosition(new THREE.Vector3(0, 100, 100));

        // Setup default controls
        this.orbitControls = new OrbitControls(this.mainCamera.GetControlledCamera(), this.renderer.domElement);
        this.orbitControls.enabled = true;
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
    }

    OnMouseDown(event) {
        this.isInteracting = true;
    }

    OnMouseWheel(event) {
        this.isLerping = false;
        this.orbitControls.enabled = true;
        this.lerpFactor = 0.0;
        this.zoomDirection = Math.sign(event.deltaY);
        setTimeout(this.OnMouseWheelTimeout.bind(this), 300);
    }

    OnMouseWheelTimeout() {
        this.zoomDirection = 0.0;
    }

    // Methods

    Update() {
        if (ObjectValidator.IsValid(this.viewTarget)) {
            this.viewTargetPosition = this.viewTarget.object.position.clone();
        }

        if (this.isLerping) {
            this.InterpolateToTargetPosition();
        } else {
            this.CalculateZoom();
            this.FollowTarget();
            this.orbitControls.update();
        }

    }

    CalculateZoom() {
        if (this.zoomDirection === 0.0) {
            return;
        }

        const direction = new THREE.Vector3().subVectors(this.orbitControls.target, this.mainCamera.GetPosition()).normalize();
        let distance = this.mainCamera.GetPosition().distanceTo(this.viewTargetPosition);
        distance += this.zoomDirection * this.zoomSpeed;
        distance = MathHelper.Clamp(distance, this.zoomMinDistance, this.zoomMaxDistance);

        const newPosition = direction.multiplyScalar(-distance).add(this.viewTargetPosition);

        if (!this.isInteracting) {
            this.lastPosition.copy(newPosition).sub(this.viewTargetPosition);
        } else {
            this.mainCamera.SetPosition(newPosition);
        }
    }

    FollowTarget() {
        if (!this.isInteracting) {
            this.mainCamera.SetPosition(this.viewTargetPosition).add(this.lastPosition);
        }

        this.lastPosition.copy(this.mainCamera.GetPosition()).sub(this.viewTargetPosition);
        this.orbitControls.target.copy(this.viewTargetPosition);
    }

    InterpolateToTargetPosition() {
        this.orbitControls.enabled = false;

        const initialCameraPosition = this.mainCamera.GetPosition();
        const offset = initialCameraPosition.clone().sub(this.viewTargetPosition).normalize().multiplyScalar(this.zoomMinDistance);
        const targetPosition = this.viewTargetPosition.clone().add(offset);

        this.lerpFactor += 0.0002;

        const newPosition = initialCameraPosition.clone().lerp(targetPosition, this.lerpFactor);
        this.mainCamera.SetPosition(newPosition);
        this.lastPosition.copy(this.mainCamera.GetPosition()).sub(this.viewTargetPosition);
        // this.orbitControls.target.copy(this.viewTargetPosition);
        this.mainCamera.GetControlledCamera().lookAt(this.viewTargetPosition);

        const distanceToTarget = this.mainCamera.GetPosition().distanceTo(this.viewTargetPosition);
        console.log(distanceToTarget);
        if (distanceToTarget < 5) {
            this.isLerping = false;
            this.orbitControls.enabled = true;
            this.lerpFactor = 0.0;
        }
    }

    SetNewViewTarget(target) {
        if (ObjectValidator.IsValid(this.viewTarget) &&
            this.viewTarget.object.gameObject.identifier === target.object.gameObject.identifier) {
            return;
        }

        this.viewTarget = target;
        this.isLerping = true;
        this.orbitControls.enabled = false;
    }
}

export { CameraController };
