import * as THREE from "three";
import { InitialisationHandler } from "./shared/Infrastructure/Handlers/InitialisationHandler.js";

class SolarSystemVisualizer {
    static gameManager = null;
    static gameConfiguration = null;
    static serviceContainer = null;

    constructor() {
        this.canUpdate = false;

        // Enables caching of textures
        THREE.Cache.enabled = true;
        THREE.ColorManagement.enabled = true;
    }

    async ProgramStarter() {
        const initialisationHandler = new InitialisationHandler();

        this.canUpdate = true;
        await initialisationHandler.Handle();

        console.log("Program can now start");
    }

    Render() {
        if (this.canUpdate === false) {
            return;
        }

        // Update the scene
        SolarSystemVisualizer.gameManager.Update();

        requestAnimationFrame(this.Render.bind(this));
    }
}

export { SolarSystemVisualizer };
