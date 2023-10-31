export class PlanetObject {
    constructor(gameObject, planetCode, planetData) {
        this.gameObject = gameObject;
        this.planetCode = planetCode;
        this.planetData = planetData;
        this.planetState = new PlanetState(planetData.meanAnomaly);
    }

    Update() { }
}

export class PlanetState {
    constructor(meanAnomaly) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = 0;
    }
}
