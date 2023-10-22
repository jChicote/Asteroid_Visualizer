import { PlanetCodes } from "../../assets/Framework/Infrastructure/Gateways/HorizonsApiGateway.js";
import { PlanetsController } from "../../assets/Framework/Controllers/PlanetsController.js";
// import { GetMainPlanetQuery } from "../../assets/Framework/Presentation/GetMainPlanet/GetMainPlanetQuery";
import { SetVector } from "../../utils/math-library.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";

export class PlanetCreationSystem {
    constructor(serviceProvider, scene) {
        this.planetController = serviceProvider.GetService(PlanetsController);
        this.scene = scene;
    }

    async CreateMainPlanets() {
        this.CreatePlanet(PlanetCodes.Mercury);
        // this.CreatePlanet(PlanetCodes.Venus);
        // this.CreatePlanet(PlanetCodes.Earth);
        // this.CreatePlanet(PlanetCodes.Mars);

        // this.CreatePlanet(PlanetCodes.Jupiter);
        // this.CreatePlanet(PlanetCodes.Saturn);
        // this.CreatePlanet(PlanetCodes.Uranus);
        // this.CreatePlanet(PlanetCodes.Neptune);
        // this.CreatePlanet(PlanetCodes.Pluto);
    }

    async CreatePlanet(planetCode) {
        // Gets planet data
        // const planetViewModel = await this.planetController.GetMainPlanetAsync(new GetMainPlanetQuery(planetCode));
        const planetPosition = { x: 15, y: 0, z: 15 }; // TODO: Calculate planet position with seperate service or methods

        const planetObject = this.RenderPlanet(1, 0xFFC7C7, planetPosition);

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
