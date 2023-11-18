import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { SmallCelestialObject } from "../../../Domain/Entities/SmallCelestialBody.js";
import { SmallCelestialObjectRepository } from "../../../Domain/Repositories/SmallCelestialObjectRepository.js";

class CreateSmallCelestialObjectInteractor {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.repository = ServiceExtractor.ObtainService(serviceDependencies, SmallCelestialObjectRepository);
    }

    async Handle(inputPort, presenter) {
        const smallCelestialObject = this.mapper.Map(inputPort, SmallCelestialObject);
        await this.repository.Add(smallCelestialObject);
    }
}

export { CreateSmallCelestialObjectInteractor };
