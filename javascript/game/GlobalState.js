// The purpose of this global state is to hold the global variables that are used throughout the game.
// This is especially useful for UI as it allows modification of the scene through these variables.
class GlobalState {
    constructor() {
        // Time Manipulator
        this.timeStepResolution = 100000;
        this.timeMultiplier = 0.01;
        this.isPaused = false;

        // Celestial Objects
        this.physicalRadiusMultiplier = 1;
        this.distanceToSunMultiplier = 1;
    }
}

export { GlobalState };
