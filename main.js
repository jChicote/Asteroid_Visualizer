import { Configuration } from "./javascript/shared/Configuration.js";
import { GameManager } from "./javascript/game/GameManager.js";
import { ServiceContainer } from "./javascript/shared/DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./javascript/shared/DependencyInjectionServices/ServiceProvider.js";
import * as THREE from "./node_modules/three/build/three.module.js";

// Enables caching of textures
THREE.Cache.enabled = true;

/**
 * Getter for the singleton instance of the service container.
 */
let serviceContainer;
export const Container = function() {
    return (function() {
        if (serviceContainer == null) {
            serviceContainer = new ServiceContainer();
        }

        return serviceContainer;
    })();
};

/**
 * Getter for the singleton instance of the root game / visualiser management.
 */
let gameManager;
export const VisualiserManager = function() {
    return (function() {
        if (gameManager == null) {
            gameManager = new GameManager(Container().Resolve(ServiceProvider));
        }

        return gameManager;
    })();
};

let canUpdate = false;

// Initializes scene
async function init() {
    // Backend Initialisation
    const configuration = new Configuration();
    configuration.ConfigureProject();

    // Game / Visualiser Initialisation
    const visualiserManager = VisualiserManager();
    await visualiserManager.Initialise();
}

async function start() {
    // Start the game
    VisualiserManager().Start();
}

async function animate() {
    if (canUpdate === false) {
        return;
    }

    // Update the scene
    VisualiserManager().Update();

    requestAnimationFrame(animate);
}

async function ProgramStarter() {
    await init();
    await start();

    canUpdate = true;
    console.log("Program can now start");
}

await ProgramStarter();
animate();
