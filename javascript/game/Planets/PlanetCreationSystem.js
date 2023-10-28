import { PlanetsController } from "../../assets/Framework/Controllers/PlanetsController.js";
import { SetVector } from "../../utils/math-library.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";

export class PlanetCreationSystem {
    constructor(serviceProvider, scene) {
        this.planetController = serviceProvider.GetService(PlanetsController);
        this.scene = scene;
    }

    async CreateMainPlanets() {
        // TODO: Information should be pre-loaded before any rendering
        const result = await this.planetController.GetPlanetsAsync();
        console.log(result.result);
    }

    async CreatePlanet(planetCode) {
        // Gets planet data.
        const planetPosition = await this.CalculatePlanetPosition(planetViewModel.result);
        const planetRadius = await this.CalculatePlanetRadius(planetViewModel.result);
        const planetObject = this.RenderPlanet(planetRadius, 0xFFC7C7, planetPosition);

        return planetObject;
    }

    async RenderPlanet(radius, hexColor, planetPosition) {
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 32, 16),
            new THREE.MeshBasicMaterial({ color: hexColor }));

        SetVector(planet, planetPosition);
        this.scene.add(planet);

        return planet;
    }

    async CalculatePlanetPosition(planetData) {
        const eccentricAnomaly = planetData.meanAnomaly + planetData.eccentricity * Math.sin(planetData.meanAnomaly);
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + planetData.eccentricity) / (1 - planetData.eccentricity)) * Math.tan(eccentricAnomaly / 2));
        const distanceRadiusFromSun = planetData.semiMajorAxis * (1 - planetData.eccentricity * Math.cos(eccentricAnomaly));

        return {
            x: (distanceRadiusFromSun * Math.cos(trueAnomaly)) * 0.0000005,
            y: 0,
            z: (distanceRadiusFromSun * Math.sin(trueAnomaly)) * 0.0000005
        };
    }

    async CalculatePlanetRadius(planetData) {
        return planetData.planetRadius * 0.00005; // TODO: Make this dynamicically scaled
    }
}
