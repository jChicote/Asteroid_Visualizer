import { TimeControlButton } from "./TimeControlButton";
import { GameManager } from "../../game/GameManager.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

class ForwardTimeButton extends TimeControlButton {
    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        super.HandleClick(event);

        GameManager.gameObserver.Dispatch("UpdateTimeMultiplier", 1);
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    render() {
        const buttonClassName = "rounded-square-button time-control-button menu-button-skin";
        return (
            <button id="play-pause-button" className={buttonClassName} onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faForward} className="option-icon"/>
            </button>
        );
    }
}

export { ForwardTimeButton };
