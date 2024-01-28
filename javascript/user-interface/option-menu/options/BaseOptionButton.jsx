import { Component } from "react";
import { EventMediator } from "../../mediator/EventMediator.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";

class BaseOptionButton extends Component {
    constructor(props) {
        super(props);

        this.icon = props.icon;

        this.state = {
            isActive: false,
            isVisible: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        this.setState((prevState) => ({
            isActive: !prevState.isActive
        }));
    }

    // Intended to be overriden.
    HandleTransitionEnd(event) { }

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
        const buttonClassName = `rounded-square-button column-button
            menu-button-skin ${this.state.isActive ? "active " : ""}
            option-button ${this.state.isVisible ? "fade-in" : "fade-out"}`;

        return (
            <button className={buttonClassName} onClick={this.HandleClick.bind(this)} onTransitionEnd={this.HandleTransitionEnd.bind(this)}>
                <FontAwesomeIcon icon={this.icon} className="option-icon"/>
            </button>
        );
    }
}

BaseOptionButton.propTypes = {
    icon: PropTypes.object.isRequired
};

export { BaseOptionButton };
