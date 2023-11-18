import { PlanetObserver } from "../../shared/Observers/PlanetObserver.js";
import { Planet } from "../Entities/Planet.js";

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

        this.planetObserver = serviceProvider.GetService(PlanetObserver);
        this.planetObserver.Subscribe("GetPlanets", this.CreateMainPlanets.bind(this));
    }

    CreateMainPlanets(planets) {
        for (const planet of planets) {
            this.planets.push(new Planet(planet.planetCode, planet));
        }

        return this.planets;
    }

    UpdatePlanets() {
        for (const planet of this.planets) {
            planet.Update();
        }
    }
}
