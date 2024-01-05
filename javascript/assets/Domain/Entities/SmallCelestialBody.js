class SmallCelestialObject {
    constructor(
        id,
        fullName,
        kind,
        aphelionDistance,
        argumentOfPerihelion,
        diameter,
        eccentricity,
        gravitationMass,
        inclination,
        isPotentiallyHazardousAsteroid,
        longitudeOfTheAscendingNode,
        meanAnomaly,
        meanMotion,
        nearEarthObject,
        orbitalPeriod,
        perihelionDistance,
        poleRotation,
        semiMajorAxis,
        timeOfPerihelion) {
        this.id = id;
        this.fullName = fullName;
        this.kind = kind;
        this.aphelionDistance = aphelionDistance;
        this.argumentOfPerihelion = argumentOfPerihelion;
        this.diameter = diameter;
        this.eccentricity = eccentricity;
        this.gravitationMass = gravitationMass;
        this.inclination = inclination;
        this.isPotentiallyHazardousAsteroid = isPotentiallyHazardousAsteroid;
        this.longitudeOfTheAscendingNode = longitudeOfTheAscendingNode;
        this.meanAnomaly = meanAnomaly;
        this.meanMotion = meanMotion;
        this.nearEarthObject = nearEarthObject;
        this.orbitalPeriod = orbitalPeriod;
        this.perihelionDistance = perihelionDistance;
        this.poleRotation = poleRotation;
        this.semiMajorAxis = semiMajorAxis;
        this.timeOfPerihelion = timeOfPerihelion;
    }
}

export { SmallCelestialObject };
