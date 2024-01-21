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
            isActive: false
        };
    }

    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    HandleClick(event) {
        console.log("Light button clicked");

        GameManager.gameObserver.Dispatch("ToggleCameraLight");
        this.eventMediator.Notify("ToggleLightIntensitySliderVisibility");

        this.setState((prevState) => ({
            isActive: !prevState.isActive
        }));
    }

    render() {
        return (
            <button
                className={"option-button column-button " + (this.state.isActive ? "active" : "")}
                onClick={this.HandleClick.bind(this)}
            >
                <FontAwesomeIcon icon={faLightbulb} className="option-icon"/>
            </button>
        );
    }
}

export { LightOptionButton };
