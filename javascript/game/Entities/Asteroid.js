import { GameObject } from "./GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { OrbitalMotionCalculator } from "../Components/OrbitalMechanics/OrbitalMotionCalculator.js";
import { VisualiserManager } from "../../../main.js";
import { SetVector } from "../../utils/math-library.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";

class Asteroid extends GameObject {
    constructor(asteroidData) {
        super();

        // Fields
        this.asteroidData = asteroidData;

        // Components
        this.asteroidState = new AsteroidState(asteroidData.meanAnomaly);
        this.materialRenderer = new MaterialRenderer();
        this.orbitalMotion = new OrbitalMotionCalculator();
        this.renderedObject = this.RenderAsteroid();
    }

    RenderAsteroid() {
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        // This is temporary until we have proper orbital calculations and scaling relative to the sun and positions of the planets.
        SetVector(planet, this.orbitalMotion.GetPlanetOrbitalPosition(
            this.asteroidState.meanAnomaly,
            this.asteroidData.eccentricity,
            this.asteroidData.semiMajorAxis,
            100));

        VisualiserManager().scene.add(planet);

        return planet;
    }

    GetRadius() {
        return 0.3; // Default radius as many object have a no default radius in the data
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
