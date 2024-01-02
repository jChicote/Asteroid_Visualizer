import * as THREE from "../../../node_modules/three/build/three.module.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { MathHelper } from "../../utils/math-library.js";
import { SolarSystemVisualizer } from "../../../main.js";

class Comet extends GameObject {
    constructor(cometData, materialConfigurationProvider) {
        super({ cometData, materialConfigurationProvider });
    }

    InitialiseFields(parameters) {
        // Fields
        this.cometData = parameters.cometData;
        this.meanMotion = 0.0;
        this.orbitalPeriod = 0.0;
        this.renderedObject = {};
        this.timeStep = 0.0;

        // Components
        this.cometState = {};
        this.materialConfiguration = parameters.materialConfigurationProvider.GetMaterialConfiguration("GeneralComet");
        this.materialRenderer = {};
        this.orbitalMotion = {};
    }

    Start() {
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.cometState = new CometState(this.cometData.meanAnomaly, this.cometData.timeOfPerihelion);
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.cometData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(this.cometData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.orbitalPeriod);
        this.materialRenderer = new MaterialRenderer(this.materialConfiguration);
        this.renderedObject = this.Render();
    }

    Update() {
        if (SolarSystemVisualizer.gameManager.gameState.isPaused) {
            return;
        }

        this.UpdateOrbitalState();
        this.SetAsteroidPosition(this.renderedObject);
    }

    Render() {
        const comet = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        // This is temporary until we have proper orbital calculations and scaling relative to the sun and positions of the planets.
        this.SetAsteroidPosition(comet);

        GameManager.scene.add(comet);

        return comet;
    }

    SetAsteroidPosition(comet) {
        const position = this.orbitalMotion.CalculateOrbitalPosition(
            this.cometData.semiMajorAxis,
            this.cometData.eccentricity,
            MathHelper.ConvertDegreesToRadians(this.cometData.inclination),
            MathHelper.ConvertDegreesToRadians(this.cometData.longitudeOfTheAscendingNode),
            MathHelper.ConvertDegreesToRadians(this.cometData.argumentOfPerihelion),
            this.cometState.meanAnomaly,
            100);

        this.SetVector(comet, position);
    }

    GetRadius() {
        return 1; // Default radius as many object have a no default radius in the data
    }

    UpdateOrbitalState() {
        this.cometState.currentTime += this.timeStep * SolarSystemVisualizer.gameManager.gameState.timeMultiplier;
        this.cometState.meanAnomaly = this.orbitalMotion.CalculateMeanAnomaly(
            this.cometData.meanAnomaly,
            this.meanMotion,
            this.cometState.currentTime,
            this.cometData.timeOfPerihelion);
    }
}

/**
 * This holds the runtime metadata for the Asteroid.
 */
class CometState {
    constructor(meanAnomaly, initialTime) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = initialTime;
    }
}

export { Comet, CometState };
