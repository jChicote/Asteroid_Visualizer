import { Component } from "react";

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
                            <button id="play-pause-button" className="rounded-square-button time-control-button" />
                            <button id="play-pause-button" className="rounded-square-button time-control-button" />
                            <button id="play-pause-button" className="rounded-square-button time-control-button" />
                            <button id="play-pause-button" className="rounded-square-button time-control-button" />
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
