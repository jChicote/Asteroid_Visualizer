import { SunMaterialConfiguration } from "./Sun/SunMaterialConfiguration.js";

// This holds the hardcoded configurations for the simulation. These configurations should only exist as a read-only object.
// This class should not be modified during runtime.
class GameConfiguration {
    constructor() {
        this.materialConfigurations = this.GetMaterialConfigurations();
    }

    GetMaterialConfigurations() {
        const materialConfigurations = [];

        materialConfigurations.push(new SunMaterialConfiguration());

        return materialConfigurations;
    }
}

export { GameConfiguration };
