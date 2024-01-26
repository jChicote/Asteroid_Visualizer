import { Component } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { GameManager } from "../../game/GameManager.js";
import { EventMediator } from "../mediator/EventMediator.js";

class LightIntensitySlider extends Component {
    constructor(props) {
        super(props);

        // initial state
        this.state = {
            sliderValue: 50,
            visibility: VisibilityState.Inactive
        };
    }

    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        // this.eventMediator.Subscribe("EnableLightIntensitySlider", this.ToggleEnabled.bind(this));
        this.eventMediator.Subscribe("ToggleCameraLight", this.ToggleVisibility.bind(this));
    }

    HandleSliderChange = (event) => {
        this.setState({ sliderValue: parseInt(event.target.value) });
        GameManager.gameObserver.Dispatch("SetCameraLightIntensity", this.state.sliderValue);
    };

    // WHEN EXPANDED BUT ACTIVE = {Active: true, Visible: true}
    // WHEN EXPANDED BUT INACTIVE = {Active: false, Visible: false}
    // WHEN HIDDEN BUT INACTIVE = {Active: false, Visible: false}
    // WHEN HIDDEN BUT ACTIVE = {Active: false, Visible: true}

    // NEW ENUM:
    // ElementState.Active
    // ElementState.Inactive
    // ElementState.hidden

    ToggleVisibility() {
        this.setState((prevState) => ({
            visibility: (prevState.visibility !== VisibilityState.Hidden
                ? (prevState.visibility === VisibilityState.Inactive
                    ? VisibilityState.Active
                    : VisibilityState.Inactive)
                : prevState.visibility)
        }), () => {
            console.log(this.state.visibility);
        });
    }

    RevealElement() {
        this.setState({
            visibility: VisibilityState.Active
        });
    }

    SetElementToHidden() {
        this.setState({
            visibility: VisibilityState.Hidden
        });
    }

    render() {
        const sliderValue = this.state.sliderValue;
        const visibility = this.state.visibility;

        return (
            <div id="light-intensity" className={"vertical-slider-container " + (visibility === VisibilityState.Active ? "visible" : "")}>
                <input
                    type="range"
                    className="vertical-slider"
                    min={1}
                    max={200}
                    value={sliderValue}
                    onChange={this.HandleSliderChange}
                    orient="vertical"
                />
            </div>
        );
    }
}

const VisibilityState = {
    Active: "Active",
    Inactive: "Inactive",
    Hidden: "Hidden"
};

export { LightIntensitySlider };
