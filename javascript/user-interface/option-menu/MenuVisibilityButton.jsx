import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { GameManager } from "../../game/GameManager";

class MenuVisibilityButton extends Component {
    HandleClick() {
        console.log("Button clicked");

        GameManager.gameObserver.Dispatch("ToggleMenuVisibility");
    }

    render() {
        return (
            <button className="option-button row-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faEye} className="option-icon"/>
            </button>
        );
    }
}

export { MenuVisibilityButton };
