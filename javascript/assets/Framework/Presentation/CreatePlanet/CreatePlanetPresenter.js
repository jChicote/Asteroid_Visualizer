import { ErrorResult, SuccessfulResult } from "../Common/PresentationResult.js";
import { CreatePlanetViewModel } from "./CreatePlanetViewModel.js";
import { PlanetCodes } from "../../Infrastructure/Gateways/HorizonsApiGateway.js";

export class CreatePlanetPresenter {
    constructor() {
        this.result = {};
    }

    async PresentsPlanetDataAsync(planetData) {
        console.log("Encountered Success");
        this.result = new SuccessfulResult(new CreatePlanetViewModel( // TODO: Create bindings for this
            planetData.captureData.startDate,
            planetData.heliocentricData.eccentricity,
            planetData.captureData.endDate,
            planetData.physicalBodyData.obliquityToOrbit,
            planetData.physicalBodyData.orbitalSpeed,
            planetData.heliocentricData.meanAnomaly,
            planetData.physicalBodyData.meanSolarDay,
            planetData.heliocentricData.semiMajorAxis,
            planetData.physicalBodyData.planetRadius
        ));
    }

    async PresentPlanetDataNotFoundAsync(planetCode, dataPointName) {
        this.result = new ErrorResult("The planet " +
            Object.keys(PlanetCodes).find((key) => PlanetCodes[key] === planetCode) +
            "'s " +
            dataPointName +
            " information was not found.");
    }

    async PresentsRequestFailureAsync(errorMessage) {
        console.log("Encountered Error");
        this.result = new ErrorResult(errorMessage);
    }
}

// TODO: We need a base presenter class for holding the result to be then used by the controller
