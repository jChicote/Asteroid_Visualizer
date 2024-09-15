import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";

class MaterialConfigurationProvider {
    constructor() {
        this.materialConfigurations = SolarSystemVisualizer.gameConfiguration.materialConfigurations;
    }

    GetMaterialConfiguration(key) {
        let materialConfiguration = this.materialConfigurations.find(materialConfiguration => materialConfiguration.key === key);
        if (materialConfiguration === null || materialConfiguration === undefined) {
            console.warn(`Material Configuration with key ${key} not found. Default material is instead provided`);
            materialConfiguration = this.materialConfigurations.find(materialConfiguration => materialConfiguration.key === "Default");
        }

        return materialConfiguration;
    }
}

export { MaterialConfigurationProvider };
