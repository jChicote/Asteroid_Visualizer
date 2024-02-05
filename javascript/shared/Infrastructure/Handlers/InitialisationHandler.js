import { ObjectValidator } from "../../../utils/ObjectValidator.js";
import { ServiceContainer } from "../../DependencyInjectionServices/ServiceContainer.js";
import { Configuration } from "../../Configuration.js";
import { GameConfiguration } from "../../../game/GameConfiguration.js";
import { GameManager } from "../../../game/GameManager.js";
import { ServiceProvider } from "../../DependencyInjectionServices/ServiceProvider.js";
import { AssetManager } from "../../../game/Managers/AssetManager/AssetManager.js";
import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";

class InitialisationHandler {
    async Handle() {
        await this.Construction();
        await this.PreInitialisation();
        await this.Initialisation();
        await this.Start();
    }

    async Construction() {
        console.log("1 >> Begin Construction");

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

        console.log("2 >> Complete Construction");
    }

    async PreInitialisation() {
        console.log("3 >> Begin PreInitialisation");

        const serviceProvider = SolarSystemVisualizer.serviceContainer
            .Resolve(ServiceProvider);

        const preLoadManager = serviceProvider.GetService(AssetManager);
        await preLoadManager.PreLoadAssets();

        console.log("4 >> Complete PreInitialisation");
    }

    async Initialisation() {
        console.log("5 >> Begin Initialisation");

        await SolarSystemVisualizer.gameManager.Initialise();

        console.log("6 >> Complete Initialisation");
    }

    async Start() {
        console.log("7 >> Start the game");
        SolarSystemVisualizer.gameManager.Start();
    }
}

export { InitialisationHandler };
