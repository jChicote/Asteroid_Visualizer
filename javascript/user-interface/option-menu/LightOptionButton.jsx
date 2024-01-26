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
        this.eventMediator.Notify("ToggleCameraLight");

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
