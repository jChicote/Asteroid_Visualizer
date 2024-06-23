import { Component } from "react";
import { EventMediator } from "../mediator/EventMediator.js";
import { ExpandMenuButton } from "./ExpandMenuButton.jsx";
import { FullScreenButton } from "./options/FullScreenButton.jsx";
import { LightIntensitySlider } from "./options/LightIntensitySlider.jsx";
import { LightOptionButton } from "./options/LightOptionButton.jsx";
import { ShowMarkerButton } from "./options/ShowMarkerButton.jsx";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { faLightbulb, faExpand, faLocationDot, faRotate } from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { DefaultPositionButton } from "./options/DefaultPositionButton.jsx";
import { OrbitalPathButton } from "./options/OrbitalPathButton.jsx";

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
                this.eventMediator.Notify("SetOptionPanelVisibility", false);
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleExpandedMenuVisibility.bind(this));
    }

    render() {
        return (
            <div id="options-menu">
                <div className="option-column">
                    <div className={"options-expanded-menu " + (this.state.isExpanded ? "visible" : "")}>
                        <LightOptionButton icons={{
                            activeIcon: faLightbulb,
                            inactiveIcon: faLightbulb
                        }}/>
                        <DefaultPositionButton icons={{
                            activeIcon: faRotate,
                            inactiveIcon: faRotate
                        }}/>
                        <OrbitalPathButton icons={{
                            activeIcon: faCircleDot,
                            inactiveIcon: faCircleDot
                        }}/>
                        <ShowMarkerButton icons={{
                            activeIcon: faLocationDot,
                            inactiveIcon: faLocationDot
                        }}/>
                        <FullScreenButton icons={{
                            activeIcon: faExpand,
                            inactiveIcon: faExpand
                        }}/>
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
