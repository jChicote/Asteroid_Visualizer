import { PlanetCodes } from "../../assets/Framework/Infrastructure/Gateways/HorizonsApiGateway.js";
import { PlanetsController } from "../../assets/Framework/Controllers/PlanetsController.js";
import { PlanetLocator } from "./PlanetLocator.js";
import { GetMainPlanetQuery } from "../../assets/Framework/Presentation/GetMainPlanet/GetMainPlanetQuery.js";
import { SetVector } from "../../utils/math-library.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";

export class PlanetCreationSystem {
    constructor(serviceProvider, scene) {
        this.planetController = serviceProvider.GetService(PlanetsController);
        this.planetLocator = new PlanetLocator();
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

        const planetPosition = await this.planetLocator.CalculatePlanetPosition(planetViewModel.result);
        const planetObject = this.RenderPlanet(planetCode > 500 ? 12 : 1, 0xFFC7C7, planetPosition);

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
}
