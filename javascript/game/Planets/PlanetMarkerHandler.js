import { GameManager } from "../GameManager";
import { MarkerState } from "../../user-interface/hover-markers/CelestialHoverMarker";
import { MathHelper } from "../../utils/math-library";
import { ObjectValidator } from "../../utils/ObjectValidator";

class PlanetMarkerHandler {
    constructor(props) {
        this.planetDelegate = props.planetDelegate;
        this.renderedObject = props.renderedObject;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    GetRaycastIntersects() {
        const raycasterDelegate = GameManager.gameObjectRegistry.GetGameObject("CameraRaycaster");
        const intersects = raycasterDelegate.RaycastToDestination(this.renderedObject);
        return intersects;
    }

    CheckIfInFrontOfObject(source, destination) {
        const planetDistance = MathHelper.GetDistanceBetweenObjects(this.renderedObject, source);
        const distance = MathHelper.GetDistanceBetweenObjects(destination, source);

        return planetDistance > distance;
    }

    UpdateMarker() {
        if (ObjectValidator.IsValid(this.marker)) {
            const camera = GameManager.gameObjectRegistry.GetGameObject("Camera"); // TODO: This should be its own event in the case the camera is loaded.
            const directionToObject = this.planetDelegate.GetRenderedObject().position
                .clone()
                .sub(camera.GetPosition())
                .normalize();
            const dotProduct = camera.GetWorldDirection().dot(directionToObject);

            if (dotProduct < 0) {
                this.marker.SetState(MarkerState.Hidden);
            } else {
                const intersects = this.GetRaycastIntersects();
                this.marker.UpdateMarkerState(
                    intersects.length > 0,
                    intersects.length > 0
                        ? this.CheckIfInFrontOfObject(
                            camera.GetControlledCamera(),
                            intersects[0].object)
                        : false
                );
            }

            this.marker.UpdatePosition({
                x: this.renderedObject.position.x,
                y: this.renderedObject.position.y,
                z: this.renderedObject.position.z
            });
        }
    }

    SetMarker(marker) {
        this.marker = marker;
    }
}

export { PlanetMarkerHandler };
