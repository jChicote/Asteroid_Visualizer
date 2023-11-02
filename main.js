import { GameManager } from "./javascript/game/GameManager.js";
import { Configuration } from "./javascript/shared/Configuration.js";
import { ServiceContainer } from "./javascript/shared/DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./javascript/shared/DependencyInjectionServices/ServiceProvider.js";

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

function animate() {
    if (!canUpdate) {
        return;
    }

    requestAnimationFrame(animate);

    // Update the scene
    VisualiserManager().Update();
}

async function ProgramStarter() {
    await init();
    await start();

    canUpdate = true;
    console.log("Program can now start");
}

await ProgramStarter();
animate();
