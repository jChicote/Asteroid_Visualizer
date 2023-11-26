export class PlanetDto {
    constructor(
        planetCode,
        eccentricity,
        endDate,
        meanAnomaly,
        meanSolarDay,
        obliquityToOrbit,
        orbitalSpeed,
        planetRadius,
        semiMajorAxis,
        sideRealDayPeriod,
        startDate) {
        this.planetCode = planetCode;
        this.eccentricity = eccentricity;
        this.endDate = endDate;
        this.meanAnomaly = meanAnomaly;
        this.meanSolarDay = meanSolarDay;
        this.obliquityToOrbit = obliquityToOrbit;
        this.orbitalSpeed = orbitalSpeed;
        this.planetRadius = planetRadius;
        this.semiMajorAxis = semiMajorAxis;
        this.sideRealDayPeriod = sideRealDayPeriod;
        this.startDate = startDate;
    }
}
