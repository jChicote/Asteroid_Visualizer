import { Component } from "react";

class TimeControlButton extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            isActive: false,
            isVisible: false
        };
    }

    render() {
        const buttonClassName = "rounded-square-button time-control-button menu-button-skin";
        return (
            <button id="play-pause-button" className={buttonClassName} />
        );
    }
}

export { TimeControlButton };
