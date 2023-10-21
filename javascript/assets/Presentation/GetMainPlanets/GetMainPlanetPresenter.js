import { ErrorResult, SuccessfulResult } from "../Common/PresentationResult.js";
import { GetMainPlanetViewModel } from "./GetMainPlanetViewModel.js";

export class GetMainPlanetPresenter {
    constructor() {
        this.result = {};
    }

    async PresentsPlanetDataAsync(planetData) {
        console.log("Encountered Success");
        this.result = new SuccessfulResult(new GetMainPlanetViewModel( // TODO: Create bindings for this
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

    async PresentsPlanetDataNotFoundAsync(planetCode) {
        this.result = new ErrorResult("There is no planet with the code: " + planetCode);
    }

    async PresentsRequestFailureAsync(errorMessage) {
        console.log("Encountered Error");
        this.result = new ErrorResult(errorMessage);
    }
}

// TODO: We need to move the services folder out
// TODO: Refactor the extraction logic from the gateway to the presenter
// TODO: We need a base presenter class for holding the result to be then used by the controller
