import { BaseOptionButton } from "./BaseOptionButton.jsx";

class ShowMarkerButton extends BaseOptionButton {
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

    HandleClick() {
        this.eventMediator.Notify("ToggleMarkers");
    }
}

export { ShowMarkerButton };
