import * as THREE from "three";
import { Configuration } from "./shared/Configuration.js";
import { GameConfiguration } from "./game/GameConfiguration.js";
import { GameManager } from "./game/GameManager.js";
import { ServiceProvider } from "./shared/DependencyInjectionServices/ServiceProvider.js";

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
        this.canUpdate = true;

        await this.Init();
        await this.Start();

        console.log("Program can now start");
    }

    Render() {
        if (solarSystemVisualizer.canUpdate === false) {
            return;
        }

        // Update the scene
        SolarSystemVisualizer.gameManager.Update();

        requestAnimationFrame(this.Render);
    }
}

export { SolarSystemVisualizer };
