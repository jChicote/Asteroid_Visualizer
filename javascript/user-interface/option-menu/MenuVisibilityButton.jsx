import { Component } from "react";
import { GameManager } from "../../game/GameManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

class MenuVisibilityButton extends Component {
    HandleClick() {
        console.log("Button clicked");

        GameManager.gameObserver.Dispatch("ToggleMenuVisibility");
    }

    render() {
        return (
            <button className="option-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faEye} className="option-icon"/>
            </button>
        );
    }
}

export { MenuVisibilityButton };
