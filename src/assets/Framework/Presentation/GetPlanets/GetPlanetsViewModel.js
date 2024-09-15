export class GetPlanetsViewModel {
    constructor(planets) {
        this.planets = planets;
    }
}

export class PlanetViewModel {
    constructor(
        argumentOfPerihelion,
        eccentricity,
        inclination,
        longitudeOfAscendingNode,
        meanAnomaly,
        meanMotion,
        name,
        perihelionDistance,
        planetCode,
        planetRadius,
        semiMajorAxis,
        sideRealDayPeriod) {
        this.argumentOfPerihelion = argumentOfPerihelion;
        this.eccentricity = eccentricity;
        this.inclination = inclination;
        this.longitudeOfAscendingNode = longitudeOfAscendingNode;
        this.meanAnomaly = meanAnomaly;
        this.meanMotion = meanMotion;
        this.name = name;
        this.perihelionDistance = perihelionDistance;
        this.planetCode = planetCode;
        this.planetRadius = planetRadius;
        this.semiMajorAxis = semiMajorAxis;
        this.sideRealDayPeriod = sideRealDayPeriod;
    }
}
