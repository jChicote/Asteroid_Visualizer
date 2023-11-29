import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { SuccessfulResult } from "../Common/PresentationResult.js";
import { GetNearEarthAsteroidViewModel } from "./GetNearEarthAsteroidViewModel.js";
import { GetNearEarthAsteroidsMapperConfiguration } from "./GetNearEarthAsteroidsMapperConfiguration.js";

class GetNearEarthAsteroidsPresenter {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, GetNearEarthAsteroidsMapperConfiguration);
        this.result = {};
    }

    async PresentNearEarthAsteroidsAsync(asteroids) {
        this.result = new SuccessfulResult(this.mapper.Map(asteroids, GetNearEarthAsteroidViewModel));
    }
}

export { GetNearEarthAsteroidsPresenter };
