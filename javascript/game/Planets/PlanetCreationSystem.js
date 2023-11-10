import { PlanetsController } from "../../assets/Framework/Controllers/PlanetsController.js";
import { Planet } from "../Entities/Planet.js";

export class PlanetCreationSystem {
    constructor(serviceProvider, scene) {
        this.planetController = serviceProvider.GetService(PlanetsController);
        this.scene = scene;
    }

    async CreateMainPlanets() {
        const planets = (await this.planetController.GetPlanetsAsync()).result.planets;
        const planetObjects = [];

        for (const planet of planets) {
            planetObjects.push(new Planet(planet.planetCode, planet));
        }

        return planetObjects;
    }
}
