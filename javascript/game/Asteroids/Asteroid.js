import * as THREE from "three";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { MathHelper } from "../../utils/math-library.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { AsteroidModelProvider } from "./AsteroidModelProvider.js";

class Asteroid extends GameObject {
    constructor(asteroidData, materialConfigurationProvider) {
        super({ asteroidData, materialConfigurationProvider });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.asteroidData = parameters.asteroidData;
        this.materialConfigurations = [
            parameters.materialConfigurationProvider.GetMaterialConfiguration("Asteroid_Variant1"),
            parameters.materialConfigurationProvider.GetMaterialConfiguration("Asteroid_Variant2")
        ];
        this.meanMotion = 0.0;
        this.orbitalPeriod = 0.0;
        this.renderedObject = {};
        this.timeStep = 0.0;

        // Components
        this.asteroidState = new AsteroidState(parameters.asteroidData.meanAnomaly, 0);
        this.materialRenderer = {};
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.modelProvider = new AsteroidModelProvider();
    }

    // --------------------------------------------------------------------------
    //                            Lifecycle Methods
    // --------------------------------------------------------------------------

    Start() {
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.asteroidData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(this.asteroidData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.asteroidData.orbitalPeriod);
        this.RenderAsteroid();
    }

    Update() {
        if (SolarSystemVisualizer.gameManager.gameState.isPaused) {
            return;
        }

        this.UpdateOrbitalState();
        this.SetAsteroidPosition(this.renderedObject);
        this.RotateMesh();
    }

    // --------------------------------------------------------------------------
    //                                  Methods
    // --------------------------------------------------------------------------

    GetRadius() {
        // Default radius as many object have a no default radius in the data
        return 0.25;
    }

    RotateMesh() {
        // Artificial rotation applied to asteroids.
        // In future work this can be improved to account for polar rotation.
        this.renderedObject.rotation.y += 0.02;
    }

    RenderAsteroid() {
        // Select and load material
        const materialConfiguration = this.materialConfigurations[Math.floor(Math.random() * this.materialConfigurations.length)];
        const materialRenderer = new MaterialRenderer(materialConfiguration);
        const scale = this.GetRadius();

        this.modelProvider.GetAsteroidModelGeometry().then((geometry) => {
            const mesh = new THREE.Mesh(
                geometry,
                materialRenderer.GetMaterial());

            mesh.scale.set(scale, scale, scale);
            mesh.gameObject = this;
            this.SetAsteroidPosition(mesh);
            GameManager.scene.add(mesh);

            this.renderedObject = mesh;
        });
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
