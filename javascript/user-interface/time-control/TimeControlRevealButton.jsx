import { TimeControlButton } from "./TimeControlButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { EventMediator } from "../mediator/EventMediator.js";
import { GameManager } from "../../game/GameManager.js";

class TimeControlRevealButton extends TimeControlButton {
    constructor() {
        super();

        this.state = {
            isHidden: true
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

    // Tech-Debt: #152
    // This does not belong here. This should belong to its own presenter class instead of being in the view.
    OnMouseDown(event) {
        const controlArea = document.getElementById("timeControlArea");
        const rect = controlArea.getBoundingClientRect();

        const isOverControlArea = (event.clientX >= rect.left) &&
                                    (event.clientX <= rect.right) &&
                                    (event.clientY >= rect.top) &&
                                    (event.clientY <= rect.bottom);

        if (!isOverControlArea && !this.state.isHidden) {
            this.eventMediator.Notify("ToggleTimeControlView");

            this.setState((prevState) => ({
                isHidden: !prevState.isHidden
            }));
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        GameManager.gameObserver.Subscribe("OnMouseDown", this.OnMouseDown.bind(this));
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    render() {
        const caretUpIconClassName = `time-control-icon ${this.state.isHidden ? "" : "hidden"}`;
        const caretDownIconClassName = `time-control-icon ${this.state.isHidden ? "hidden" : ""}`;

        return (
            <div className="time-control-reveal-group">
                <button className="time-control-expand-button" onClick={this.HandleClick.bind(this)}>
                    <FontAwesomeIcon icon={faCaretUp} className={caretUpIconClassName}/>
                    <p className="time-control-expand-button-text ">Time Controls</p>
                    <FontAwesomeIcon icon={faCaretDown} className={caretDownIconClassName}/>
                </button>
            </div>
        );
    }
}

export { TimeControlRevealButton };
