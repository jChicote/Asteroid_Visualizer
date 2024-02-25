import { Component } from "react";
import { ForwardTimeButton } from "./ForwardTimeButton.jsx";
import { ReverseTimeButton } from "./ReverseTimeButton.jsx";
import { PauseButton } from "./PauseButton.jsx";
import { PlayButton } from "./PlayButton.jsx";
import { ResetTimeButton } from "./ResetTimeButton.jsx";
import { GameManager } from "../../game/GameManager.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { EventMediator } from "../mediator/EventMediator.js";
import { TimeControlRevealButton } from "./TimeControlRevealButton.jsx";

class TimeControlScreen extends Component {
    constructor() {
        super();

        this.state = {
            reverseMultiplier: 0,
            forwardMultiplier: 0,
            isHidden: true
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    UpdateMultiplierState(props) {
        this.setState({
            reverseMultiplier: props.reverseMultiplier,
            forwardMultiplier: props.forwardMultiplier
        });
    }

    OnTimeControlToggle() {
        this.setState((prevState) => ({
            isHidden: !prevState.isHidden
        }));
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        GameManager.gameObserver.Subscribe("UpdateTimeMultiplierEnd", this.UpdateMultiplierState.bind(this));

        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleTimeControlView", this.OnTimeControlToggle.bind(this));
    }

    render() {
        const reverseMultiplier = `${this.state.reverseMultiplier}x`;
        const forwardMultiplier = `${this.state.forwardMultiplier}x`;

        const timeControlGroupClassName = `time-control-button-group ${this.state.isHidden ? "fade-out" : "fade-in"}`;

        return (
            <div className="centered-canvas">
                <div className="center-third-column">
                    <div id="timeControlArea" className="time-control-box">
                        <div className={timeControlGroupClassName}>
                            <p className="text-center time-control-text">{reverseMultiplier}</p>
                            <ReverseTimeButton />
                            <PauseButton />
                            <ResetTimeButton />
                            <PlayButton />
                            <ForwardTimeButton />
                            <p className="text-center time-control-text">{forwardMultiplier}</p>
                        </div>
                        <TimeControlRevealButton />
                    </div>
                </div>
            </div>
        );
    }
}

export { TimeControlScreen };
