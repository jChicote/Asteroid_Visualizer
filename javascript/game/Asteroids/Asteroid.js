import * as THREE from "../../../node_modules/three/build/three.module.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { MathHelper } from "../../utils/math-library.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";

class Asteroid extends GameObject {
    constructor(asteroidData, materialConfigurationProvider) {
        super({ asteroidData, materialConfigurationProvider });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.asteroidData = parameters.asteroidData;
        this.materialConfiguration = parameters.materialConfigurationProvider.GetMaterialConfiguration("GeneralAsteroid");
        this.meanMotion = 0.0;
        this.orbitalPeriod = 0.0;
        this.renderedObject = {};
        this.timeStep = 0.0;

        // Components
        this.asteroidState = new AsteroidState(parameters.asteroidData.meanAnomaly, 0);
        this.materialRenderer = {};
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
    }

    Start() {
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.asteroidData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(this.asteroidData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.asteroidData.orbitalPeriod);
        this.materialRenderer = new MaterialRenderer(this.materialConfiguration);
        this.renderedObject = this.RenderAsteroid();
    }

    Update() {
        if (SolarSystemVisualizer.gameManager.gameState.isPaused) {
            return;
        }

        this.UpdateOrbitalState();
        this.SetAsteroidPosition(this.renderedObject);
    }

    RenderAsteroid() {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        mesh.gameObject = this;
        this.SetAsteroidPosition(mesh);
        GameManager.scene.add(mesh);

        return mesh;
    }

    SetAsteroidPosition(asteroid) {
        const position = this.orbitalMotion.CalculateOrbitalPosition(
            this.asteroidData.semiMajorAxis,
            this.asteroidData.eccentricity,
            MathHelper.ConvertDegreesToRadians(this.asteroidData.inclination),
            MathHelper.ConvertDegreesToRadians(this.asteroidData.longitudeOfTheAscendingNode),
            MathHelper.ConvertDegreesToRadians(this.asteroidData.argumentOfPerihelion),
            this.asteroidState.meanAnomaly,
            100);

        this.SetVector(asteroid, position);
    }

    GetRadius() {
        return 0.3; // Default radius as many object have a no default radius in the data
    }

    UpdateOrbitalState() {
        this.asteroidState.currentTime += this.timeStep * SolarSystemVisualizer.gameManager.gameState.timeMultiplier;
        this.asteroidState.meanAnomaly = this.orbitalMotion.GetCurrentMeanAnomaly(
            this.asteroidData.meanAnomaly,
            this.meanMotion,
            this.asteroidState.currentTime);
    }
}

/**
 * This holds the runtime metadata for the Asteroid.
 */
class AsteroidState {
    constructor(meanAnomaly, initialTime) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = initialTime;
    }
}

export { Asteroid, AsteroidState };
