import * as THREE from "../../../node_modules/three/build/three.module.js";
import { OrbitControls } from "../../../addons/OrbitControls.js";
import { GameObject } from "../Entities/GameObject.js";

class CameraController extends GameObject {
    constructor(camera, renderer) {
        super();

        this.mainCamera = camera;
        this.cameraSpeed = 0.1;
        this.viewTargetPosition = new THREE.Vector3(0, 0, 0); // Default the sun as the origin.

        // Setup default controls
        this.orbitControls = new OrbitControls(this.mainCamera.GetControlledCamera(), renderer.domElement);
        this.orbitControls.enableDamping = true;
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
        }
    }
}

export { CameraController };
