import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

class ExpandMenuButton extends Component {
    HandleClick() {
        console.log("has clicked");
    }

    render() {
        return (
            <button className="option-button column-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faSliders} className="option-icon"/>
            </button>
        );
    }
}

export { ExpandMenuButton };
