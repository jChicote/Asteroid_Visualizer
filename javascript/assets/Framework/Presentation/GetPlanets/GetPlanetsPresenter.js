import { GetPlanetsViewModel, PlanetViewModel } from "./GetPlanetsViewModel.js";
import { SuccessfulResult } from "../Common/PresentationResult.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";

export class GetPlanetsPresenter {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.result = {};
    }

    async PresentPlanetsAsync(planets) {
        const planetResult = planets.map(planet => this.mapper.Map(planet, PlanetViewModel));

        this.result = new SuccessfulResult(new GetPlanetsViewModel(planetResult));
    }
}
