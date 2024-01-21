import { Component } from "react";
import { GameManager } from "../../game/GameManager.js";

class LightIntensitySlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 50
        };
    }

    HandleSliderChange = (event) => {
        this.setState({ sliderValue: parseInt(event.target.value) });
        console.log("Value was changed to: " + event.target.value);

        GameManager.gameObserver.Dispatch("SetCameraLightIntensity", this.state.sliderValue);
    };

    render() {
        const sliderValue = this.state.sliderValue;

        return (
            <div id="light-intensity">
                <input
                    type="range"
                    className="vertical-slider"
                    min={10}
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
