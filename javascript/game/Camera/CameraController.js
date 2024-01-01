class CameraController {
    constructor(camera) {
        this.camera = camera;
        this.viewTargetPosition = new THREE.Vector3(0, 0, 0); // Default the sun as the origin.
    }

    SetViewTargetPosition(targetPosition) {
        this.viewTargetPosition = targetPosition;
    }

    InterpolateToTargetPosition() {
        const cameraPosition = this.camera.position;
        const targetPosition = this.viewTargetPosition;

        const distanceToTarget = cameraPosition.distanceTo(targetPosition);
        const cameraSpeed = 0.1;

        if (distanceToTarget > 0.1) {
            const directionToTarget = targetPosition.clone().sub(cameraPosition).normalize();
            const distanceToMove = distanceToTarget * cameraSpeed;

            this.camera.position.add(directionToTarget.multiplyScalar(distanceToMove));
        }
    }
}

export { CameraController };
