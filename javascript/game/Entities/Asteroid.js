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
        this.asteroidState = new AsteroidState(asteroidData.meanAnomaly, asteroidData.timeOfPerihelion);
        this.materialRenderer = new MaterialRenderer();
        this.orbitalMotion = new CelestialOrbitalMotionLogic(); // As a temporory fix for visualisation

        // const eccentricAnomaly = this.orbitalMotion.CalculateEccentricAnomaly(asteroidData.meanAnomaly, asteroidData.eccentricity);

        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(asteroidData.semiMajorAxis);
        // this.timeStep = this.orbitalMotion.CalculateDynamicTimeStep(asteroidData.semiMajorAxis, asteroidData.eccentricity, eccentricAnomaly);
        this.meanMotion = this.orbitalMotion.ConvertDegreesToRadians(this.asteroidData.meanMotion);
        // this.meanMotion = this.orbitalMotion.GetMeanMotion(this.orbitalPeriod);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.orbitalPeriod);
        this.renderedObject = this.RenderAsteroid();
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
        const orbitalComponents = this.orbitalMotion.CalculateOrbitalPosition(
            this.asteroidData.semiMajorAxis,
            this.asteroidData.eccentricity,
            this.asteroidData.inclination,
            this.asteroidData.longitudeOfTheAscendingNode,
            this.asteroidData.argumentOfPerihelion,
            this.asteroidState.meanAnomaly,
            this.asteroidState.currentVelocity,
            this.timeStep,
            100);

        SetVector(asteroid, orbitalComponents.position);

        this.asteroidState.currentVelocity = orbitalComponents.velocity;
    }

    GetRadius() {
        return 0.3; // Default radius as many object have a no default radius in the data
    }

    UpdateOrbitalState() {
        // const eccentricAnomaly = this.orbitalMotion.CalculateEccentricAnomaly(this.asteroidState.meanAnomaly, this.asteroidData.eccentricity);
        // this.timeStep = this.orbitalMotion.CalculateDynamicTimeStep(this.asteroidData.semiMajorAxis, this.asteroidData.eccentricity, eccentricAnomaly);
        // console.log(this.asteroidState.currentTime - (this.asteroidState.currentTime + this.timeStep));
        this.asteroidState.currentTime += this.timeStep;
        this.asteroidState.meanAnomaly = this.orbitalMotion.CalculateMeanAnomaly(
            this.asteroidData.meanAnomaly,
            this.meanMotion,
            // meanMotion * 0.00000000005,
            this.asteroidState.currentTime,
            this.asteroidData.timeOfPerihelion);
    }
}

/**
 * This holds the runtime metadata for the Asteroid.
 */
class AsteroidState {
    constructor(meanAnomaly, initialTime) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = initialTime;
        this.currentVelocity = { x: 0, y: 0, z: 0 };
    }
}

export { Asteroid, AsteroidState };
