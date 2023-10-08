/**
 * The view model for the main planets of the solar system.
 */
class GetMainPlanetsViewModel {
    constructor(captureDates, ephemeris, physicalBody) {
        this.captureDates = captureDates;
        this.ephemeris = ephemeris;
        this.physicalBody = physicalBody;
    }
}

/**
 * The view model for the capture dates used to timestamp the ephemeris data.
 */
class CaptureDatesViewModel {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

/**
 * The view model for the velocities and quantities used to describe an orbiting body.
 */
class EphemerisViewModel {
    constructor(eccentricity, meanAnomaly, semiMajorAxis) {
        this.eccentricity = eccentricity;
        this.meanAnomaly = meanAnomaly;
        this.semiMajorAxis = semiMajorAxis;
    }
}

/**
 * The view model for the physical quantities used to describe a planet.
 */
class PhysicalBodyViewModel {
    constructor(obliquityToOrbit, orbitalSpeed, planateryRadius, meanSolarDay) {
        this.obliquityToOrbit = obliquityToOrbit;
        this.orbitalSpeed = orbitalSpeed;
        this.planateryRadius = planateryRadius;
        this.meanSolarDay = meanSolarDay;
    }
}   