import { TimeControlButton } from "./TimeControlButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { GameManager } from "../../game/GameManager";

class ResetTimeButton extends TimeControlButton {
    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        super.HandleClick(event);

        GameManager.gameObserver.Dispatch("ResetTimeControls");
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
                <FontAwesomeIcon icon={faRotateRight} className="option-icon"/>
            </button>
        );
    }
}

export { ResetTimeButton };
