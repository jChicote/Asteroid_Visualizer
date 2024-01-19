import { Component } from "react";

class ExpandMenuButton extends Component {
    HandleClick() {
        console.log("has clicked");
    }

    render() {
        return (
            <button className="option-button" onClick={this.HandleClick.bind(this)}>
            </button>
        );
    }
}

export { ExpandMenuButton };
