import { PlanetCreationSystem } from "./PlanetCreationSystem.js";

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
        this.planetCreationSystem = new PlanetCreationSystem(serviceProvider, scene);
        this.planetObjects = [];

        this.timeStep = 4;
    }

    SetupPlanets() {
        this.planetCreationSystem.CreateMainPlanets().then((planets) => {
            this.planetObjects = planets;
        });
    }

    UpdatePlanets() {
        for (const planet of this.planetObjects) {
            planet.Update();
        }
    }
}
