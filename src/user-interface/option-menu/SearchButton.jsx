import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

class SearchButton extends Component {
    render() {
        return (
            <button className="option-button column-button">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="option-icon"/>
            </button>
        );
    }
}

export { SearchButton };
