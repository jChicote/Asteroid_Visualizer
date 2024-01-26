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
            isVisible: false,
            isEnabled: false
        };
    }

    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleCameraLight", this.ToggleVisibility.bind(this));
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleEnabled.bind(this));
    }

    HandleSliderChange = (event) => {
        this.setState({ sliderValue: parseInt(event.target.value) });
        GameManager.gameObserver.Dispatch("SetCameraLightIntensity", this.state.sliderValue);
    };

    ToggleVisibility() {
        this.setState((prevState) => ({
            isVisible: !prevState.isVisible
        }));
    }

    ToggleEnabled() {
        this.setState((prevState) => ({
            isEnabled: !prevState.isEnabled
        }));
    }

    render() {
        const sliderValue = this.state.sliderValue;

        return (
            <div id="light-intensity" className={"vertical-slider-container " + (this.state.isVisible && this.state.isEnabled ? "visible" : "")}>
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

export { LightIntensitySlider };
