import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";
import { GameConfiguration } from "../../../game/GameConfiguration.js";
import { GameManager } from "../../../game/GameManager.js";
import { AssetManager } from "../../../game/Managers/AssetManager/AssetManager.js";
import { EventMediator } from "../../../user-interface/mediator/EventMediator.js";
import { ObjectValidator } from "../../../utils/ObjectValidator.js";
import { Configuration } from "../../Configuration.js";
import { ServiceContainer } from "../../DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "../../DependencyInjectionServices/ServiceProvider.js";

class InitialisationHandler {
    async Handle() {
        await this.Construction();
        await this.PreInitialisation();
        await this.Initialisation();
        await this.Start();
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

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

        this.GetEventMediator();

        console.log("2 >> Complete Construction");
    }

    async PreInitialisation() {
        console.log("3 >> Begin PreInitialisation");

        const serviceProvider = SolarSystemVisualizer.serviceContainer
            .Resolve(ServiceProvider);

        this.eventMediator.Notify("UpdateLoadingBar", 20);


        const preLoadManager = serviceProvider.GetService(AssetManager);
        await preLoadManager.PreLoadAssets();

        this.eventMediator.Notify("UpdateLoadingBar", 40);

        console.log("4 >> Complete PreInitialisation");
    }

    async Initialisation() {
        console.log("5 >> Begin Initialisation");

        await SolarSystemVisualizer.gameManager.Initialise();
        this.eventMediator.Notify("UpdateLoadingBar", 60);

        console.log("6 >> Complete Initialisation");
    }

    async Start() {
        console.log("7 >> Start the game");
        SolarSystemVisualizer.gameManager.Start();
        this.eventMediator.Notify("UpdateLoadingBar", 100);
    }

    /* -------------------------------------------------------------------------- */
    /*                                  Methods                                   */
    /* -------------------------------------------------------------------------- */

    GetEventMediator() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }
}

export { InitialisationHandler };
