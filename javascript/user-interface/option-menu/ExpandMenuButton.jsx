import { Component } from "react";
import { EventMediator } from "../mediator/EventMediator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameManager } from "../../game/GameManager.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

class ExpandMenuButton extends Component {
    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick() {
        this.eventMediator.Notify("ToggleExpandedMenu");
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
        return (
            <button
                id="expand-menu-button"
                className="rounded-square-button menu-button-skin column-button"
                onClick={this.HandleClick.bind(this)}
                onMouseEnter={this.HandleMouseEnter.bind(this)}
                onMouseLeave={this.HandleMouseExit.bind(this)}>
                <FontAwesomeIcon icon={faSliders} className="option-icon"/>
            </button>
        );
    }
}

export { ExpandMenuButton };
