// The purpose of this global state is to hold the global variables that are used throughout the game.
// This is especially useful for UI as it allows modification of the scene through these variables.
class GlobalState {
    constructor() {
        // Time Manipulator
        this.timeStepResolution = 100000;
        this.timeMultiplier = 0.01;
        this.isPaused = false;
        this.canUpdate = false;

        // Celestial Objects
        this.physicalRadiusMultiplier = 1;
        this.distanceToSunMultiplier = 1;

        // Scene Properties
        this.isLightActive = false;
        this.lightIntensity = 50;

        // Canvas Properties
        this.isFullScreen = false;
    }
}

export { GlobalState };
