import { Component } from "react";
import { EventMediator } from "../mediator/EventMediator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameManager } from "../../game/GameManager.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

class LightOptionButton extends Component {
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

        this.setState((prevState) => ({
            isActive: !prevState.isActive
        }));
    }

    ToggleVisibility() {
        this.setState((prevState) => ({
            isVisible: !prevState.isVisible
        }));
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleVisibility.bind(this));
    }

    render() {
        const buttonClassName = "rounded-square-button " +
            "menu-button-skin " + (this.state.isActive ? "active " : "") +
            "column-button option-button " +
            (this.state.isVisible
                ? "fade-in"
                : "fade-out");

        return (
            <button className={buttonClassName} onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faLightbulb} className="option-icon"/>
            </button>
        );
    }
}

export { LightOptionButton };
