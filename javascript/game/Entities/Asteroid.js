import { VisualiserManager } from "../../../main.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { SetVector } from "../../utils/math-library.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { GameObject } from "./GameObject.js";

class Asteroid extends GameObject {
    constructor(asteroidData) {
        super();

        // Fields
        this.asteroidData = asteroidData;

        // Components
        this.asteroidState = new AsteroidState(asteroidData.meanAnomaly);
        this.materialRenderer = new MaterialRenderer();
        this.orbitalMotion = new CelestialOrbitalMotionLogic(); // As a temporory fix for visualisation
        this.renderedObject = this.RenderAsteroid();

        this.timeStep = this.orbitalMotion.CalculateTimeStep(asteroidData.orbitalPeriod);
    }

    Update() {
        this.UpdateOrbitalState();
        this.SetAsteroidPosition(this.renderedObject);
    }

    RenderAsteroid() {
        const asteroid = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        // This is temporary until we have proper orbital calculations and scaling relative to the sun and positions of the planets.
        this.SetAsteroidPosition(asteroid);

        VisualiserManager().scene.add(asteroid);

        return asteroid;
    }

    SetAsteroidPosition(asteroid) {
        SetVector(asteroid, this.orbitalMotion.CalculateOrbitalPosition(
            this.asteroidData.semiMajorAxis,
            this.asteroidData.eccentricity,
            this.asteroidData.inclination,
            this.asteroidData.longitudeOfTheAscendingNode,
            this.asteroidData.argumentOfPerihelion,
            this.asteroidState.meanAnomaly,
            this.asteroidData.meanMotion,
            this.asteroidState.currentTime,
            this.asteroidData.gravitationMass,
            100));
    }

    GetRadius() {
        return 0.3; // Default radius as many object have a no default radius in the data
    }

    UpdateOrbitalState() {
        this.asteroidState.meanAnomaly = this.orbitalMotion.CalculateMeanAnomaly(this.asteroidState.meanAnomaly, this.asteroidData.meanMotion, this.asteroidState.currentTime, this.asteroidData.timeOfPerihelion);
        this.asteroidState.currentTime += this.timeStep;
    }
}

/**
 * This holds the runtime metadata for the Asteroid.
 */
class AsteroidState {
    constructor(meanAnomaly) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = 0;
    }
}

export { Asteroid, AsteroidState };
