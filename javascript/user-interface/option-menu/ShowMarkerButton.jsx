import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { EventMediator } from "../mediator/EventMediator.js";

class ShowMarkerButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            hasFadedOut: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleClick() {
        console.log("Show marker behaviour not implemented.");
    }

    HandleTransitionEnd = (event) => {
        this.setState((prevState) => ({
            hasFadedOut: !prevState.hasFadedOut && prevState.isVisible
        }));
    };

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
        const buttonClassName = "rounded-square-button menu-button-skin column-button option-button " +
            (this.state.isVisible
                ? "fade-in"
                : "fade-out");

        return (
            <button className={buttonClassName} onClick={this.HandleClick.bind(this)} onTransitionEnd={this.HandleTransitionEnd.bind(this)}>
                <FontAwesomeIcon icon={faLocationDot} className="option-icon"/>
            </button>
        );
    }
}

export { ShowMarkerButton };
