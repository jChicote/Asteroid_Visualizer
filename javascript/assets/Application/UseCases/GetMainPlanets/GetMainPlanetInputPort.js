export class GetMainPlanetInputPort {
    constructor(planetCode, capture, heliocentric, physicalBody) {
        this.planetCode = planetCode;
        this.capture = capture;
        this.heliocentric = heliocentric;
        this.physicalBody = physicalBody;
    }
}
