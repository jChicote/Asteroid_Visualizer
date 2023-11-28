export class SmallCelestialBodyViewModel {
    constructor(
        id,
        aphelionDistance,
        argumentOfPerihelion,
        diameter,
        eccentricity,
        fullName,
        gravitationMass,
        inclination,
        kind,
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
        this.aphelionDistance = aphelionDistance;
        this.argumentOfPerihelion = argumentOfPerihelion;
        this.diameter = diameter;
        this.eccentricity = eccentricity;
        this.fullName = fullName;
        this.gravitationMass = gravitationMass;
        this.inclination = inclination;
        this.kind = kind;
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
