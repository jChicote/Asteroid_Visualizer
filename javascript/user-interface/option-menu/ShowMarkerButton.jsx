import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

class ShowMarkerButton extends Component {
    HandleClick() {
        console.log("Show marker behaviour not implemented.");
    }

    render() {
        return (
            <button className="option-button column-button" onClick={this.HandleClick.bind(this)}>
                <FontAwesomeIcon icon={faLocationDot} className="option-icon"/>
            </button>
        );
    }
}

export { ShowMarkerButton };
