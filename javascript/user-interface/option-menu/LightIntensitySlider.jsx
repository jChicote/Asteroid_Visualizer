import { Component } from "react";
import { EventMediator } from "../mediator/EventMediator.js";
import { GameManager } from "../../game/GameManager.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";

class LightIntensitySlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 50,
            isActive: false
        };
    }

    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleLightIntensitySliderVisibility", this.ToggleVisibility.bind(this));
    }

    HandleSliderChange = (event) => {
        this.setState({ sliderValue: parseInt(event.target.value) });
        GameManager.gameObserver.Dispatch("SetCameraLightIntensity", this.state.sliderValue);
    };

    ToggleVisibility() {
        console.log("Toggle visibility");
        this.setState((prevState) => ({
            isActive: !prevState.isActive
        }));
    }

    render() {
        const sliderValue = this.state.sliderValue;

        return (
            <div id="light-intensity" className={"vertical-slider-container " + (this.state.isActive ? "visible" : "")}>
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
