import { Configuration } from "./javascript/shared/Configuration.js";
import { GameManager } from "./javascript/game/GameManager.js";
import { ServiceContainer } from "./javascript/shared/DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./javascript/shared/DependencyInjectionServices/ServiceProvider.js";
import * as THREE from "./node_modules/three/build/three.module.js";
import { AssetManager } from "./javascript/game/Managers/AssetManager/AssetManager.js";
import { GameConfiguration } from "./javascript/game/GameConfiguration.js";
import { ObjectValidator } from "./javascript/utils/ObjectValidator.js";

// Enables caching of textures
THREE.Cache.enabled = true;
THREE.ColorManagement.enabled = true;

/**
 * Getter for the singleton instance of the service container.
 */
let serviceContainer;
export const Container = function() {
    return (function() {
        if (!ObjectValidator.IsValid(serviceContainer)) {
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
// let gameManager;
// export const VisualiserManager = function() {
//     return (function() {
//         if (!ObjectValidator.IsValid(gameManager)) {
//             gameManager = new GameManager(Container().Resolve(ServiceProvider));
//         }

//         return gameManager;
//     })();
// };

class SolarSystemVisualizer {
    static gameManager = null;

    // Initializes scene
    // This will run different hooks for stages of initialisation
    async init() {
        // Construction
        const construction = async () => {
            const configuration = new Configuration();
            configuration.ConfigureProject();

            if (!ObjectValidator.IsValid(SolarSystemVisualizer.gameManager)) {
                SolarSystemVisualizer.gameManager = new GameManager(Container().Resolve(ServiceProvider));
            }
        };

        // Pre-initialisation
        const preInitialisation = async () => {
            const serviceProvider = Container().Resolve(ServiceProvider);

            const preLoadManager = serviceProvider.GetService(AssetManager);
            await preLoadManager.PreLoadAssets();
        };

        // Initialisation
        const initialisation = async () => {
            await SolarSystemVisualizer.gameManager.Initialise();
        };

        await construction();
        await preInitialisation();
        await initialisation();
    }
}

const solarSystemVisualizer = new SolarSystemVisualizer();

let canUpdate = false;

// Initializes scene
// This will run different hooks for stages of initialisation
// async function init() {
//     // Construction
//     const construction = async () => {
//         const configuration = new Configuration();
//         configuration.ConfigureProject();

//         solarSystemVisualizer
//     };

//     // Pre-initialisation
//     const preInitialisation = async () => {
//         const serviceProvider = Container().Resolve(ServiceProvider);

//         const preLoadManager = serviceProvider.GetService(AssetManager);
//         await preLoadManager.PreLoadAssets();
//     };

//     // Initialisation
//     const initialisation = async () => {
//         const visualiserManager = VisualiserManager();
//         await visualiserManager.Initialise();
//     };

//     await construction();
//     await preInitialisation();
//     await initialisation();
// }

async function start() {
    // Start the game
    SolarSystemVisualizer.gameManager.Start();
}

async function animate() {
    if (canUpdate === false) {
        return;
    }

    // Update the scene
    SolarSystemVisualizer.gameManager.Update();

    requestAnimationFrame(animate);
}

async function ProgramStarter() {
    await solarSystemVisualizer.init();
    await start();

    canUpdate = true;
    console.log("Program can now start");
}

await ProgramStarter();
animate();

export { SolarSystemVisualizer };
