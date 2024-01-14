import { GameManager } from "../../GameManager.js";

class EventManager {
    constructor() {
        const canvas = document.getElementById("root");
        canvas.addEventListener("mousedown", this.OnMouseDown.bind(this));
        canvas.addEventListener("mouseup", this.OnMouseUp.bind(this));
        canvas.addEventListener("click", this.OnMouseClick.bind(this), false);
        canvas.addEventListener("pointermove", this.OnMouseMove.bind(this), false);
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    OnMouseMove(event) {
        GameManager.gameObserver.Dispatch("OnMouseMove", event);
    }

    OnMouseClick(event) {
        GameManager.gameObserver.Dispatch("OnClick", event);
    }

    OnMouseUp(event) {
        GameManager.gameObserver.Dispatch("OnMouseUp", event);
    }

    OnMouseDown(event) {
        GameManager.gameObserver.Dispatch("OnMouseDown", event);
    }
}

export { EventManager };
