import { Component } from "react";
import { ExpandMenuButton } from "./ExpandMenuButton.jsx";
import { FullScreenButton } from "./FullScreenButton.jsx";
import { LightOptionButton } from "./LightOptionButton.jsx";

class OptionsMenuGroup extends Component {
    render() {
        return (
            <div id="options-menu">
                <div className="option-column">
                    <LightOptionButton />
                    <FullScreenButton />
                    <ExpandMenuButton />
                </div>
            </div>
        );
    }
}

export { OptionsMenuGroup };
