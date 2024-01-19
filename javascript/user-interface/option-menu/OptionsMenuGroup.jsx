import { Component } from "react";
import { ExpandMenuButton } from "./ExpandMenuButton.jsx";

class OptionsMenuGroup extends Component {
    render() {
        return (
            <div id="options-menu">
                <ExpandMenuButton />
            </div>
        );
    }
}

export { OptionsMenuGroup };
