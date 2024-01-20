import { Component } from "react";

class ExpandMenuButton extends Component {
    HandleClick() {
        console.log("has clicked");
    }

    render() {
        return (
            <button id="expand-button" onClick={this.HandleClick.bind(this)}>
            </button>
        );
    }
}

export { ExpandMenuButton };
