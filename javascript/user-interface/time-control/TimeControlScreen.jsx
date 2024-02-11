import { Component } from "react";
import { TimeControlButton } from "./TimeControlButton";

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
                            <TimeControlButton />
                            <TimeControlButton />
                            <TimeControlButton />
                            <TimeControlButton />
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
