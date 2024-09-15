import * as THREE from "three";

class CameraInterpolationHandler {
    constructor(
        camera,
        cameraController,
        cameraTransformer,
        cameraZoom,
        lerpFactor) {
        this.camera = camera;
        this.cameraController = cameraController;
        this.cameraTransform = cameraTransformer;
        this.cameraZoom = cameraZoom;

        this.lerpFactor = lerpFactor;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    GetTargetRotation() {
        const lookAtMatrix = new THREE.Matrix4().lookAt(
            this.camera.GetPosition(),
            this.cameraController.GetViewTargetPosition(),
            new THREE.Vector3(0, 1, 0) // Up vector
        );

        return new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);
    }

    GetTargetPosition() {
        const initialCameraPosition = this.camera.GetPosition();
        const offset = initialCameraPosition.clone().sub(this.cameraController.GetViewTargetPosition()).normalize().multiplyScalar(-5);
        const targetPosition = this.cameraController.GetViewTargetPosition().clone().add(offset);

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
        const distanceToTarget = this.camera.GetPosition().distanceTo(this.cameraController.GetViewTargetPosition());
        if (distanceToTarget > this.cameraZoom.GetMinZoomDistance()) {
            this.camera.SetPosition(newPosition);
            this.cameraTransform.CaptureCameraLastPosition();
            this.cameraTransform.CaptureCameraLastRelativeDistance();
        }

        this.camera.GetControlledCamera().quaternion.slerp(newRotation, this.lerpFactor);

        const endDistance = this.cameraController.GetTargetRadius() + this.cameraController.GetTargetRadius() * 3.3;
        if (distanceToTarget < endDistance && this.IsRotationComplete(this.camera.GetQuaternion(), newRotation, 0.01)) {
            this.cameraController.DisableLerp();
        }
    }

    IsRotationComplete(currentQuaternion, targetQuaternion, threshold) {
        const dot = currentQuaternion.dot(targetQuaternion);
        const similarity = Math.abs(dot);
        return similarity > (1 - threshold);
    }
}

export { CameraInterpolationHandler };
