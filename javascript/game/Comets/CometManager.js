import { Comet } from "./Comet.js";
import { CometObserver } from "../../shared/Observers/CometObserver.js";

class CometManager {
    constructor(serviceProvider) {
        this.comets = [];

        this.cometObserver = serviceProvider.GetService(CometObserver);
        this.cometObserver.Subscribe("GetComets", this.CreateComets.bind(this));
    }

    CreateComets(comets) {
        for (const comet of comets) {
            this.comets.push(new Comet(comet));
        }

        return this.comets;
    }

    UpdateComets() {
        for (const comet of this.comets) {
            comet.Update();
        }
    }
}

export { CometManager };
