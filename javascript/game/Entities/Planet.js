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
        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.planetData.semiMajorAxis);
        this.timeStep = this.orbitalMotion.GetTimeStepInDays(this.orbitalPeriod, this.planetData.sideRealDayPeriod);
    }

    Update() {
        this.UpdateOrbitalState();
        this.SetPosition(this.orbitalMotion.GetPlanetOrbitalPosition(this.planetState.meanAnomaly, this.planetData.eccentricity, this.planetData.semiMajorAxis));
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

    UpdateOrbitalState() {
        const meanMotion = this.orbitalMotion.GetMeanMotion(this.orbitalPeriod);
        this.planetState.currentTime += this.timeStep;
        this.planetState.meanAnomaly = this.orbitalMotion.GetCurrentMeanAnomaly(this.planetData.meanAnomaly, meanMotion, this.planetState.currentTime);
    }
}

export class PlanetState {
    constructor(meanAnomaly) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = 0;
    }
}
