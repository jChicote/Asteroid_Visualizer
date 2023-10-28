export class GetPlanetsViewModel {
    constructor(planets) {
        this.planets = planets;
    }
}

export class PlanetViewModel {
    constructor(
        planetCode,
        eccentricity,
        meanAnomaly,
        planetRadius,
        semiMajorAxis) {
        this.planetCode = planetCode;
        this.eccentricity = eccentricity;
        this.meanAnomaly = meanAnomaly;
        this.planetRadius = planetRadius;
        this.semiMajorAxis = semiMajorAxis;
    }
}
