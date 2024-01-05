import { CameraRaycaster } from "./CameraRaycaster.js";
import { GameManager } from "../GameManager.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";

class CelestialObjectSelector {
    constructor(camera) {
        // Fields
        this.selectedObject = null;

        // Components
        this.cameraRaycaster = new CameraRaycaster(camera);

        GameManager.gameObserver.Subscribe("OnClick", this.SelectObject.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    SelectObject() {
        const intersect = this.cameraRaycaster.GetCurrentIntersect();

        if (ObjectValidator.IsValid(intersect)) {
            this.selectedObject = intersect;
            GameManager.gameObserver.Dispatch("OnTargetSelected", this.selectedObject);
        } else {
            this.selectedObject = null;
        }
    }
}

export { CelestialObjectSelector };
