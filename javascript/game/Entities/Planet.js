import { OrbitalMotionCalculator } from "../Components/OrbitalMechanics/OrbitalMotionCalculator.js";
import { GameObject } from "./GameObject.js";

export class Planet extends GameObject {
    constructor(renderedObject, planetCode, planetData) {
        super();
        this.orbitalMotion = new OrbitalMotionCalculator();

        this.renderedObject = renderedObject;
        this.planetCode = planetCode;
        this.planetData = planetData;
        this.planetState = new PlanetState(planetData.meanAnomaly);
        this.currentTime = 0;
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays();
        this.timeStep = this.orbitalMotion.GetTimeStepInDays(this.orbitalPeriod, this.planetData.sideRealDayPeriod);
    }

    Update() {
        const currentPosition = this.orbitalMotion.GetPlanetOrbitalPosition();
        const meanMotion = this.orbitalMotion.GetMeanMotion(this.orbitalPeriod);
        // this.currentTime = this.orbitalMotion.
    }

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
