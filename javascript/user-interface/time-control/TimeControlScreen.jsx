import { Component } from "react";
import { ForwardTimeButton } from "./ForwardTimeButton.jsx";
import { ReverseTimeButton } from "./ReverseTimeButton.jsx";
import { PauseButton } from "./PauseButton.jsx";
import { PlayButton } from "./PlayButton.jsx";
import { ResetTimeButton } from "./ResetTimeButton.jsx";

class TimeControlScreen extends Component {
    render() {
        // Box:
        // Group
        // Buttons
        return (
            <div className="centered-canvas">
                <div className="center-third-column">
                    <div className="time-control-box">
                        <div className="time-control-button-group">
                            <p>-1x</p>
                            <ReverseTimeButton />
                            <PauseButton />
                            <ResetTimeButton />
                            <PlayButton />
                            <ForwardTimeButton />
                            <p>1x</p>
                        </div>
                        <div>
                            <p>Time Controls</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { TimeControlScreen };
