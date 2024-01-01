import { SolarSystemVisualizer } from "../../../main.js";
import { MaterialConfigurationProvider } from "../Infrastructure/Providers/MaterialConfigurationProvider.js";
import { CometObserver } from "../Observers/CometObserver.js";
import { Comet } from "./Comet.js";

class CometManager {
    constructor(serviceProvider) {
        // Fields
        this.comets = [];
        this.serviceProvider = serviceProvider
        this.cometObserver = serviceProvider.GetService(CometObserver);

        this.cometObserver.Subscribe("GetComets", this.CreateComets.bind(this));
    }

    CreateComets(comets) {
        const materialConfigurationProvider = this.serviceProvider.GetService(MaterialConfigurationProvider);

        for (const comet of comets) {
            this.comets.push(new Comet(comet, materialConfigurationProvider));
        }

        return this.comets;
    }

    UpdateComets() {
        if (!SolarSystemVisualizer.gameManager.gameState.isPaused) {
            for (const comet of this.comets) {
                comet.Update();
            }
        }
    }
}

export { CometManager };
