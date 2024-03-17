export class PlanetDto {
    constructor(
        argumentOfPerihelion,
        eccentricity,
        endDate,
        inclination,
        longitudeOfAscendingNode,
        meanAnomaly,
        meanMotion,
        meanSolarDay,
        name,
        obliquityToOrbit,
        orbitalSpeed,
        perihelionDistance,
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
        this.meanMotion = meanMotion;
        this.meanSolarDay = meanSolarDay;
        this.name = name;
        this.obliquityToOrbit = obliquityToOrbit;
        this.orbitalSpeed = orbitalSpeed;
        this.perihelionDistance = perihelionDistance;
        this.planetCode = planetCode;
        this.planetRadius = planetRadius;
        this.semiMajorAxis = semiMajorAxis;
        this.sideRealDayPeriod = sideRealDayPeriod;
        this.startDate = startDate;
    }
}
