import * as THREE from "../../../node_modules/three/build/three.module.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { DefaultPlanetColor } from "../../shared/Enumerations/DefaultPlanetColor.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { MathHelper } from "../../utils/math-library.js";
import { VisualiserManager } from "../../../main.js";

export class Planet extends GameObject {
    constructor(planetCode, planetData) {
        super();

        // Components
        this.materialRenderer = new MaterialRenderer(planetCode);
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.planetState = new PlanetState(planetData.meanAnomaly, 0);

        // Fields
        this.meanMotion = "";
        this.orbitalPeriod = "";
        this.planetCode = planetCode;
        this.planetData = planetData;
        this.renderedObject = "";
        this.timeStep = "";

        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(planetData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(planetData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.orbitalPeriod);
        this.materialRenderer.material = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.GetColorByIdentifier(planetCode) });
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
            MathHelper.ConvertKilometersToAstronomicalUnits(this.planetData.semiMajorAxis),
            this.planetData.eccentricity,
            MathHelper.ConvertDegreesToRadians(this.planetData.inclination) * -1,
            MathHelper.ConvertDegreesToRadians(this.planetData.longitudeOfAscendingNode) * -1,
            MathHelper.ConvertDegreesToRadians(this.planetData.argumentOfPerihelion) * -1,
            this.planetState.meanAnomaly,
            100);

        this.SetVector(planet, position);
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
