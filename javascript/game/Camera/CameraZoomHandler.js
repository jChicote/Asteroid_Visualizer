import * as THREE from "../../../node_modules/three/build/three.module.js";
import { EventUtility } from "../../utils/EventUtility.js";
import { MathHelper } from "../../utils/math-library.js";

class CameraZoomHandler {
    constructor(
        camera,
        cameraController,
        zoomMaxDistance,
        zoomMinDistance,
        zoomSpeed) {
        // Fields
        this.camera = camera;
        this.cameraController = cameraController;
        this.zoomMaxDistance = zoomMaxDistance;
        this.zoomMinDistance = zoomMinDistance;
        this.zoomSignedDirection = 0.0;
        this.zoomSpeed = zoomSpeed; // Adjust this value based on your sensitivity preference

        // Components
        this.eventDebouncer = new EventUtility();
        this.OnMouseWheelEndEvent = this.eventDebouncer.Debounce(
            this.OnMouseWheelTimeout.bind(this),
            300
        );

        const canvas = document.getElementById("canvas-container");
        canvas.addEventListener("wheel", this.OnMouseWheel.bind(this));
    }

    OnMouseWheel(event) {
        this.cameraController.DisableLerp();
        this.zoomSignedDirection = Math.sign(event.deltaY);

        this.OnMouseWheelEndEvent();
    }

    OnMouseWheelTimeout() {
        this.zoomSignedDirection = 0.0;
    }

    CalculateZoom() {
        if (this.zoomSignedDirection === 0.0) {
            return;
        }

        console.log(this.zoomSignedDirection);

        const direction = new THREE.Vector3().subVectors(
            this.cameraController.GetViewTargetPosition().clone(),
            this.camera.GetPosition()
        ).normalize();

        let distance = this.camera.GetPosition()
            .distanceTo(this.cameraController.GetViewTargetPosition());
        distance += this.zoomSignedDirection * this.zoomSpeed; // This might be wrong. distance being the direction + the zoomspeed ????
        distance = MathHelper.Clamp(distance, this.zoomMinDistance, this.zoomMaxDistance);

        const newPosition = direction
            .multiplyScalar(-distance)
            .add(this.cameraController.GetViewTargetPosition());

        // Sets the last position to the current position if not interacting the orbit controls.
        if (!this.cameraController.IsControllerInteracting()) {
            this.cameraController.CaptureCameraLastPosition();
        } else {
            this.camera.SetPosition(newPosition);
        }
    }
}

export { CameraZoomHandler };
