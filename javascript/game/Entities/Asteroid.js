import { VisualiserManager } from "../../../main.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { SetVector } from "../../utils/math-library.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { GameObject } from "./GameObject.js";

class Asteroid extends GameObject {
    constructor(asteroidData) {
        super();

        // Components
        this.asteroidState = new AsteroidState(asteroidData.meanAnomaly, 0);
        this.materialRenderer = new MaterialRenderer();
        this.orbitalMotion = new CelestialOrbitalMotionLogic(); // As a temporory fix for visualisation

        // Fields
        this.asteroidData = asteroidData;
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(asteroidData.semiMajorAxis);
        this.meanMotion = this.orbitalMotion.ConvertDegreesToRadians(this.asteroidData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.asteroidData.orbitalPeriod);
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
        const position = this.orbitalMotion.CalculateOrbitalPosition(
            this.asteroidData.semiMajorAxis,
            this.asteroidData.eccentricity,
            this.orbitalMotion.ConvertDegreesToRadians(this.asteroidData.inclination),
            this.orbitalMotion.ConvertDegreesToRadians(this.asteroidData.longitudeOfTheAscendingNode),
            this.orbitalMotion.ConvertDegreesToRadians(this.asteroidData.argumentOfPerihelion),
            this.asteroidData.perihelionDistance,
            this.asteroidState.meanAnomaly,
            100);

        console.log(position);

        SetVector(asteroid, position);
    }

    GetRadius() {
        return 0.3; // Default radius as many object have a no default radius in the data
    }

    UpdateOrbitalState() {
        this.asteroidState.currentTime += this.timeStep * VisualiserManager().gameState.timeMultiplier;
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
