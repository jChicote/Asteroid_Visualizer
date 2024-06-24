import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
// import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { SuccessfulResult } from "../Common/PresentationResult.js";
import { GetNearEarthAsteroidsViewModel } from "./GetNearEarthAsteroidViewModel.js";

class GetNearEarthAsteroidsPresenter {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, "ObjectMapper");
        this.result = {};
    }

    async PresentNearEarthAsteroidsAsync(asteroids) {
        this.result = new SuccessfulResult(this.mapper.Map(asteroids, GetNearEarthAsteroidsViewModel));
    }
}

export { GetNearEarthAsteroidsPresenter };
