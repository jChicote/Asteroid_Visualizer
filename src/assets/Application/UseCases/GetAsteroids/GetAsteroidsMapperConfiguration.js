import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { GetAsteroidsDto } from "./GetAsteroidsDto.js";

class GetAsteroidsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(AsteroidsCollectionContainer, GetAsteroidsDto, this.MapCollectionContainerToDto.bind(this));
    }

    MapCollectionContainerToDto(collectionContainer, getAsteroidsDto) {
        getAsteroidsDto.asteroids = collectionContainer.data;

        return getAsteroidsDto;
    }
}

class AsteroidsCollectionContainer {
    constructor(data) {
        this.data = data;
    }
}

export { AsteroidsCollectionContainer, GetAsteroidsMapperConfiguration };
