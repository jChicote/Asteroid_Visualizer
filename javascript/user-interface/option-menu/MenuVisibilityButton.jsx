import { Component } from "react";
import { GameManager } from "../../game/GameManager";

class MenuVisibilityButton extends Component {
    HandleClick() {
        console.log("Button clicked");

        GameManager.gameObserver.Dispatch("ToggleMenuVisibility");
    }

    render() {
        return (
            <button className="option-button" onClick={this.HandleClick.bind(this)}></button>
        );
    }
}

export { MenuVisibilityButton };
