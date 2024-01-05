import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { SmallCelestialObjectRepository } from "../../../Domain/Repositories/SmallCelestialObjectRepository.js";
import { SmallCelestialObjectDto } from "../../Dtos/SmallCelestialObjectDto.js";
import { CollectionContainer } from "../Common/Containers/CollectionContainer.js";
import { GetNearEarthAsteroidsDto } from "./GetNearEarthAsteroidsDto.js";

class GetNearEarthAsteroidsInteractor {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.repository = ServiceExtractor.ObtainService(serviceDependencies, SmallCelestialObjectRepository);
    }

    async Handle(inputPort, presenter) {
        const asteroids = await this.repository.GetEntities();

        for (const asteroid of asteroids) {
            if (this.IsNearEarthAsteroid(asteroid)) {
                mappedAsteroids.push(this.mapper.Map(asteroid, SmallCelestialObjectDto));
            }
        }

        presenter.PresentNearEarthAsteroidsAsync(this.mapper.Map(new CollectionContainer(mappedAsteroids), GetNearEarthAsteroidsDto));
    }

    IsNearEarthAsteroid(smallCelestialObject) {
        return smallCelestialObject.nearEarthObject;
    }
}

export { GetNearEarthAsteroidsInteractor };
