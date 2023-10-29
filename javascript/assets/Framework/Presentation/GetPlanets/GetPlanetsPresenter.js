import { GetPlanetsViewModel, PlanetViewModel } from "./GetPlanetsViewModel.js";
import { SuccessfulResult } from "../Common/PresentationResult.js";

export class GetPlanetsPresenter {
    constructor() {
        this.result = {};
    }

    async PresentPlanetsAsync(planets) {
        const planetResult = planets.map(planet => new PlanetViewModel(
            planet.planetCode,
            planet.eccentricity,
            planet.meanAnomaly,
            planet.planetRadius,
            planet.semiMajorAxis,
            planet.sideRealDayPeriod
        ));

        this.result = new SuccessfulResult(new GetPlanetsViewModel(planetResult));
    }
}
