import { Component } from "react";
import { GameManager } from "../../game/GameManager";

class TimeControlButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            isActive: false,
            timeRate: 0
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        this.setState((prevState) => ({
            isActive: !prevState.isActive
        }));
    }

    HandleMouseEnter(event) {
        GameManager.gameObserver.Dispatch("OnInterfaceEnter");
    }

    HandleMouseExit(event) {
        GameManager.gameObserver.Dispatch("OnInterfaceExit");
    }

    /* -------------------------------------------------------------------------- */
    /*                                    View                                    */
    /* -------------------------------------------------------------------------- */

    render() {
        const buttonClassName = "rounded-square-button time-control-button menu-button-skin";
        return (
            <button
                id="play-pause-button"
                className={buttonClassName}
                onClick={this.HandleClick.bind(this)}
                onMouseEnter={this.HandleMouseEnter.bind(this)}
                onMouseLeave={this.HandleMouseExit.bind(this)}></button>
        );
    }
}

export { TimeControlButton };
