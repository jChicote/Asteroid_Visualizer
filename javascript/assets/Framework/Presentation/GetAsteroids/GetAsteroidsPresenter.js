import { GetAsteroidsViewModel } from "./GetAsteroidsViewModel.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { SuccessfulResult } from "../Common/PresentationResult.js";

class GetAsteroidsPresenter {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.result = {};
    }

    async PresentAsteroidsAsync(asteroids) {
        this.result = new SuccessfulResult(this.mapper.Map(asteroids, GetAsteroidsViewModel));
    }
}

export { GetAsteroidsPresenter };
