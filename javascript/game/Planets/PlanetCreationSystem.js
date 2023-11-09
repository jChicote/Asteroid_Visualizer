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

    // CreatePlanet(planet) {
    //     const planetPosition = this.CalculatePlanetPosition(planet);
    //     const planetRadius = this.CalculatePlanetRadius(planet);
    //     const planetObject = this.RenderPlanet(planetRadius, 0xFFC7C7, planetPosition); // TODO: Refactor this into the Planet gameobject

    //     return new Planet(planetObject, planet.planetCode, planet);
    // }

    // RenderPlanet(radius, hexColor, planetPosition) {
    //     const planet = new THREE.Mesh(
    //         new THREE.SphereGeometry(radius, 32, 16),
    //         new THREE.MeshBasicMaterial({ color: hexColor }));

    //     SetVector(planet, planetPosition);
    //     this.scene.add(planet);

    //     return planet;
    // }

    // TODO: Refactor this into the Planet gameobject
    // CalculatePlanetPosition(planetData) {
    //     const eccentricAnomaly = planetData.meanAnomaly + planetData.eccentricity * Math.sin(planetData.meanAnomaly);
    //     const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + planetData.eccentricity) / (1 - planetData.eccentricity)) * Math.tan(eccentricAnomaly / 2));
    //     const distanceRadiusFromSun = planetData.semiMajorAxis * (1 - planetData.eccentricity * Math.cos(eccentricAnomaly));

    //     return {
    //         x: (distanceRadiusFromSun * Math.cos(trueAnomaly)) * 0.0000005,
    //         y: 0,
    //         z: (distanceRadiusFromSun * Math.sin(trueAnomaly)) * 0.0000005
    //     };
    // }

    // CalculatePlanetRadius(planetData) {
    //     return planetData.planetRadius * 0.00005; // TODO: ABstract this to make this dynamicically scaled
    // }
}
