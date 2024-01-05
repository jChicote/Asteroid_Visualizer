import { AsteroidMaterialConfiguration } from "./Asteroids/MaterialConfiguration/AsteroidMaterialConfiguration.js";
import { CometMaterialConfiguration } from "./Comets/MaterialConfiguration/CometMaterialConfiguration.js";
import { DefaultMaterialConfiguration } from "./Entities/GameObject.js";
import { EarthPlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/EarthPlanetMaterialConfiguration.js";
import { JupiterPlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/JupiterPlanetMaterialConfiguration.js";
import { MarsPlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/MarsPlanetMaterialConfiguration.js";
import { MercuryPlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/MercuryPlanetMaterialConfiguration.js";
import { NeptunePlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/NeptunePlanetMaterialConfiguration.js";
import { PlutoPlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/PlutoPlanetMaterialConfiguration.js";
import { SaturnPlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/SaturnPlanetMaterialConfiguration.js";
import { SunMaterialConfiguration } from "./Sun/SunMaterialConfiguration.js";
import { UranusPlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/UranusPlanetMaterialConfiguration.js";
import { VenusPlanetMaterialConfiguration } from "./Planets/MaterialConfiguration/VenusPlanetMaterialConfiguration.js";

// This holds the hardcoded configurations for the simulation. These configurations should only exist as a read-only object.
// This class should not be modified during runtime.
class GameConfiguration {
    constructor() {
        this.materialConfigurations = this.GetMaterialConfigurations();
    }

    GetMaterialConfigurations() {
        const materialConfigurations = [];

        materialConfigurations.push(new DefaultMaterialConfiguration());

        materialConfigurations.push(new SunMaterialConfiguration());
        materialConfigurations.push(new MercuryPlanetMaterialConfiguration());
        materialConfigurations.push(new VenusPlanetMaterialConfiguration());
        materialConfigurations.push(new EarthPlanetMaterialConfiguration());
        materialConfigurations.push(new MarsPlanetMaterialConfiguration());
        materialConfigurations.push(new JupiterPlanetMaterialConfiguration());
        materialConfigurations.push(new SaturnPlanetMaterialConfiguration());
        materialConfigurations.push(new UranusPlanetMaterialConfiguration());
        materialConfigurations.push(new NeptunePlanetMaterialConfiguration());
        materialConfigurations.push(new PlutoPlanetMaterialConfiguration());

        materialConfigurations.push(new AsteroidMaterialConfiguration());

        materialConfigurations.push(new CometMaterialConfiguration());

        return materialConfigurations;
    }
}

export { GameConfiguration };
