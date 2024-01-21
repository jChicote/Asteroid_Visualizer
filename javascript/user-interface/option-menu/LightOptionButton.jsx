import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { GameManager } from "../../game/GameManager.js";

class LightOptionButton extends Component {
    HandleClick() {
        console.log("Light button clicked");

        GameManager.gameObserver.Dispatch("ToggleCameraLight");
    }

    render() {
        return (
            <button className="option-button column-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faLightbulb} className="option-icon"/>
            </button>
        );
    }
}

export { LightOptionButton };
