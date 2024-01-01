import { MaterialConfigurationProvider } from "../Infrastructure/Providers/MaterialConfigurationProvider.js";
import { Planet } from "./Planet.js";
import { PlanetObserver } from "../Observers/PlanetObserver.js";
import { SolarSystemVisualizer } from "../../../main.js";

export const PlanetCodes = {
    Mercury: "199",
    Venus: "299",
    Earth: "399",
    Mars: "499",
    Jupiter: "599",
    Saturn: "699",
    Uranus: "799",
    Neptune: "899",
    Pluto: "999"
};

export class PlanetManager {
    constructor(serviceProvider, scene) {
        this.planets = [];
        this.timeStep = 4;
        this.serviceProvider = serviceProvider;

        this.planetObserver = serviceProvider.GetService(PlanetObserver);
        this.planetObserver.Subscribe("GetPlanets", this.CreateMainPlanets.bind(this));
    }

    CreateMainPlanets(planets) {
        const materialConfigurationProvider = this.serviceProvider.GetService(MaterialConfigurationProvider);

        for (const planet of planets) {
            this.planets.push(new Planet(planet.planetCode, planet, materialConfigurationProvider));
        }

        return this.planets;
    }

    UpdatePlanets() {
        if (!SolarSystemVisualizer.gameManager.gameState.isPaused) {
            for (const planet of this.planets) {
                planet.Update();
            }
        }
    }
}
