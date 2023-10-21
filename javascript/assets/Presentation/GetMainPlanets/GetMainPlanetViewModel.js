/**
 * The view model for the main planets of the solar system.
 */
export class GetMainPlanetViewModel {
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

// /**
//  * The view model for the capture dates used to timestamp the ephemeris data.
//  */
// class CaptureDatesViewModel {
//     constructor(startDate, endDate) {
//         this.startDate = startDate;
//         this.endDate = endDate;
//     }
// }

// /**
//  * The view model for the velocities and quantities used to describe an orbiting body.
//  */
// class EphemerisViewModel {
//     constructor(eccentricity, meanAnomaly, semiMajorAxis) {
//         this.eccentricity = eccentricity;
//         this.meanAnomaly = meanAnomaly;
//         this.semiMajorAxis = semiMajorAxis;
//     }
// }

// /**
//  * The view model for the physical quantities used to describe a planet.
//  */
// class PhysicalBodyViewModel {
//     constructor(obliquityToOrbit, orbitalSpeed, planateryRadius, meanSolarDay) {
//         this.obliquityToOrbit = obliquityToOrbit;
//         this.orbitalSpeed = orbitalSpeed;
//         this.planateryRadius = planateryRadius;
//         this.meanSolarDay = meanSolarDay;
//     }
// }
