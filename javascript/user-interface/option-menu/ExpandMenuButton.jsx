import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer";
import { EventMediator } from "../mediator/EventMediator.js";

class ExpandMenuButton extends Component {
    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick() {
        this.eventMediator.Notify("ToggleExpandedMenu");
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    render() {
        return (
            <button id="expand-menu-button" className="rounded-square-button menu-button-skin column-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faSliders} className="option-icon"/>
            </button>
        );
    }
}

export { ExpandMenuButton };
