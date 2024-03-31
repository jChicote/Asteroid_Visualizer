import * as THREE from "three";
import { EventUtility } from "../../utils/EventUtility.js";
import { MathHelper } from "../../utils/math-library.js";
import { GameManager } from "../GameManager.js";

class CameraZoomHandler {
    constructor(
        camera,
        cameraState,
        cameraController,
        cameraTransform,
        zoomMaxDistance,
        zoomMinDistance,
        zoomSpeed) {
        // Fields
        this.camera = camera;
        this.cameraState = cameraState;
        this.cameraController = cameraController;
        this.cameraTransform = cameraTransform;
        this.isZooming = false;
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

        GameManager.gameObserver.Subscribe("OnWheelScroll", this.OnMouseWheel.bind(this));

        // const canvas = document.getElementById("root");
        // canvas.addEventListener("wheel", this.OnMouseWheel.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    OnMouseWheel(event) {
        this.cameraController.DisableLerp();
        this.zoomSignedDirection = Math.sign(event.deltaY);
        this.cameraState.isZooming = true;

        this.OnMouseWheelEndEvent();
    }

    OnMouseWheelTimeout() {
        this.cameraState.isZooming = false;
        this.zoomSignedDirection = 0.0;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    CalculateZoom() {
        if (!MathHelper.IsNotZero(this.zoomSignedDirection)) {
            return;
        }

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

        if (this.cameraState.isZooming) {
            this.camera.SetPosition(newPosition);
            this.cameraTransform.CaptureCameraLastPosition();
            this.cameraTransform.CaptureCameraLastRelativeDistance();
        }
    }

    SetMinZoomDistance(radius) {
        this.zoomMinDistance = radius + (2 * radius);
    }

    GetMaxZoomDistance() {
        return this.zoomMaxDistance;
    }

    GetMinZoomDistance() {
        return this.zoomMinDistance;
    }
}

export { CameraZoomHandler };
