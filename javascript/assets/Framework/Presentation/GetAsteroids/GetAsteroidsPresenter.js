import { GetAsteroidsViewModel } from "./GetAsteroidsViewModel.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";

class GetAsteroidsPresenter {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
    }

    async PresentAsteroidsAsync(asteroids) {
        this.result = this.mapper.Map(asteroids, GetAsteroidsViewModel);
    }
}

export { GetAsteroidsPresenter };
