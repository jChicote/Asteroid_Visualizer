class CelestialOrbitalMotionLogic {
    constructor() {
        this.PI = 3.14159265;
        this.STARMASS = 1.989e30 * 6.67430e-11;
        this.STEPPINGRESOLUTION = 100000;
        this.GRAVITATIONALCONSTANT = 6.67430e-11;
        this.STARMASS = 1.989e30;
        this.GRAVITATIONALMASS = 1.989e30 * 6.67430e-11;
    }

    GetOrbitalPeriodInDays(semiMajorAxis) {
        return 2 * this.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / this.GRAVITATIONALMASS);
    }

    CalculateTimeStep(orbitalPeriod) {
        return orbitalPeriod / (orbitalPeriod * 24 * 3600) * this.STEPPINGRESOLUTION;
    }

    GetMeanMotion(orbitalPeriod) {
        return 360 / orbitalPeriod;
    }

    ConvertDegreesToRadians(degrees) {
        return degrees * this.PI / 180;
    }

    CalculateMeanAnomaly(meanAnomaly, meanMotion, time, timeOfPerihelionPassage) {
        return meanAnomaly + meanMotion * (time - timeOfPerihelionPassage);
    }

    CalculateTrueAnomaly(meanAnomaly, eccentricity) {
        return 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));
    }

    CalculateOrbitalPosition(
        semiMajorAxis,
        eccentricity,
        inclination,
        longitudeOfAscendingNode,
        argumentOfPerihelion,
        meanAnomaly,
        velocity,
        timeStep,
        distanceScale) {
        const eccentricAnomaly = this.CalculateEccentricAnomaly(meanAnomaly, eccentricity);
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));
        const distanceRadiusFromSun = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

        const positionWithinOrbitalPlane = {
            x: (distanceRadiusFromSun * Math.cos(trueAnomaly)),
            y: (distanceRadiusFromSun * Math.sin(trueAnomaly)),
            z: 0
        };

        // convert to 3D space coordinates
        const positionIn3DSpace = {
            // x' * (cos(Ω) * cos(ω) - sin(Ω) * sin(ω) * cos(i)) - y' * (cos(Ω) * sin(ω) + sin(Ω) * cos(ω) * cos(i))
            x: (positionWithinOrbitalPlane.x * (Math.cos(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) -
                Math.sin(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) * Math.cos(inclination)) -
                positionWithinOrbitalPlane.y * (Math.cos(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) +
                    Math.sin(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) * Math.cos(inclination))),
            // x' * (sin(Ω) * cos(ω) + cos(Ω) * sin(ω) * cos(i)) + y' * (sin(Ω) * sin(ω) - cos(Ω) * cos(ω) * cos(i))
            y: (positionWithinOrbitalPlane.x * (Math.sin(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) +
                Math.cos(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) * Math.cos(inclination)) +
                positionWithinOrbitalPlane.y * (Math.sin(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) -
                    Math.cos(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) * Math.cos(inclination))),
            // x' * sin(ω) * sin(i) + y' * cos(ω) * sin(i)
            z: (positionWithinOrbitalPlane.x * Math.sin(argumentOfPerihelion) * Math.sin(inclination) +
                positionWithinOrbitalPlane.y * Math.cos(argumentOfPerihelion) * Math.sin(inclination))
        };

        positionIn3DSpace.x *= distanceScale;
        positionIn3DSpace.y *= distanceScale;
        positionIn3DSpace.z *= distanceScale;

        return positionIn3DSpace;
    }

    CalculateEccentricAnomaly(meanAnomaly, eccentricity) {
        let eccentricAnomaly = meanAnomaly;
        let deltaE = 1; // Initialize deltaE to a non-zero value.

        // Set a maximum iteration limit to avoid infinite loops.
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
