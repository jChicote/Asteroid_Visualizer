/**
 * The view model for the main planets of the solar system.
 */
export class CreatePlanetViewModel {
    constructor(
        argumentOfPerihelion,
        eccentricity,
        endDate,
        inclination,
        longitudeOfAscendingNode,
        meanAnomaly,
        meanSolarDay,
        name,
        obliquityToOrbit,
        orbitalSpeed,
        planetRadius,
        semiMajorAxis,
        sideRealDayPeriod,
        startDate) {
        this.argumentOfPerihelion = argumentOfPerihelion;
        this.eccentricity = eccentricity;
        this.endDate = endDate;
        this.inclination = inclination;
        this.longitudeOfAscendingNode = longitudeOfAscendingNode;
        this.meanAnomaly = meanAnomaly;
        this.meanSolarDay = meanSolarDay;
        this.name = name;
        this.obliquityToOrbit = obliquityToOrbit;
        this.orbitalSpeed = orbitalSpeed;
        this.planetRadius = planetRadius;
        this.semiMajorAxis = semiMajorAxis;
        this.sideRealDayPeriod = sideRealDayPeriod;
        this.startDate = startDate;
    }
}
