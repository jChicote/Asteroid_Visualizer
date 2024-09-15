import * as THREE from "three";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { MathHelper } from "../../utils/math-library.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { CometModelProvider } from "./CometModelProvider.js";

class Comet extends GameObject {
    constructor(cometData, materialConfigurationProvider) {
        super({ cometData, materialConfigurationProvider });
    }

    // --------------------------------------------------------------------------
    //                            Lifecycle Methods
    // --------------------------------------------------------------------------

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.cometData = parameters.cometData;
        this.meanMotion = 0.0;
        this.orbitalPeriod = 0.0;
        this.renderedObject = {};
        this.timeStep = 0.0;

        // Components
        this.cometState = {};
        this.materialConfigurations = [
            parameters.materialConfigurationProvider.GetMaterialConfiguration("Comet_Variant1"),
            parameters.materialConfigurationProvider.GetMaterialConfiguration("Comet_Variant2")
        ];
        this.orbitalMotion = {};
        this.modelProvider = new CometModelProvider();
    }

    Start() {
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.cometState = new CometState(this.cometData.meanAnomaly, this.cometData.timeOfPerihelion);
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.cometData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(this.cometData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.orbitalPeriod);
        this.Render();
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
    //                                 Methods
    // --------------------------------------------------------------------------

    GetRadius() {
        return 0.25; // Default radius as many object have a no default radius in the data
    }

    Render() {
        // Select and load material
        const materialConfiguration = this.materialConfigurations[Math.floor(Math.random() * this.materialConfigurations.length)];
        const materialRenderer = new MaterialRenderer(materialConfiguration);
        const scale = this.GetRadius();

        this.modelProvider.GetCometModelGeometry().then((geometry) => {
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

    RotateMesh() {
        // Artificial rotation applied to asteroids.
        // In future work this can be improved to account for polar rotation.
        this.renderedObject.rotation.y += 0.02;
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
