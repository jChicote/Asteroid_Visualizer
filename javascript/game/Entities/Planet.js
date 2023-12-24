import { VisualiserManager } from "../../../main.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { SetVector } from "../../utils/math-library.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { GameObject } from "./GameObject.js";

export class Planet extends GameObject {
    constructor(planetCode, planetData) {
        super();

        // Components
        this.materialRenderer = new MaterialRenderer(planetCode);
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.planetState = new PlanetState(planetData.meanAnomaly, 0);

        // Fields
        this.planetCode = planetCode;
        this.planetData = planetData;
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(planetData.semiMajorAxis);
        this.meanMotion = this.orbitalMotion.ConvertDegreesToRadians(planetData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.orbitalPeriod);
        this.renderedObject = this.RenderPlanet();
    }

    // Updates the planet. Used during runtime.
    Update() {
        this.UpdateOrbitalState();
        this.SetPlanetPosition(this.renderedObject);
    }

    RenderPlanet() {
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetPlanetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        this.SetPlanetPosition(planet);

        VisualiserManager().scene.add(planet);

        return planet;
    }

    SetPlanetPosition(planet) {
        const position = this.orbitalMotion.CalculateOrbitalPosition(
            this.planetData.semiMajorAxis / 1.496e+8,
            this.planetData.eccentricity,
            this.orbitalMotion.ConvertDegreesToRadians(this.planetData.inclination) * -1,
            this.orbitalMotion.ConvertDegreesToRadians(this.planetData.longitudeOfAscendingNode) * -1,
            this.orbitalMotion.ConvertDegreesToRadians(this.planetData.argumentOfPerihelion) * -1,
            this.planetData.perihelionDistance,
            this.planetState.meanAnomaly,
            100);

        SetVector(planet, position);
    }

    GetState() {
        return this.planetState;
    }

    GetData() {
        return this.planetData;
    }

    GetCodeIdentifier() {
        return this.planetCode;
    }

    GetPlanetRadius() {
        return this.planetData.planetRadius * 0.0001; // TODO: ABstract this to make this dynamically scaled
    }

    UpdateOrbitalState() {
        this.planetState.currentTime += this.timeStep * VisualiserManager().gameState.timeMultiplier;
        this.planetState.meanAnomaly = this.orbitalMotion.GetCurrentMeanAnomaly(
            this.planetData.meanAnomaly,
            this.meanMotion,
            this.planetState.currentTime);
    }
}

export class PlanetState {
    constructor(meanAnomaly, initialTime) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = initialTime;
    }
}
