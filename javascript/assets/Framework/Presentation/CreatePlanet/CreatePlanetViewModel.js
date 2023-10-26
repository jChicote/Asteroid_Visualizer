/**
 * The view model for the main planets of the solar system.
 */
export class CreatePlanetViewModel {
    constructor(
        startDate,
        eccentricity,
        endDate,
        obliquityToOrbit,
        orbitalSpeed,
        meanAnomaly,
        meanSolarDay,
        semiMajorAxis,
        planetRadius) {
        this.startDate = startDate;
        this.eccentricity = eccentricity;
        this.endDate = endDate;
        this.obliquityToOrbit = obliquityToOrbit;
        this.orbitalSpeed = orbitalSpeed;
        this.meanAnomaly = meanAnomaly;
        this.meanSolarDay = meanSolarDay;
        this.semiMajorAxis = semiMajorAxis;
        this.planetRadius = planetRadius;
    }
}
