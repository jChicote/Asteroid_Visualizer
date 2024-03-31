import * as THREE from "three";

class CameraTransformHandler {
    constructor(mainCamera, cameraState, orbitControls, cameraController) {
        // Fields
        this.camera = mainCamera;
        this.cameraState = cameraState;
        this.lastPosition = new THREE.Vector3();
        this.lastRelativeDistance = 5;
        this.lastDirection = new THREE.Vector3();

        // Components
        this.orbitControls = orbitControls;
        this.cameraController = cameraController;
    }

    CaptureCameraLastPosition() {
        const cameraDirection = this.camera.GetPosition().clone().sub(this.cameraController.GetViewTargetPosition().clone());
        const newCameraPosition = this.cameraController.GetViewTargetPosition().clone().add(cameraDirection);

        this.lastPosition.copy(newCameraPosition);
        this.lastDirection.copy(cameraDirection.normalize());
    }

    CaptureCameraLastRelativeDistance() {
        const cameraDirection = this.camera.GetPosition().clone().sub(this.cameraController.GetViewTargetPosition().clone());
        const relativeDistance = cameraDirection.length();
        this.lastRelativeDistance = relativeDistance;
    }

    MaintainRelativeOrbitAroundTarget() {
        const direction = new THREE.Vector3().subVectors(
            this.camera.GetPosition(),
            this.cameraController.GetViewTargetPosition().clone()
        ).normalize();

        const newPosition = direction
            .multiplyScalar(this.lastRelativeDistance)
            .add(this.cameraController.GetViewTargetPosition());

        this.camera.SetPosition(newPosition);
    }

    FollowTarget() {
        if (!this.cameraController.IsControllerInteracting() && !this.cameraState.isZooming) {
            const relativePosition = this.cameraController.GetViewTargetPosition().clone().add(this.lastDirection.clone().multiplyScalar(this.lastRelativeDistance));
            this.camera.SetPosition(relativePosition);
        }

        // if (!this.cameraState.isZooming) {
        // this.CaptureCameraLastRelativeDistance();
        this.CaptureCameraLastPosition();
        this.MaintainRelativeOrbitAroundTarget();
        // }

        this.orbitControls.target.copy(this.cameraController.GetViewTargetPosition());
    }

    GetLastCameraPosition() {
        return this.lastPosition;
    }
}

export { CameraTransformHandler };
