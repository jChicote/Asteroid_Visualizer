import { GameObserver } from "../../Observers/GameObserver.js";

class TimeControl {
    constructor(gameState, serviceProvider) {
        this.gameState = gameState;

        this.gameObserver = serviceProvider.GetService(GameObserver);
        this.gameObserver.Subscribe("SetTimeMultiplier", this.SetTimeMultiplier.bind(this));
    }

    SetTimeMultiplier(newTimeMultiplier) {
        this.gameState.timeMultiplier = newTimeMultiplier;
    }
}

export { TimeControl };
