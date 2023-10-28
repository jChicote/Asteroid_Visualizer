import { PlanetCreationSystem } from "./PlanetCreationSystem.js";

export class PlanetManager {
    constructor(serviceProvider, scene) {
        this.planetCreationSystem = new PlanetCreationSystem(serviceProvider, scene);
        this.planetObjects = [];
    }

    SetupPlanets() {
        this.planetCreationSystem.CreateMainPlanets().then((planets) => {
            this.planetObjects = planets;
        });
    }

    UpdatePlanets() {
        // TODO: Planets would be encapsulated with their own class to manage their own updates and orbits
    }
}
