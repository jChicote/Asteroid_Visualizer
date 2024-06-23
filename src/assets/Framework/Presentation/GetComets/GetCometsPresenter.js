import { GetCometsViewModel } from "./GetCometsViewModel.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { SuccessfulResult } from "../Common/PresentationResult.js";

class GetCometsPresenter {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.result = {};
    }

    async PresentCometsAsync(comets) {
        this.result = new SuccessfulResult(this.mapper.Map(comets, GetCometsViewModel));
    }
}

export { GetCometsPresenter };
