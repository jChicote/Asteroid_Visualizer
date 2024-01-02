import * as THREE from "../../../node_modules/three/build/three.module.js";
import { OrbitControls } from "../../../addons/OrbitControls.js";
import { GameObject } from "../Entities/GameObject.js";
import { CameraRaycaster } from "./CameraRaycaster.js";

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
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.
    }

    Start() {
        this.cameraRaycaster = new CameraRaycaster(this.mainCamera);
        this.mainCamera.SetPosition(new THREE.Vector3(0, 20, 100));

        // Setup default controls
        this.orbitControls = new OrbitControls(this.mainCamera.GetControlledCamera(), this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.target = this.viewTargetPosition;
        this.orbitControls.update();
    }

    Update() {
        this.orbitControls.update();
    }

    SetViewTargetPosition(targetPosition) {
        this.viewTargetPosition = targetPosition;
    }

    InterpolateToTargetPosition() {
        const cameraPosition = this.mainCamera.position;
        const targetPosition = this.viewTargetPosition;

        const distanceToTarget = cameraPosition.distanceTo(targetPosition);

        if (distanceToTarget > 0.1) {
            const directionToTarget = targetPosition
                .clone()
                .sub(cameraPosition)
                .normalize();
            const distanceToMove = distanceToTarget * this.cameraSpeed;

            const newPosition = this.mainCamera.GetPosition().position.add(directionToTarget.multiplyScalar(distanceToMove));
            this.mainCamera.SetPosition(newPosition);
        }
    }
}

export { CameraController };
