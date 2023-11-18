export class SmallCelestialBodyViewModel {
    constructor(
        id,
        fullName,
        kind,
        aphelionDistance,
        argumentOfPerihelion,
        diameter,
        eccentricity,
        gravitationMass,
        longitudeOfTheAscendingNode,
        meanAnomaly,
        meanMotion,
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
