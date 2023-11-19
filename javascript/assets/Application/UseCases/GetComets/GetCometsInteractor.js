import { CometsCollectionContainer } from "./GetCometsMapperConfiguration.js";
import { GetCometsDto } from "./GetCometsDto.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { SmallCelestialObjectDto } from "../../Dtos/SmallCelestialObjectDto.js";
import { SmallCelestialObjectRepository } from "../../../Domain/Repositories/SmallCelestialObjectRepository.js";

class GetCometsInteractor {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.repository = ServiceExtractor.ObtainService(serviceDependencies, SmallCelestialObjectRepository);
    }

    async Handle(inputPort, presenter) {
        const smallCelestialObjects = await this.repository.GetEntities();
        const mappedComets = [];

        for (const celestialObject of smallCelestialObjects) {
            if (this.IsComet(celestialObject)) {
                mappedComets.push(this.mapper.Map(celestialObject, SmallCelestialObjectDto));
            }
        }

        presenter.PresentCometsAsync(this.mapper.Map(new CometsCollectionContainer(mappedComets), GetCometsDto));
    }

    IsComet(smallCelestialObject) {
        if (smallCelestialObject.kind === "c" || smallCelestialObject.kind === "cn" || smallCelestialObject.kind === "cu") {
            return true;
        }

        return false;
    }
}

export { GetCometsInteractor };
