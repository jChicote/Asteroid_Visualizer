import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { EventMediator } from "../mediator/EventMediator.js";

class FullScreenButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            hasFadedOut: false
        };
    }

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleVisibility.bind(this));
    }

    HandleClick() {
        console.log("Fullscreen behaviour not implemented.");
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

    render() {
        const buttonClassName = "rounded-square-button menu-button-skin column-button option-button " +
            (this.state.isVisible
                ? "fade-in"
                : "fade-out");

        return (
            <button className={buttonClassName} onClick={this.HandleClick.bind(this)} onTransitionEnd={this.HandleTransitionEnd.bind(this)}>
                <FontAwesomeIcon icon={faExpand} className="option-icon"/>
            </button>
        );
    }
}

export { FullScreenButton };
