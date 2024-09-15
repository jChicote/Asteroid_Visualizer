import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
// import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { SuccessfulResult } from "../Common/PresentationResult.js";
import { GetPotentiallyHazardousAsteroidsViewModel } from "./GetPotentiallyHazardousAsteroidsViewModel.js";

class GetPotentiallyHazardousAsteroidsPresenter {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, "ObjectMapper");
        this.result = {};
    }

    PresentPotentiallyHazardousAsteroidsAsync(asteroids) {
        this.result = new SuccessfulResult(this.mapper.Map(asteroids, GetPotentiallyHazardousAsteroidsViewModel));
    }
}

export { GetPotentiallyHazardousAsteroidsPresenter };
