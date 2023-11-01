export class OrbitalMotionCalculator {
    constructor() {
        this.PI = 3.14159265;
        this.SCALINGFACTOR = 0.0000005;
        this.STARMASS = 1.989e30 * 6.67430e-11;
        this.STEPPINGRESOLUTION = 100000;
    }

    GetOrbitalPeriodInDays(semiMajorAxis) {
        return 2 * this.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / this.STARMASS);
    }

    GetTimeStepInDays(orbitalPeriod, sideRealDayPeriod) {
        return orbitalPeriod / (sideRealDayPeriod * 24 * 3600) * this.STEPPINGRESOLUTION;
    }

    GetCurrentMeanAnomaly(meanAnomaly, meanMotion, currentTime) {
        return meanAnomaly + meanMotion * currentTime;
    }

    GetMeanMotion(orbitalPeriod) {
        return 2 * this.PI / orbitalPeriod;
    }

    GetPlanetOrbitalPosition(meanAnomaly, eccentricity, semiMajorAxis) {
        const eccentricAnomaly = this.CalculateEccentricAnomaly(meanAnomaly, eccentricity);
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));
        const distanceRadiusFromSun = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

        return {
            x: (distanceRadiusFromSun * Math.cos(trueAnomaly)) * 0.0000005,
            y: 0,
            z: (distanceRadiusFromSun * Math.sin(trueAnomaly)) * 0.0000005
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
