import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { GameObject } from "./GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { SetVector, MathHelper } from "../../utils/math-library.js";
import { VisualiserManager } from "../../../main.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";

class Asteroid extends GameObject {
    constructor(asteroidData) {
        super();

        // Components
        this.asteroidState = new AsteroidState(asteroidData.meanAnomaly, 0);
        this.materialRenderer = new MaterialRenderer();
        this.orbitalMotion = new CelestialOrbitalMotionLogic();

        // Fields
        this.asteroidData = asteroidData;
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(asteroidData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(this.asteroidData.meanMotion);
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
            MathHelper.ConvertDegreesToRadians(this.asteroidData.inclination),
            MathHelper.ConvertDegreesToRadians(this.asteroidData.longitudeOfTheAscendingNode),
            MathHelper.ConvertDegreesToRadians(this.asteroidData.argumentOfPerihelion),
            this.asteroidState.meanAnomaly,
            100);

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
