import { Component } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { EventMediator } from "../mediator/EventMediator.js";
import { ExpandMenuButton } from "./ExpandMenuButton.jsx";
import { FullScreenButton } from "./FullScreenButton.jsx";
import { LightIntensitySlider } from "./LightIntensitySlider.jsx";
import { LightOptionButton } from "./LightOptionButton.jsx";
import { ShowMarkerButton } from "./ShowMarkerButton.jsx";

class OptionsMenuGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };
    }

    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleExpandedMenuVisibility.bind(this));
    }

    ToggleExpandedMenuVisibility() {
        this.setState((prevState) => ({
            isExpanded: !prevState.isExpanded
        }), () => {
            if (!this.state.isExpanded) {
                console.log("Hiding option panel");
                this.eventMediator.Notify("SetOptionPanelVisibility", false);
            }
        });
    }

    render() {
        return (
            <div id="options-menu">
                <div className="option-column">
                    <div className={"options-expanded-menu " + (this.state.isExpanded ? "visible" : "")}>
                        <LightOptionButton />
                        <ShowMarkerButton />
                        <FullScreenButton />
                    </div>
                    <ExpandMenuButton />
                </div>
                <div className={"option-column options-expanded-menu " + (this.state.isExpanded ? "visible" : "")}>
                    <LightIntensitySlider />
                </div>
            </div>
        );
    }
}

export { OptionsMenuGroup };
