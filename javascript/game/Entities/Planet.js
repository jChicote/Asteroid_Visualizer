import { VisualiserManager } from "../../../main.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { SetVector } from "../../utils/math-library.js";
import { OrbitalMotionCalculator } from "../Components/OrbitalMechanics/OrbitalMotionCalculator.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { GameObject } from "./GameObject.js";

export class Planet extends GameObject {
    constructor(planetCode, planetData) {
        super();

        // Components
        this.orbitalMotion = new OrbitalMotionCalculator();
        this.materialRenderer = new MaterialRenderer(planetCode);

        // Fields
        this.planetCode = planetCode;
        this.planetData = planetData;
        this.planetState = new PlanetState(planetData.meanAnomaly);
        this.renderedObject = this.RenderPlanet();
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.planetData.semiMajorAxis);
        this.timeStep = this.orbitalMotion.GetTimeStepInDays(this.orbitalPeriod, this.planetData.sideRealDayPeriod);
    }

    // Updates the planet. Used during runtime.
    Update() {
        this.UpdateOrbitalState();
        this.SetPosition(this.orbitalMotion.GetPlanetOrbitalPosition(
            this.planetState.meanAnomaly,
            this.planetData.eccentricity,
            this.planetData.semiMajorAxis,
            0.0000005));
    }

    RenderPlanet() {
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetPlanetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        SetVector(planet, this.orbitalMotion.GetPlanetOrbitalPosition(
            this.planetState.meanAnomaly,
            this.planetData.eccentricity,
            this.planetData.semiMajorAxis,
            0.0000005));

        VisualiserManager().scene.add(planet);

        return planet;
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
        return this.planetData.planetRadius * 0.00005; // TODO: ABstract this to make this dynamicically scaled
    }

    SetPosition(position) {
        this.renderedObject.position.set(position.x, position.y, position.z);
    }

    UpdateOrbitalState() {
        const meanMotion = this.orbitalMotion.GetMeanMotion(this.orbitalPeriod);
        this.planetState.currentTime += this.timeStep * VisualiserManager().gameState.timeMultiplier;
        this.planetState.meanAnomaly = this.orbitalMotion.GetCurrentMeanAnomaly(this.planetData.meanAnomaly, meanMotion, this.planetState.currentTime);
    }
}

export class PlanetState {
    constructor(meanAnomaly) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = 0;
    }
}
