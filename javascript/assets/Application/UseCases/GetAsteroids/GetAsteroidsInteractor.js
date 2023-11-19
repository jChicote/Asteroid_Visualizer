import { AsteroidsCollectionContainer } from "./GetAsteroidsMapperConfiguration.js";
import { GetAsteroidsDto } from "./GetAsteroidsDto.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { SmallCelestialObjectDto } from "../../Dtos/SmallCelestialObjectDto.js";
import { SmallCelestialObjectRepository } from "../../../Domain/Repositories/SmallCelestialObjectRepository.js";

class GetAsteroidsInteractor {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.repository = ServiceExtractor.ObtainService(serviceDependencies, SmallCelestialObjectRepository);
    }

    async Handle(inputPort, presenter) {
        const asteroids = await this.repository.GetEntities();
        const mappedAsteroids = [];

        for (const asteroid of asteroids) {
            if (this.IsAsteroid(asteroid)) {
                mappedAsteroids.push(this.mapper.Map(asteroid, SmallCelestialObjectDto));
            }
        }

        presenter.PresentAsteroidsAsync(this.mapper.Map(new AsteroidsCollectionContainer(mappedAsteroids), GetAsteroidsDto));
    }

    IsAsteroid(smallCelestialObject) {
        if (smallCelestialObject.kind === "a" || smallCelestialObject.kind === "an") {
            return true;
        }

        return false;
    }
}

export { GetAsteroidsInteractor };
