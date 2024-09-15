import { TimeControlButton } from "./TimeControlButton";
import { GameManager } from "../../game/GameManager.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";

class PauseButton extends TimeControlButton {
    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        super.HandleClick(event);

        GameManager.gameObserver.Dispatch("UpdateIsTimePaused", true);
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    render() {
        const buttonClassName = "rounded-square-button time-control-button menu-button-skin";
        return (
            <button
                id="play-pause-button"
                className={buttonClassName}
                onClick={this.HandleClick.bind(this)}
                onMouseEnter={this.HandleMouseEnter.bind(this)}
                onMouseLeave={this.HandleMouseExit.bind(this)}>
                <FontAwesomeIcon icon={faPause} className="option-icon"/>
            </button>
        );
    }
}

export { PauseButton };
