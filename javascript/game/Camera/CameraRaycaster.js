import * as THREE from "../../../node_modules/three/build/three.module.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";

class CameraRaycaster extends GameObject {
    constructor(camera) {
        super({ camera });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);
        this.camera = parameters.camera;
        this.previousIntersect = {};
        this.currentIntersect = {};
        this.currentIntersectedState = IntersectState.NONE;
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        window.addEventListener("pointermove", this.OnMouseMove.bind(this), false);
    }

    OnMouseMove(event) {
        // Update mouse position with normalized device coordinates.
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.RaycastFromPointer(this.pointer);
    }

    SetCurrentState(intersects) {
        if (intersects.length > 0 && this.currentIntersectedState === IntersectState.NONE) {
            this.currentIntersectedState = IntersectState.ENTER;
            this.currentIntersect = intersects[0];
            // console.log("Enter");
            GameManager.gameObserver.Dispatch("OnPointerEnter", this.currentIntersect);
        } else if (intersects.length > 0 && this.currentIntersect.identifier === this.previousIntersect.identifier) {
            this.currentIntersectedState = IntersectState.HOVER;
            this.previousIntersect = this.currentIntersect;
            console.log("Hover");
            // GameManager.gameObserver.Dispatch("OnPointerHover", { intersects });
        } else if (intersects.length === 0 && (this.currentIntersectedState === IntersectState.ENTER || this.currentIntersectedState === IntersectState.HOVER)) {
            this.currentIntersectedState = IntersectState.EXIT;
            this.currentIntersect = {};
            this.previousIntersect = {};
            console.log("Exit");
            // GameManager.gameObserver.Dispatch("OnPointerExit", { intersects: this.currentIntersect });
        } else {
            this.currentIntersectedState = IntersectState.NONE;
            // console.log("None");
        }
    }

    RaycastFromPointer(pointer) {
        this.raycaster.setFromCamera(pointer, this.camera.GetControlledCamera());

        const intersects = this.raycaster
            .intersectObjects(GameManager.scene.children, false)
            .filter(intersect =>
                ObjectValidator.IsValid(intersect.object.gameObject));
        this.SetCurrentState(intersects);
    }
}

class IntersectState {
    static ENTER = "enter";
    static EXIT = "exit";
    static HOVER = "hover";
    static NONE = "none";
}

export { CameraRaycaster };
