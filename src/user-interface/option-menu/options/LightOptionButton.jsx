import { GameManager } from "../../../game/GameManager.js";
import { BaseOptionButton } from "./BaseOptionButton.jsx";

class LightOptionButton extends BaseOptionButton {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            isVisible: false,
            hasFadedOut: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        GameManager.gameObserver.Dispatch("ToggleCameraLight");
        this.eventMediator.Notify("ToggleCameraLight");

        super.HandleClick(event);
    }
}

export { LightOptionButton };
