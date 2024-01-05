import * as THREE from "../../../node_modules/three/build/three.module.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";
import { GameManager } from "../GameManager.js";

class CameraRaycaster {
    constructor(camera) {
        // Fields
        this.camera = camera;
        this.previousIntersect = null;
        this.currentIntersect = null;
        this.currentIntersectedState = IntersectState.NONE;
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        GameManager.gameObserver.Subscribe("OnMouseMove", this.OnMouseMove.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    OnMouseMove(event) {
        // Update mouse position with normalized device coordinates.
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.RaycastFromPointer(this.pointer);
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    RaycastFromPointer(pointer) {
        // Performs raycast
        this.raycaster.setFromCamera(pointer, this.camera.GetControlledCamera());

        const intersects = this.raycaster
            .intersectObjects(GameManager.scene.children, false)
            .filter(intersect =>
                ObjectValidator.IsValid(intersect.object.gameObject));
        this.SetCurrentState(intersects);
    }

    SetCurrentState(intersects) {
        if (intersects.length > 0 && this.currentIntersectedState === IntersectState.NONE) {
            this.currentIntersectedState = IntersectState.ENTER;
            this.currentIntersect = intersects[0];
            this.previousIntersect = intersects[0];
            // console.log("Enter");
            // GameManager.gameObserver.Dispatch("OnPointerEnter", this.currentIntersect);
        } else if (intersects.length > 0 && this.currentIntersect.identifier === this.previousIntersect.identifier) {
            this.currentIntersectedState = IntersectState.HOVER;
            this.previousIntersect = this.currentIntersect;
            // GameManager.gameObserver.Dispatch("OnPointerHover", { intersects });
        } else if (intersects.length === 0 && (this.currentIntersectedState === IntersectState.ENTER || this.currentIntersectedState === IntersectState.HOVER)) {
            this.currentIntersectedState = IntersectState.EXIT;
            this.currentIntersect = null;
            this.previousIntersect = null;
            // console.log("Exit");
            // GameManager.gameObserver.Dispatch("OnPointerExit", { intersects: this.currentIntersect });
        } else {
            this.currentIntersectedState = IntersectState.NONE;
        }
    }

    GetCurrentIntersect() {
        return this.currentIntersect;
    }
}

class IntersectState {
    static ENTER = "enter";
    static EXIT = "exit";
    static HOVER = "hover";
    static NONE = "none";
}

export { CameraRaycaster };
