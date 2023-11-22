class CelestialOrbitalMotionLogic {
    constructor() {
        this.PI = 3.14159265;
        this.STARMASS = 1.989e30 * 6.67430e-11;
    }

    CalculateOrbitalPosition(
        semiMajorAxis,
        eccentricity,
        inclination,
        longitudeOfAscendingNode,
        argumentOfPerihelion,
        meanAnomaly,
        meanMotion,
        time,
        gravitationalParameter,
        distanceScale) {
        const eccentricAnomaly = this.CalculateEccentricAnomaly(meanAnomaly, eccentricity);

        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));

        const radiusFromSun = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

        const positionWithinOrbitalPlane = {
            x: radiusFromSun * Math.cos(trueAnomaly),
            y: radiusFromSun * Math.sin(trueAnomaly)
        };

        console.log((positionWithinOrbitalPlane.x * (Math.cos(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) -
            Math.sin(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) * Math.cos(inclination)) -
            positionWithinOrbitalPlane.y * (Math.cos(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) +
                Math.sin(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) * Math.cos(inclination))) * distanceScale);

        // console.log(positionWithinOrbitalPlane.x * (Math.sin(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) +
        //     Math.cos(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) * Math.cos(inclination)) +
        //     positionWithinOrbitalPlane.y * (Math.sin(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) -
        //         Math.cos(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) * Math.cos(inclination)));

        // console.log(positionWithinOrbitalPlane.x * Math.sin(argumentOfPerihelion) * Math.sin(inclination) +
        //     positionWithinOrbitalPlane.y * Math.cos(argumentOfPerihelion) * Math.sin(inclination));

        // convert to 3D space coordinates
        const positionIn3DSpace = {
            x: (positionWithinOrbitalPlane.x * (Math.cos(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) -
                Math.sin(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) * Math.cos(inclination)) -
                positionWithinOrbitalPlane.y * (Math.cos(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) +
                    Math.sin(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) * Math.cos(inclination))) * distanceScale, // x' * (cos(Ω) * cos(ω) - sin(Ω) * sin(ω) * cos(i)) - y' * (cos(Ω) * sin(ω) + sin(Ω) * cos(ω) * cos(i))
            y: (positionWithinOrbitalPlane.x * (Math.sin(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) +
                Math.cos(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) * Math.cos(inclination)) +
                positionWithinOrbitalPlane.y * (Math.sin(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion) -
                    Math.cos(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion) * Math.cos(inclination))) * distanceScale, // x' * (sin(Ω) * cos(ω) + cos(Ω) * sin(ω) * cos(i)) + y' * (sin(Ω) * sin(ω) - cos(Ω) * cos(ω) * cos(i))
            z: (positionWithinOrbitalPlane.x * Math.sin(argumentOfPerihelion) * Math.sin(inclination) +
                positionWithinOrbitalPlane.y * Math.cos(argumentOfPerihelion) * Math.sin(inclination)) * distanceScale // x' * sin(ω) * sin(i) + y' * cos(ω) * sin(i)
        };

        return positionIn3DSpace;
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

export { CelestialOrbitalMotionLogic };

/**
 * PSUEDOCODE FOR THE CALCULATION OF THE ORBITAL POSITION
 *
 * function calculateOrbitPosition(semiMajorAxis, eccentricity, inclination,
                                longitudeOfAscendingNode, argumentOfPerihelion,
                                meanAnomaly, time, gravitationalParameter):

    // Calculate the Mean Motion (n)
    n = sqrt(gravitationalParameter / semiMajorAxis^3)

    // Calculate the Mean Anomaly (M) at the given time
    M = meanAnomaly + n * (time - timeOfPerihelion)

    // Solve Kepler's Equation for Eccentric Anomaly (E)
    E = solveKeplersEquation(M, eccentricity)

    // Calculate the True Anomaly (ν)
    ν = 2 * atan(sqrt((1 + eccentricity) / (1 - eccentricity)) * tan(E / 2))

    // Calculate the Distance (r) from the central body
    r = semiMajorAxis * (1 - eccentricity * cos(E))

    // Calculate the position in the orbital plane (x', y')
    x' = r * cos(ν)
    y' = r * sin(ν)

    // Convert to 3D space coordinates (x, y, z)
    Ω = longitudeOfAscendingNode
    ω = argumentOfPerihelion
    i = inclination

    x = x' * (cos(Ω) * cos(ω) - sin(Ω) * sin(ω) * cos(i)) - y' * (cos(Ω) * sin(ω) + sin(Ω) * cos(ω) * cos(i))
    y = x' * (sin(Ω) * cos(ω) + cos(Ω) * sin(ω) * cos(i)) + y' * (sin(Ω) * sin(ω) - cos(Ω) * cos(ω) * cos(i))
    z = x' * sin(ω) * sin(i) + y' * cos(ω) * sin(i)

    return (x, y, z)

function solveKeplersEquation(M, e):
    // Initialize E with M for the first iteration
    E = M
    delta = 0.000001  // Convergence criterion

    // Iteratively solve using Newton-Raphson method
    repeat
        E_new = E - (E - e * sin(E) - M) / (1 - e * cos(E))
        if abs(E_new - E) < delta:
            break
        E = E_new
    until converged

    return E
 *
 *
 */
