import { Component } from "react";
import { EventMediator } from "../../mediator/EventMediator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";
import { GameManager } from "../../../game/GameManager.js";

class BaseOptionButton extends Component {
    constructor(props) {
        super(props);

        this.activeIcon = props.icons.activeIcon;
        this.inactiveIcon = props.icons.inactiveIcon;

        this.state = {
            isActive: false,
            isVisible: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleVisibility.bind(this));
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

    // Intended to be overriden.
    HandleTransitionEnd(event) { }

    ToggleVisibility() {
        this.setState((prevState) => ({
            isVisible: !prevState.isVisible
        }));
    }

    /* -------------------------------------------------------------------------- */
    /*                                    View                                    */
    /* -------------------------------------------------------------------------- */

    render() {
        const buttonClassName = `rounded-square-button column-button
            menu-button-skin ${this.state.isActive ? "active " : ""}
            option-button ${this.state.isVisible ? "fade-in" : "fade-out"}`;

        const icon = this.state.isActive ? this.activeIcon : this.inactiveIcon;

        return (
            <button
                className={buttonClassName}
                onClick={this.HandleClick.bind(this)}
                onTransitionEnd={this.HandleTransitionEnd.bind(this)}
                onMouseEnter={this.HandleMouseEnter.bind(this)}
                onMouseLeave={this.HandleMouseExit.bind(this)}>
                <FontAwesomeIcon icon={icon} className="option-icon"/>
            </button>
        );
    }
}

BaseOptionButton.propTypes = {
    icons: PropTypes.object.isRequired
};

export { BaseOptionButton };
