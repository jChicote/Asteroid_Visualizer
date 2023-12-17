import { VisualiserManager } from "../../../main.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { SetVector } from "../../utils/math-library.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { GameObject } from "./GameObject.js";

// Things that need to happen for this class
//  - The data needs to be parsed within the mappings to the Dto
//  - The calculation of the orbital elements needs to be exclusively the small body class as it manages for most celestial types
//  - The planets class has to be rewritten to be near identical to the asteroids class

// Tech Debt:
//  - The state should be grouped with every other celestial object as the requirements for physical and ephemeris properties are near identical.

export class Planet extends GameObject {
    constructor(planetCode, planetData) {
        super();

        // Components
        this.materialRenderer = new MaterialRenderer(planetCode);
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.planetState = new PlanetState(planetData.meanAnomaly, parseFloat(2459595.467857229989));

        // Fields
        this.planetCode = planetCode;
        this.planetData = planetData;
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(planetData.semiMajorAxis);
        this.meanMotion = this.orbitalMotion.ConvertDegreesToRadians(parseFloat(1.139195266666463E-05));
        this.timeStep = this.orbitalMotion.GetTimeStepInDays(this.orbitalPeriod, planetData.sideRealDayPeriod);
        console.log("Planet time is: " + this.timeStep);
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
            parseFloat(1.497340666845410E+08),
            parseFloat(1.755283730575185E-02),
            parseFloat(3.874617050653719E-03),
            parseFloat(1.434962181455701E+02),
            parseFloat(3.190781940967865E+02),
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

    UpdateOrbitalState() {
        this.planetState.currentTime += this.timeStep * VisualiserManager().gameState.timeMultiplier;
        this.planetState.meanAnomaly = this.orbitalMotion.GetCurrentMeanAnomaly(
            parseFloat(3.004515994723365E+02),
            parseFloat(this.meanMotion),
            this.planetState.currentTime);

        // console.log("Current Time: " + this.planetState.currentTime + ", time of perihelion: " + "2459595.467857229989");
        // console.log("MeanAnomaly: " + this.planetState.meanAnomaly + ", Mean Motion: " + this.meanMotion + ", CurrentTime: " + this.planetState.currentTime);
    }
}

export class PlanetState {
    constructor(meanAnomaly, initialTime) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = 0;
    }
}
