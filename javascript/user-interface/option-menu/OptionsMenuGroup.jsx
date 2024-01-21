import { Component } from "react";
import { ExpandMenuButton } from "./ExpandMenuButton.jsx";
import { FullScreenButton } from "./FullScreenButton.jsx";
import { LightOptionButton } from "./LightOptionButton.jsx";
import { ShowMarkerButton } from "./ShowMarkerButton.jsx";
import { LightIntensitySlider } from "./LightIntensitySlider.jsx";

class OptionsMenuGroup extends Component {
    render() {
        return (
            <div id="options-menu">
                <div className="option-column">
                    <LightOptionButton />
                    <ShowMarkerButton />
                    <FullScreenButton />
                    <ExpandMenuButton />
                </div>
                <div className="option-column">
                    <LightIntensitySlider />
                </div>
            </div>
        );
    }
}

export { OptionsMenuGroup };
