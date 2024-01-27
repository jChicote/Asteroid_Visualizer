import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { GameManager } from "../../game/GameManager.js";
import { EventMediator } from "../mediator/EventMediator.js";

class LightOptionButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            isVisible: false,
            hasFadedOut: false
        };
    }

    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleVisibility.bind(this));
    }

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

    render() {
        const buttonClassName = "rounded-square-button menu-button-skin column-button option-button " +
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
