import { TimeControlButton } from "./TimeControlButton";
import { GameManager } from "../../game/GameManager.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

class PlayButton extends TimeControlButton {
    HandleClick(event) {
        super.HandleClick(event);

        GameManager.gameObserver.Dispatch("UpdateIsTimePaused", false);
    }

    render() {
        const buttonClassName = "rounded-square-button time-control-button menu-button-skin";
        return (
            <button id="play-pause-button" className={buttonClassName} onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faPlay} className="option-icon"/>
            </button>
        );
    }
}

export { PlayButton };
