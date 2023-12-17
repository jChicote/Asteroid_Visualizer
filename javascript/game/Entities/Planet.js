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

        // Fields
        this.planetCode = planetCode;
        this.planetData = planetData;
        this.planetState = new PlanetState(planetData.meanAnomaly);
        this.renderedObject = this.RenderPlanet();
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.planetData.semiMajorAxis);
        this.meanMotion = this.orbitalMotion.ConvertDegreesToRadians(Number(1.139195266666463E-05));
        this.timeStep = this.orbitalMotion.GetTimeStepInDays(this.orbitalPeriod, this.planetData.sideRealDayPeriod);
    }

    // Updates the planet. Used during runtime.
    Update() {
        this.UpdateOrbitalState();
        this.SetPosition(this.orbitalMotion.CalculateOrbitalPosition(
            Number(1.497340666845410E+08),
            Number(1.755283730575185E-02),
            Number(3.874617050653719E-03),
            Number(1.434962181455701E+02),
            Number(3.190781940967865E+02),
            this.planetState.meanAnomaly,
            0.0000005));

        console.log(this.renderedObject.position);
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
            Number(1.497340666845410E+08),
            Number(1.755283730575185E-02),
            Number(3.874617050653719E-03),
            Number(1.434962181455701E+02),
            Number(3.190781940967865E+02),
            this.planetState.meanAnomaly,
            0.0000005);

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
        return this.planetData.planetRadius * 0.0001; // TODO: ABstract this to make this dynamicically scaled
    }

    SetPosition(position) {
        this.renderedObject.position.set(position.x, position.y, position.z);
    }

    UpdateOrbitalState() {
        this.planetState.currentTime += this.timeStep * VisualiserManager().gameState.timeMultiplier;
        this.planetState.meanAnomaly = this.orbitalMotion.CalculateMeanAnomaly(
            Number(3.004515994723365E+02),
            this.meanMotion,
            this.planetState.currentTime,
            2459595.467857229989);
    }
}

export class PlanetState {
    constructor(meanAnomaly) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = 0;
    }
}
