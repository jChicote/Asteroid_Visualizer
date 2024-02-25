import { TimeControlButton } from "./TimeControlButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { EventMediator } from "../mediator/EventMediator.js";

class TimeControlRevealButton extends TimeControlButton {
    constructor() {
        super();

        this.state = {
            isHidden: false
        };
    }
    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    HandleClick() {
        this.eventMediator.Notify("ToggleTimeControlView");

        this.setState((prevState) => ({
            isHidden: !prevState.isHidden
        }));
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    render() {
        const caretUpIconClassName = `time-control-icon ${this.state.isHidden ? "hidden" : ""}`;
        const caretDownIconClassName = `time-control-icon ${this.state.isHidden ? "" : "hidden"}`;

        return (
            <div className="time-control-reveal-group">
                <button className="time-control-expand-button" onClick={this.HandleClick.bind(this)}>
                    <FontAwesomeIcon icon={faCaretUp} className={caretUpIconClassName}/>
                    <p className="time-control-expand-button-text ">Time Controls</p>
                    <FontAwesomeIcon icon={faCaretDown} className={caretDownIconClassName}/>
                </button>
            </div>
        );

        // <FontAwesomeIcon icon={faCaretUp} className={iconClassName}/>
    }
}

export { TimeControlRevealButton };
