import { Configuration } from "./javascript/shared/Configuration.js";
import { GameManager } from "./javascript/game/GameManager.js";
import { ServiceContainer } from "./javascript/shared/DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./javascript/shared/DependencyInjectionServices/ServiceProvider.js";
import * as THREE from "./node_modules/three/build/three.module.js";
import { AssetManager } from "./javascript/game/Managers/AssetManager/AssetManager.js";
import { GameConfiguration } from "./javascript/game/GameConfiguration.js";
import { ObjectValidator } from "./javascript/utils/ObjectValidator.js";

class SolarSystemVisualizer {
    static gameManager = null;
    static gameConfiguration = null;
    static serviceContainer = null;

    constructor() {
        this.canUpdate = false;
    }

    // Initializes scene
    // This will run different hooks for stages of initialisation
    async Init() {
        // Construction
        const construction = async () => {
            if (!ObjectValidator.IsValid(SolarSystemVisualizer.serviceContainer)) {
                SolarSystemVisualizer.serviceContainer = new ServiceContainer();
            }
            const configuration = new Configuration();
            configuration.ConfigureProject();

            if (!ObjectValidator.IsValid(SolarSystemVisualizer.gameConfiguration)) {
                SolarSystemVisualizer.gameConfiguration = new GameConfiguration();
            }

            if (!ObjectValidator.IsValid(SolarSystemVisualizer.gameManager)) {
                SolarSystemVisualizer.gameManager =
                    new GameManager(
                        SolarSystemVisualizer.serviceContainer
                            .Resolve(ServiceProvider));
            }
        };

        // Pre-initialisation
        const preInitialisation = async () => {
            const serviceProvider = SolarSystemVisualizer.serviceContainer
                .Resolve(ServiceProvider);

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

// Enables caching of textures
THREE.Cache.enabled = true;
THREE.ColorManagement.enabled = true;

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
