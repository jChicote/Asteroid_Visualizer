import { PlanetCodes } from "../../Infrastructure/Gateways/HorizonsApiGateway.js";
import { ErrorResult, SuccessfulResult } from "../Common/PresentationResult.js";
import { CreatePlanetViewModel } from "./CreatePlanetViewModel.js";

export class CreatePlanetPresenter {
    constructor() {
        this.result = {};
    }

    async PresentsPlanetDataAsync(planetData) {
        console.log("Encountered Success");
        this.result = new SuccessfulResult(new CreatePlanetViewModel( // TODO: Create bindings for this
            planetData.startDate,
            planetData.eccentricity,
            planetData.endDate,
            planetData.obliquityToOrbit,
            planetData.orbitalSpeed,
            planetData.meanAnomaly,
            planetData.meanSolarDay,
            planetData.semiMajorAxis,
            planetData.sideRealDayPeriod,
            planetData.planetRadius
        ));
    }

    async PresentPlanetDataNotFoundAsync(planetCode, dataPointName) {
        const planetName = Object.values(PlanetCodes).find(code => code === planetCode);
        this.result = new ErrorResult("The planet " +
            planetName +
            "'s " +
            dataPointName +
            " information was not found.");
    }

    async PresentsRequestFailureAsync(errorMessage) {
        this.result = new ErrorResult(errorMessage);
    }
}
