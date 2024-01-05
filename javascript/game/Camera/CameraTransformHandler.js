import * as THREE from "../../../node_modules/three/build/three.module.js";

class CameraTransformHandler {
    constructor(mainCamera, orbitControls, cameraController) {
        // Fields
        this.camera = mainCamera;
        this.lastPosition = new THREE.Vector3();

        // Components
        this.orbitControls = orbitControls;
        this.cameraController = cameraController;
    }

    CaptureCameraLastPosition() {
        this.lastPosition.copy(this.camera.GetPosition()).sub(this.cameraController.GetViewTargetPosition());
    }

    FollowTarget() {
        if (!this.cameraController.IsControllerInteracting()) {
            this.camera.SetPosition(this.cameraController.GetViewTargetPosition()).add(this.lastPosition);
        }

        this.CaptureCameraLastPosition();
        this.orbitControls.target.copy(this.cameraController.GetViewTargetPosition());
    }

    GetLastCameraPosition() {
        return this.lastPosition;
    }
}

export { CameraTransformHandler };
