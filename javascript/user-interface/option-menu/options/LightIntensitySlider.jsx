import { Component } from "react";
import { EventMediator } from "../../mediator/EventMediator.js";
import { GameManager } from "../../../game/GameManager.js";
import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";

class LightIntensitySlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderValue: 50,
            isVisible: false,
            isEnabled: false,
            hasFadedOut: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    HandleSliderChange = (event) => {
        this.setState({ sliderValue: parseInt(event.target.value) });
        GameManager.gameObserver.Dispatch("SetCameraLightIntensity", this.state.sliderValue);
    };

    HandleTransitionEnd = (event) => {
        this.setState((prevState) => ({
            hasFadedOut: !prevState.hasFadedOut
        }));
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

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        // TODO: Tie to the game observer instead
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleCameraLight", this.ToggleVisibility.bind(this));
        this.eventMediator.Subscribe("ToggleExpandedMenu", this.ToggleEnabled.bind(this));
    }

    render() {
        const sliderValue = this.state.sliderValue;
        const sliderClassName = "vertical-slider-container " + (this.state.isVisible && this.state.isEnabled
            ? "fade-in"
            : "fade-out");

        return (
            <div id="light-intensity" className={sliderClassName} onTransitionEnd={this.HandleTransitionEnd.bind(this)}>
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
