import { Component } from "react";
import { EventMediator } from "../mediator/EventMediator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameManager } from "../../game/GameManager.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class MenuVisibilityButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            activeIcon: faEyeSlash,
            inactiveIcon: faEye
        };
    }
    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick() {
        this.eventObserver.Notify("ToggleMenuVisibility");

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
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventObserver = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    render() {
        const icon = this.state.isActive ? this.state.activeIcon : this.state.inactiveIcon;
        return (
            <button
                className="rounded-square-button menu-button-skin row-button"
                onClick={this.HandleClick.bind(this)}
                onMouseEnter={this.HandleMouseEnter.bind(this)}
                onMouseLeave={this.HandleMouseExit.bind(this)}>
                <FontAwesomeIcon icon={icon} className="option-icon"/>
            </button>
        );
    }
}

export { MenuVisibilityButton };
