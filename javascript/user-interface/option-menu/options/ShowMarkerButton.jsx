import { BaseOptionButton } from "./BaseOptionButton.jsx";

class ShowMarkerButton extends BaseOptionButton {
    constructor(props) {
        super(props);

        this.state = {
            isActive: true,
            isVisible: false,
            hasFadedOut: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick() {
        this.eventMediator.Notify("ToggleMarkers");
        this.setState({ isActive: !this.state.isActive });
    }
}

export { ShowMarkerButton };
