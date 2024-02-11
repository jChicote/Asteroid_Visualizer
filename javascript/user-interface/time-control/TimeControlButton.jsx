import { Component } from "react";

class TimeControlButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            isActive: false,
            timeRate: 0
        };
    }

    HandleClick(event) {
        this.setState((prevState) => ({
            isActive: !prevState.isActive
        }));
    }

    render() {
        const buttonClassName = "rounded-square-button time-control-button menu-button-skin";
        return (
            <button id="play-pause-button" className={buttonClassName} onClick={this.HandleClick.bind(this)}/>
        );
    }
}

export { TimeControlButton };
