import * as THREE from "../../../node_modules/three/build/three.module.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { MathHelper } from "../../utils/math-library.js";
import { SolarSystemVisualizer } from "../../../main.js";

export class Planet extends GameObject {
    constructor(planetCode, planetData, materialConfigurationProvider) {
        super({ planetCode, planetData, materialConfigurationProvider });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.materialConfiguration = parameters.materialConfigurationProvider.GetMaterialConfiguration(parameters.planetCode);
        this.meanMotion = "";
        this.orbitalPeriod = "";
        this.planetCode = parameters.planetCode;
        this.planetData = parameters.planetData;
        this.renderedObject = "";
        this.timeStep = "";

        // Components
        this.materialRenderer = {};
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.planetState = new PlanetState(parameters.planetData.meanAnomaly, 0);
    }

    Start() {
        this.materialRenderer = new MaterialRenderer(this.materialConfiguration);

        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.planetData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(this.planetData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.orbitalPeriod);
        this.renderedObject = this.RenderPlanet();
    }

    // Updates the planet. Used during runtime.
    Update() {
        if (SolarSystemVisualizer.gameManager.gameState.isPaused) {
            return;
        }

        this.UpdateOrbitalState();
        this.SetPlanetPosition(this.renderedObject);
        this.RotatePlanet();
    }

    RenderPlanet() {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        mesh.gameObject = this;
        this.SetPlanetPosition(mesh);
        GameManager.scene.add(mesh);

        return mesh;
    }

    RotatePlanet() {
        this.renderedObject.rotation.y += this.orbitalMotion.GetAngularVelocity(this.planetData.sideRealDayPeriod) * this.timeStep;
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

    GetRadius() {
        return this.planetData.planetRadius * 0.0001; // TODO: ABstract this to make this dynamically scaled
    }

    UpdateOrbitalState() {
        this.planetState.currentTime += this.timeStep * SolarSystemVisualizer.gameManager.gameState.timeMultiplier;
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
