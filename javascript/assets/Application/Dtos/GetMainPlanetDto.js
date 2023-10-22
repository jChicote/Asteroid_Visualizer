export class GetMainPlanetDto {
    constructor(captureData, heliocentricData, physicalBodyData) {
        this.captureData = captureData;
        this.heliocentricData = heliocentricData;
        this.physicalBodyData = physicalBodyData;
    }
}
