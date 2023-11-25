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

    CalculateDynamicTimeStep(semiMajorAxis, eccentricity, currentAnomaly) {
        // Calculate the distance from the focal point (e.g., a star) based on the current anomaly
        const distanceFromFocalPoint = semiMajorAxis * (1 - eccentricity * Math.cos(currentAnomaly));

        // Adjust the time step based on the distance; closer objects (smaller distance) have smaller time steps
        const minTimeStep = 0.0001; // Minimum time step, adjust as needed
        const maxTimeStep = 0.01; // Maximum time step, adjust as needed

        // You might want to tweak this formula to suit your specific needs
        const dynamicTimeStep = minTimeStep + (maxTimeStep - minTimeStep) * (distanceFromFocalPoint / semiMajorAxis);

        return dynamicTimeStep;
    }

    ConvertDegreesToRadians(degrees) {
        return degrees * this.PI / 180;
    }

    CalculateMeanAnomaly(meanAnomaly, meanMotion, time, timeOfPerihelionPassage) {
        // console.log(meanAnomaly - (meanAnomaly + meanMotion * (time - timeOfPerihelionPassage)));
        // console.log(time - timeOfPerihelionPassage);
        return meanAnomaly + meanMotion * (time - timeOfPerihelionPassage);
    }

    // CalculateAcceleration(position) {
    //     // The calculation of acceleration in consideration of the gravitation force between the two bodies.
    //     // const r = Math.sqrt(position.reduce((sum, x) => sum + x ** 2, 0));
    //     // const acceleration = position.map(x => -G * M * x / r ** 3);
    //     // return acceleration;
    //     // Calculate the gravitational acceleration (without knowing the mass of the object)
    //     const r = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
    //     const gravitationalAcceleration = this.GRAVITATIONALCONSTANT * this.STARMASS / (r ** 3);

    //     const ax = -gravitationalAcceleration * position.x / r;
    //     const ay = -gravitationalAcceleration * position.y / r;
    //     const az = -gravitationalAcceleration * position.z / r;

    //     return { x: ax, y: ay, z: az };
    // }

    // CalculateVelocity(position) {
    //     // Calculate the radial distance from the central star
    //     const r = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);

    //     // Calculate the magnitude of specific angular momentum (h)
    //     const h = Math.sqrt(this.GRAVITATIONALCONSTANT * this.STARMASS * r);

    //     // Calculate the velocity components (vx, vy, vz)
    //     const vx = (h / r) * (-position.y / r);
    //     const vy = (h / r) * (position.x / r);
    //     const vz = (h / r) * (position.z / r);

    //     // Return the velocity as an object
    //     return { x: vx, y: vy, z: vz };
    // }

    // StabilisePositionAndVelocity(position, velocity, timeStep) {
    //     // Using the RK4 method to stabilise the accuracy of the orbital position and velocity.
    //     const k1v = this.CalculateAcceleration(position);
    //     const k2v = this.CalculateAcceleration({
    //         x: position.x + 0.5 * timeStep * velocity.x,
    //         y: position.y + 0.5 * timeStep * velocity.y,
    //         z: position.z + 0.5 * timeStep * velocity.z
    //     });
    //     const k3v = this.CalculateAcceleration({
    //         x: position.x + 0.5 * timeStep * velocity.x + 0.25 * timeStep ** 2 * k1v.x,
    //         y: position.y + 0.5 * timeStep * velocity.y + 0.25 * timeStep ** 2 * k1v.y,
    //         z: position.z + 0.5 * timeStep * velocity.z + 0.25 * timeStep ** 2 * k1v.z
    //     });
    //     const k4v = this.CalculateAcceleration({
    //         x: position.x + timeStep * velocity.x + 0.5 * timeStep ** 2 * k2v.x,
    //         y: position.y + timeStep * velocity.y + 0.5 * timeStep ** 2 * k2v.y,
    //         z: position.z + timeStep * velocity.z + 0.5 * timeStep ** 2 * k2v.z
    //     });

    //     const newPosition = {
    //         x: position.x + (timeStep / 6) * (velocity.x + 2 * (k2v.x + k3v.x) + k4v.x),
    //         y: position.y + (timeStep / 6) * (velocity.y + 2 * (k2v.y + k3v.y) + k4v.y),
    //         z: position.z + (timeStep / 6) * (velocity.z + 2 * (k2v.z + k3v.z) + k4v.z)
    //     };
    //     const newVelocity = {
    //         x: velocity.x + (timeStep / 6) * (k1v.x + 2 * (k2v.x + k3v.x) + k4v.x),
    //         y: velocity.y + (timeStep / 6) * (k1v.y + 2 * (k2v.y + k3v.y) + k4v.y),
    //         z: velocity.z + (timeStep / 6) * (k1v.z + 2 * (k2v.z + k3v.z) + k4v.z)
    //     };

    //     return { position: newPosition, velocity: newVelocity };
    // }

    // CalculateMagnitude(vector) {
    //     const { x, y, z } = vector;
    //     return Math.sqrt(x * x + y * y + z * z);
    // }

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
        // let objectVelocity = velocity;

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

        // Check that the velocity is not default, otherwise calculate it.
        // if (velocity.x === 0 && velocity.y === 0 && velocity.z === 0) {
        //     objectVelocity = this.CalculateVelocity(positionIn3DSpace);
        // }

        // const stabilisedPositionAndVelocity = this.StabilisePositionAndVelocity(positionIn3DSpace, objectVelocity, timeStep);
        // console.log(stabilisedPositionAndVelocity.position.x * distanceScale);

        // stabilisedPositionAndVelocity.position.x *= distanceScale;
        // stabilisedPositionAndVelocity.position.y *= distanceScale;
        // stabilisedPositionAndVelocity.position.z *= distanceScale;

        // console.log(this.CalculateMagnitude(this.CalculateVelocity(positionIn3DSpace)));

        positionIn3DSpace.x *= distanceScale;
        positionIn3DSpace.y *= distanceScale;
        positionIn3DSpace.z *= distanceScale;

        return { position: positionIn3DSpace, velocity: {} };
    }

    CalculateEccentricAnomaly(meanAnomaly, eccentricity) {
        // let eccentricAnomaly = meanAnomaly;

        // // Iterate over the equation until the result converge
        // while (true) {
        //     const deltaE = (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly) / (1 - eccentricity * Math.cos(eccentricAnomaly));
        //     eccentricAnomaly -= deltaE;

        //     // Check if the result has converged within the tolerance
        //     if (Math.abs(deltaE) < 1e-6) {
        //         break;
        //     }

        //     if (isNaN(eccentricAnomaly)) {
        //         console.log("Detected NaN during calculation of eccentric anomaly.");
        //         break;
        //     }
        // }

        // return eccentricAnomaly;

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
