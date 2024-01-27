import { Component } from "react";
import { EventMediator } from "../mediator/EventMediator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { faEye } from "@fortawesome/free-solid-svg-icons";

class MenuVisibilityButton extends Component {
    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick() {
        this.eventObserver.Notify("ToggleMenuVisibility");
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventObserver = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    render() {
        return (
            <button className="rounded-square-button menu-button-skin row-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faEye} className="option-icon"/>
            </button>
        );
    }
}

export { MenuVisibilityButton };
