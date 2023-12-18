export class PlanetDto {
    constructor(
        argumentOfPerihelion,
        eccentricity,
        endDate,
        inclination,
        longitudeOfAscendingNode,
        meanAnomaly,
        meanSolarDay,
        obliquityToOrbit,
        orbitalSpeed,
        planetCode,
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
        this.obliquityToOrbit = obliquityToOrbit;
        this.orbitalSpeed = orbitalSpeed;
        this.planetCode = planetCode;
        this.planetRadius = planetRadius;
        this.semiMajorAxis = semiMajorAxis;
        this.sideRealDayPeriod = sideRealDayPeriod;
        this.startDate = startDate;
    }
}
