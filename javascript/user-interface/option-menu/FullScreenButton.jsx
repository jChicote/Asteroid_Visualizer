import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

class FullScreenButton extends Component {
    HandleClick() {
        console.log("Fullscreen behaviour not implemented.");
    }

    render() {
        return (
            <button className="option-button column-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faExpand} className="option-icon"/>
            </button>
        );
    }
}

export { FullScreenButton };
