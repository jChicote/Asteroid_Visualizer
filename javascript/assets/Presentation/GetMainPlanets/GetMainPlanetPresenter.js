import { ErrorResult, SuccessfulResult } from "../Common/PresentationResult.js";

export class GetMainPlanetPresenter {
    constructor() {
        this.result = {};
    }

    async PresentsPlanetDataAsync(planetData) {
        // TODO: Create a view model instead of passing the planet data directly.
        this.result = new SuccessfulResult(planetData);
    }

    async PresentsPlanetDataNotFoundAsync(planetCode) {
        this.result = new ErrorResult("There is no planet with the code: " + planetCode);
    }

    async PresentsRequestFailureAsync(errorMessage) {
        this.result = new ErrorResult(errorMessage);
    }
}

// TODO: We need to move the services folder out
// TODO: Refactor the extraction logic from the gateway to the presenter
// TODO: We need a base presenter class for holding the result to be then used by the controller