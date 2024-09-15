import { BaseOptionButton } from "./BaseOptionButton.jsx";

class FullScreenButton extends BaseOptionButton {
    constructor(props) {
        super(props);

        this.state = {
            isActive: document.fullscreenElement !== null,
            isVisible: false,
            hasFadedOut: false
        };
    }

    HandleClick(event) {
        this.eventMediator.Notify("ToggleFullscreen");

        super.HandleClick(event);
    }
}

export { FullScreenButton };
