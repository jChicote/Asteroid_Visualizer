import { VisualiserManager } from "../../../../main.js";

class CelestialOrbitalMotionLogic {
    constructor() {
        this.PI = 3.14159265;
        this.STARMASS = 1.989e30 * 6.67430e-11;
        this.GRAVITATIONALCONSTANT = 6.67430e-11;
        this.STARMASS = 1.989e30;
        this.GRAVITATIONALMASS = 1.989e30 * 6.67430e-11;
    }

    GetOrbitalPeriodInDays(semiMajorAxis) {
        // Source for calculating the orbital period from: https://en.wikipedia.org/wiki/Orbital_period
        return 2 * this.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / this.GRAVITATIONALMASS);
    }

    CalculateTimeStep(orbitalPeriod) {
        // Calculates the time step assuming synchronous sidereal rotation. Orbital Period = Sidereal Day Period.
        return orbitalPeriod / (orbitalPeriod * 24 * 3600) * VisualiserManager().gameState.timeStepResolution;
    }

    GetAngularVelocity(rotationalPeriod) {
        return 2 * this.PI / rotationalPeriod;
    }

    GetTimeStepInDays(orbitalPeriod, sideRealDayPeriod) {
        return orbitalPeriod / (sideRealDayPeriod * 24 * 3600) * VisualiserManager().gameState.timeStepResolution;
    }

    GetMeanMotion(orbitalPeriod) {
        return 2 * this.PI / orbitalPeriod;
    }

    CalculateMeanAnomaly(meanAnomaly, meanMotion, time, timeOfPerihelionPassage) {
        // Source for defining the mean anomaly from: https://en.wikipedia.org/wiki/Mean_anomaly
        return meanAnomaly + meanMotion * (time - timeOfPerihelionPassage);
    }

    GetCurrentMeanAnomaly(meanAnomaly, meanMotion, currentTime) {
        return meanAnomaly + meanMotion * currentTime;
    }

    CalculateOrbitalPosition(
        semiMajorAxis,
        eccentricity,
        inclination,
        longitudeOfAscendingNode,
        argumentOfPerihelion,
        meanAnomaly,
        distanceScale) {
        const eccentricAnomaly = this.CalculateEccentricAnomaly(meanAnomaly, eccentricity);

        // Calculates the angular parameter representing the position of the body along a Keplerian Orbit.
        // Source: https://en.wikipedia.org/wiki/True_anomaly
        //      See 'From the eccentric anomaly' section.
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));
        const invertedTrueAnomaly = trueAnomaly * -1;

        // Finds the radial distance of the object within an ellipse in astronomical units.
        const distanceFromSun = (semiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(trueAnomaly));

        // Convert to 3D space coordinates - modified to use x and z as the orbital plane.
        //      - This relies on the cartesian coordinate system, which this converts from the originate 'orbital plane coordinate system'
        // Source: https://en.wikipedia.org/wiki/Orbital_elements
        //      See 'Euler angle transformation'
        const orbitalPosition = {
            x: distanceFromSun * (Math.cos(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion + invertedTrueAnomaly) -
                Math.sin(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion + invertedTrueAnomaly) * Math.cos(inclination)),
            y: distanceFromSun * (Math.sin(argumentOfPerihelion + invertedTrueAnomaly) * Math.sin(inclination)),
            z: distanceFromSun * (Math.sin(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion + invertedTrueAnomaly) +
                Math.cos(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion + invertedTrueAnomaly) * Math.cos(inclination))
        };

        orbitalPosition.x *= distanceScale;
        orbitalPosition.y *= distanceScale;
        orbitalPosition.z *= distanceScale;

        return orbitalPosition;
    }

    CalculateEccentricAnomaly(meanAnomaly, eccentricity) {
        /**
         * Calculation is based on numerical analysis to find better approximations of the eccentric anomaly.
         * A root finding algorithm is applied to produce successive iterations of the initial eccentric anomaly.
         * Iterations solve to produce a value below the tolerance of 1e-12. Indicating a convergence to an accurate value.
         *
         * Calculation is based on the Newton-Raphson method:
         *      See 'From Mean Anomaly' section: https://en.wikipedia.org/wiki/Eccentric_anomaly
         *      See 'Newton's method' for approximate calculations: https://en.wikipedia.org/wiki/Newton%27s_method
         */

        let eccentricAnomaly = meanAnomaly;
        let deltaE = 1; // Initialize deltaE to a non-zero value.

        const maxIterations = 1000;
        let iterations = 0;

        while (Math.abs(deltaE) > 1e-12 && iterations < maxIterations) {
            deltaE = (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly) / (1 - eccentricity * Math.cos(eccentricAnomaly));
            eccentricAnomaly -= deltaE;
            iterations++;

            // Check for NaN or infinity in eccentricAnomaly.
            if (!isFinite(eccentricAnomaly) || isNaN(eccentricAnomaly)) {
                console.log("Detected NaN or infinity during calculation of eccentric anomaly.");
                break;
            }
        }

        return eccentricAnomaly;
    }
}

export { CelestialOrbitalMotionLogic };
