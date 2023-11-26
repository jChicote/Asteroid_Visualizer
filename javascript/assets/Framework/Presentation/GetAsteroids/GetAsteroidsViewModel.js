class GetAsteroidsViewModel {
    constructor(asteroids) {
        this.asteroids = asteroids;
    }
}

class AsteroidViewModel {
    constructor(
        id,
        fullName,
        aphelionDistance,
        argumentOfPerihelion,
        diameter,
        eccentricity,
        gravitationMass,
        inclination,
        longitudeOfTheAscendingNode,
        meanAnomaly,
        meanMotion,
        orbitalPeriod,
        perihelionDistance,
        poleRotation,
        semiMajorAxis,
        timeOfPerihelion) {
        this.aphelionDistance = aphelionDistance;
        this.argumentOfPerihelion = argumentOfPerihelion;
        this.diameter = diameter;
        this.eccentricity = eccentricity;
        this.fullName = fullName;
        this.gravitationMass = gravitationMass;
        this.id = id;
        this.inclination = inclination;
        this.longitudeOfTheAscendingNode = longitudeOfTheAscendingNode;
        this.meanAnomaly = meanAnomaly;
        this.meanMotion = meanMotion;
        this.orbitalPeriod = orbitalPeriod;
        this.perihelionDistance = perihelionDistance;
        this.poleRotation = poleRotation;
        this.semiMajorAxis = semiMajorAxis;
        this.timeOfPerihelion = timeOfPerihelion;
    }
}

export { GetAsteroidsViewModel, AsteroidViewModel };
