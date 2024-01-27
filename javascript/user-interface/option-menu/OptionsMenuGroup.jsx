import { Component } from "react";
import { EventMediator } from "../mediator/EventMediator.js";
import { ExpandMenuButton } from "./ExpandMenuButton.jsx";
import { FullScreenButton } from "./FullScreenButton.jsx";
import { LightIntensitySlider } from "./LightIntensitySlider.jsx";
import { LightOptionButton } from "./LightOptionButton.jsx";
import { ShowMarkerButton } from "./ShowMarkerButton.jsx";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";

class OptionsMenuGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

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

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleExpandedMenuVisibility.bind(this));
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
