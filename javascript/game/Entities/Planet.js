import { GameObject } from "./GameObject.js";

export class Planet extends GameObject {
    constructor(renderedObject, planetCode, planetData) {
        super();
        this.renderedObject = renderedObject;
        this.planetCode = planetCode;
        this.planetData = planetData;
        this.planetState = new PlanetState(planetData.meanAnomaly);
    }

    Update() { }

    GetState() {
        return this.planetState;
    }

    GetData() {
        return this.planetData;
    }

    GetCodeIdentifier() {
        return this.planetCode;
    }

    SetPosition(position) {
        this.renderedObject.position.set(position.x, position.y, position.z);
    }
}

export class PlanetState {
    constructor(meanAnomaly) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = 0;
    }
}
