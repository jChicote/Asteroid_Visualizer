import { GameObserver } from "../../Observers/GameObserver.js";

class TimeControl {
    constructor(gameState) {
        this.gameState = gameState;
    }

    SetTimeMultiplier(newTimeMultiplier) {
        this.gameState.timeMultiplier = newTimeMultiplier;
    }
}

export { TimeControl };
