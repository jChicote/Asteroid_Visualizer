import { BaseOptionButton } from "./BaseOptionButton";
import { GameManager } from "../../../game/GameManager";

class OrbitalPathButton extends BaseOptionButton {
    constructor(props) {
        super(props);

        this.state = {
            isActive: true,
            isVisible: false,
            hasFadedOut: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        GameManager.gameObserver.Dispatch("ToggleOrbitalPathVisibility");

        super.HandleClick(event);
    }
}

export { OrbitalPathButton };
