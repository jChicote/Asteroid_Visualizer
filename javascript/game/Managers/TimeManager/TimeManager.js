import { GameManager } from "../../GameManager.js";

class TimeManager {
    constructor(props) {
        this.gameState = props.gameState;

        // Subscribe time methods
        GameManager.gameObserver.Subscribe("UpdateTimeMultiplier", this.SetTimeMultiplier.bind(this));
        GameManager.gameObserver.Subscribe("UpdateIsTimePaused", this.SetIsTimePaused.bind(this));
        GameManager.gameObserver.Subscribe("ResetTimeControls", this.ResetTimeControls.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    SetTimeMultiplier(timeDirection) {
        this.gameState.timeMultiplier += timeDirection;

        if (this.gameState.timeMultiplier < 0) {
            GameManager.gameObserver.Dispatch(
                "UpdateTimeMultiplierEnd",
                {
                    reverseMultiplier: parseInt(Math.round(this.gameState.timeMultiplier)),
                    forwardMultiplier: 0
                }
            );
        } else if (this.gameState.timeMultiplier > 0) {
            GameManager.gameObserver.Dispatch(
                "UpdateTimeMultiplierEnd",
                {
                    reverseMultiplier: 0,
                    forwardMultiplier: parseInt(Math.round(this.gameState.timeMultiplier))
                }
            );
        }
    }

    SetIsTimePaused(isPaused) {
        this.gameState.isPaused = isPaused;
    }

    ResetTimeControls() {
        this.gameState.timeMultiplier = 0.01; // Default configurations will need to exist in the future.
        this.gameState.isPaused = false;
        GameManager.gameObserver.Dispatch(
            "UpdateTimeMultiplierEnd",
            {
                reverseMultiplier: 0,
                forwardMultiplier: 0
            }
        );
    }
}

export { TimeManager };
