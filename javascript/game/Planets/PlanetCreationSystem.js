import { PlanetCodes } from "../../assets/Framework/Infrastructure/Gateways/HorizonsApiGateway.js";
import { PlanetsController } from "../../assets/Framework/Controllers/PlanetsController.js";
import { GetMainPlanetQuery } from "../../assets/Framework/Presentation/GetMainPlanet/GetMainPlanetQuery.js";
import { SetVector } from "../../utils/math-library.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";

export class PlanetCreationSystem {
    constructor(serviceProvider, scene) {
        this.planetController = serviceProvider.GetService(PlanetsController);
        this.scene = scene;
    }

    async CreateMainPlanets() {
        // TODO: Information should be pre-loaded before any rendering
        await this.CreatePlanet(PlanetCodes.Mercury);
        await this.CreatePlanet(PlanetCodes.Venus);
        await this.CreatePlanet(PlanetCodes.Earth);
        await this.CreatePlanet(PlanetCodes.Mars);

        await this.CreatePlanet(PlanetCodes.Jupiter);
        await this.CreatePlanet(PlanetCodes.Saturn);
        await this.CreatePlanet(PlanetCodes.Uranus);
        await this.CreatePlanet(PlanetCodes.Neptune);
        await this.CreatePlanet(PlanetCodes.Pluto);
    }

    async CreatePlanet(planetCode) {
        // Gets planet data.
        const planetViewModel = await this.planetController.GetMainPlanetAsync(new GetMainPlanetQuery(planetCode));
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
        // TODO: This should be done within the use case interactor
        const meanAnomaly = parseFloat(planetData.meanAnomaly);
        const eccentricity = parseFloat(planetData.eccentricity);
        const semiMajorAxis = parseFloat(planetData.semiMajorAxis);

        // TODO: Simplify the calculation
        const eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(meanAnomaly);
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));

        const distanceRadiusFromSun = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

        const x = distanceRadiusFromSun * Math.cos(trueAnomaly);
        const y = distanceRadiusFromSun * Math.sin(trueAnomaly);

        return { x: x * 0.0000005, y: 0, z: y * 0.0000005 };
    }

    async CalculatePlanetRadius(planetData) {
        const trueRadius = parseInt(planetData.planetRadius);
        const scaledRadius = trueRadius * 0.00005; // TODO: Make this dynamicically scaled

        return scaledRadius;
    }
}
