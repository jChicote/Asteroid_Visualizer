import { Component } from "react";

class LightOptionButton extends Component {
    HandleClick() {
        console.log("Light button clicked");
    }

    render() {
        return (
            <button id="light-button" onClick={this.HandleClick.bind(this)}>
            </button>
        );
    }
}

export { LightOptionButton };
