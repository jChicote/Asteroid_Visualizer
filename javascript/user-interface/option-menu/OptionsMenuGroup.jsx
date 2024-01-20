import { Component } from "react";
import { ExpandMenuButton } from "./ExpandMenuButton.jsx";
import { LightOptionButton } from "./LightOptionButton.jsx";

class OptionsMenuGroup extends Component {
    render() {
        return (
            <div id="options-menu">
                <div className="option-column">
                    <LightOptionButton />
                    <ExpandMenuButton />
                </div>
            </div>
        );
    }
}

export { OptionsMenuGroup };
