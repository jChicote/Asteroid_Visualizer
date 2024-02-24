import { TimeControlButton } from "./TimeControlButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { EventMediator } from "../mediator/EventMediator.js";

class TimeControlRevealButton extends TimeControlButton {
    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    HandleClick() {
        this.eventMediator.Notify("ToggleTimeControlView");
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    render() {
        return (
            <button className="time-control-expand-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faCaretUp} className="time-control-icon"/>
                <p className="time-control-expand-button-text ">Time Controls</p>
                <FontAwesomeIcon icon={faCaretDown} className="time-control-icon"/>
            </button>
        );
    }
}

export { TimeControlRevealButton };
