import { Configuration } from "./javascript/shared/Configuration.js";
import { GameManager } from "./javascript/game/GameManager.js";
import { ServiceContainer } from "./javascript/shared/DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./javascript/shared/DependencyInjectionServices/ServiceProvider.js";
import * as THREE from "./node_modules/three/build/three.module.js";
import { AssetManager } from "./javascript/game/Managers/AssetManager/AssetManager.js";
import { GameConfiguration } from "./javascript/game/GameConfiguration.js";

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
 * The global read-only configurations for the visualisation.
 */
let gameConfiguration;
export const VisualiserConfiguration = function() {
    return (function() {
        if (gameConfiguration == null) {
            gameConfiguration = new GameConfiguration();
        }

        return gameConfiguration;
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
// This will run different hooks for stages of initialisation
async function init() {
    // Construction
    const construction = async () => {
        const configuration = new Configuration();
        configuration.ConfigureProject();
    };

    // Pre-initialisation
    const preInitialisation = async () => {
        const serviceProvider = Container().Resolve(ServiceProvider);

        const preLoadManager = serviceProvider.GetService(AssetManager);
        preLoadManager.PreLoadAssets();
    };

    // Initialisation
    const initialisation = async () => {
        const visualiserManager = VisualiserManager();
        await visualiserManager.Initialise();
    };

    await construction();
    await preInitialisation();
    await initialisation();
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
