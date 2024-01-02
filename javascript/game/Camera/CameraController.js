import * as THREE from "../../../node_modules/three/build/three.module.js";
import { OrbitControls } from "../../../addons/OrbitControls.js";
import { GameObject } from "../Entities/GameObject.js";

class CameraController extends GameObject {
    constructor(camera, renderer) {
        super({ camera, renderer });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);
        this.mainCamera = parameters.camera;
        this.renderer = parameters.renderer;
        this.cameraSpeed = 0.1;
        this.viewTargetPosition = new THREE.Vector3(0, 0, 0); // Default the sun as the origin.
        this.orbitControls = {};
    }

    Start() {
        // Setup default controls
        this.orbitControls = new OrbitControls(this.mainCamera.GetControlledCamera(), this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.update();

        this.mainCamera.SetPosition(new THREE.Vector3(0, 20, 100));
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
