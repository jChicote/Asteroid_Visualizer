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

class SolarSystemVisualizer {
    static gameManager = null;

    constructor() {
        this.canUpdate = false;
    }

    // Initializes scene
    // This will run different hooks for stages of initialisation
    async Init() {
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

    async Start() {
        // Start the game
        SolarSystemVisualizer.gameManager.Start();
    }

    async ProgramStarter() {
        await this.Init();
        await this.Start();

        this.canUpdate = true;
        console.log("Program can now start");
    }
}

const solarSystemVisualizer = new SolarSystemVisualizer();

// animate function used by Three.js
async function animate() {
    if (solarSystemVisualizer.canUpdate === false) {
        return;
    }

    // Update the scene
    SolarSystemVisualizer.gameManager.Update();

    requestAnimationFrame(animate);
}

// Run application
await solarSystemVisualizer.ProgramStarter();
animate();

export { SolarSystemVisualizer };
