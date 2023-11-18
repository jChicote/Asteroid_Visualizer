/**
 * The query to get the main planets of the solar system.
 */
export class CreatePlanetQuery {
    constructor(planetCode, captureSection, heliocentricSection, physicalBodySection) {
        this.planetCode = planetCode;
        this.captureSection = captureSection;
        this.heliocentricSection = heliocentricSection;
        this.physicalBodySection = physicalBodySection;
    }
}
