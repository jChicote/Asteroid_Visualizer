import { PlanetCreationSystem } from "./PlanetCreationSystem.js";

export class PlanetManager {
    constructor(serviceProvider, scene) {
        this.planetCreationSystem = new PlanetCreationSystem(serviceProvider, scene);
        this.planetObjects = [];

        this.timeStep = 600;
    }

    SetupPlanets() {
        (async () => {
            await this.planetCreationSystem.CreateMainPlanets().then((planets) => {
                this.planetObjects = planets;
            });
        })();
    }

    UpdatePlanets() {
        // TODO: Planets would be encapsulated with their own class to manage their own updates and orbits
        for (const planetObject of this.planetObjects) {
            const planetData = planetObject.planetData;
            const planetState = planetObject.planetState;

            const orbitalPosition = this.CalculatePlanetOrbitalPosition(planetState, planetData);
            planetObject.gameObject.position.set(orbitalPosition.x, orbitalPosition.y, orbitalPosition.z);
        }
    }

    CalculatePlanetOrbitalPosition(planetState, planetData) {
        /**
         * Additional data needed:
         * - Star mass
         * - Orbital speed
         */
        const starMass = 1.989e30 * 6.67430e-11; // central mass * gravitational constant
        const pi = 3.14159265;

        // Calculate the orbital period
        const orbitalPeriod = 2 * pi * Math.sqrt(Math.pow(planetData.semiMajorAxis, 3) / starMass);

        // Calculate time step
        const timeStep = orbitalPeriod / 1000;

        // Calculate the mean motion
        const meanMotion = 2 * pi / orbitalPeriod;

        // Find the eccentric anomaly
        const eccentricAnomaly = this.CalculateEccentricAnomaly(planetState.meanAnomaly, planetData.eccentricity);

        // Calculate the true anomaly
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + planetData.eccentricity) / (1 - planetData.eccentricity)) * Math.tan(eccentricAnomaly / 2));

        // Calculate the distance from the central mass
        const distanceRadiusFromSun = planetData.semiMajorAxis * (1 - planetData.eccentricity * Math.cos(eccentricAnomaly));

        // Calculate the orbital position
        const orbitalPosition = {
            x: (distanceRadiusFromSun * Math.cos(trueAnomaly)) * 0.0000005,
            y: 0,
            z: (distanceRadiusFromSun * Math.sin(trueAnomaly)) * 0.0000005
        };

        planetState.currentTime += timeStep;
        planetState.meanAnomaly = planetData.meanAnomaly + meanMotion * planetState.currentTime;

        return orbitalPosition;
    }

    CalculateEccentricAnomaly(meanAnomaly, eccentricity) {
        let E = meanAnomaly;

        // Iterate over the equation until the result converge
        while (true) {
            const deltaE = (E - eccentricity * Math.sin(E) - meanAnomaly) / (1 - eccentricity * Math.cos(E));
            E -= deltaE;

            // Check if the result has converged within the tolerance
            if (Math.abs(deltaE) < 1e-6) {
                break;
            }

            if (isNaN(E)) {
                console.log("Detected NaN during calculation of eccentric anomaly.");
                break;
            }
        }

        return E;
    }
}
