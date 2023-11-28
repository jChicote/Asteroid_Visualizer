import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { SmallCelestialObjectRepository } from "../../../Domain/Repositories/SmallCelestialObjectRepository.js";
import { SmallCelestialObjectDto } from "../../Dtos/SmallCelestialObjectDto.js";
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

        presenter.PresentAsteroidsAsync(this.mapper.Map(new AsteroidsCollectionContainer(mappedAsteroids), GetNearEarthAsteroidsDto));
    }

    IsNearEarthAsteroid(smallCelestialObject) {
        if (smallCelestialObject.kind === "a" || smallCelestialObject.kind === "an" || smallCelestialObject.kind === "au") {
            return true;
        }

        return false;
    }
}

export { GetNearEarthAsteroidsInteractor };
