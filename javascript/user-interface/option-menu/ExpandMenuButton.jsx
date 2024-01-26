import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer";
import { EventMediator } from "../mediator/EventMediator.js";

class ExpandMenuButton extends Component {
    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    HandleClick() {
        this.eventMediator.Notify("ToggleExpandedMenu");
        console.log("Toggling expanded menu");
    }

    render() {
        return (
            <button className="option-button column-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faSliders} className="option-icon"/>
            </button>
        );
    }
}

export { ExpandMenuButton };
