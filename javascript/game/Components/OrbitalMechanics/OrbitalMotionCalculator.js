import { VisualiserManager } from "../../../../main.js";

export class OrbitalMotionCalculator {
    constructor() {
        this.PI = 3.14159265;
        this.SCALINGFACTOR = 0.0000005;
        this.STARMASS = 1.989e30 * 6.67430e-11;
    }

    GetOrbitalPeriodInDays(semiMajorAxis) {
        return 2 * this.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / this.STARMASS);
    }

    GetTimeStepInDays(orbitalPeriod, sideRealDayPeriod) {
        return orbitalPeriod / (sideRealDayPeriod * 24 * 3600) * VisualiserManager().gameState.timeStepResolution;
    }

    GetCurrentMeanAnomaly(meanAnomaly, meanMotion, currentTime) {
        return meanAnomaly + meanMotion * currentTime;
    }

    GetMeanMotion(orbitalPeriod) {
        return 2 * this.PI / orbitalPeriod;
    }

    GetPlanetOrbitalPosition(meanAnomaly, eccentricity, semiMajorAxis, scale) {
        const eccentricAnomaly = this.CalculateEccentricAnomaly(meanAnomaly, eccentricity);
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));
        const distanceRadiusFromSun = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

        return {
            x: (distanceRadiusFromSun * Math.cos(trueAnomaly)) * scale,
            y: 0,
            z: (distanceRadiusFromSun * Math.sin(trueAnomaly)) * scale
        };
    }

    CalculateEccentricAnomaly(meanAnomaly, eccentricity) {
        let eccentricAnomaly = meanAnomaly;

        // Iterate over the equation until the result converge
        while (true) {
            const deltaE = (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly) / (1 - eccentricity * Math.cos(eccentricAnomaly));
            eccentricAnomaly -= deltaE;

            // Check if the result has converged within the tolerance
            if (Math.abs(deltaE) < 1e-6) {
                break;
            }

            if (isNaN(eccentricAnomaly)) {
                console.log("Detected NaN during calculation of eccentric anomaly.");
                break;
            }
        }

        return eccentricAnomaly;
    }
}
