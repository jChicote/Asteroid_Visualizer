// The purpose of this global state is to hold the global variables that are used throughout the game.
// This is especially useful for UI as it allows modification of the scene through these variables.
class GlobalState {
    constructor() {
        this.timeMultiplier = 0;
        this.isPaused = false;
    }
}

export { GlobalState };
