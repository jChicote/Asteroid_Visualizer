import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { GetNearEarthAsteroidsDto } from "./GetNearEarthAsteroidsDto.js";

class GetNearEarthAsteroidsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterMapperConfiguration(mapper) {
        mapper.AddConfiguration(CollectionContainer, GetNearEarthAsteroidsDto, this.MapCollectionContainerToDto.bind(this));
    }

    MapCollectionContainerToDto(collectionContainer, dto) {
        dto.asteroids = collectionContainer.data;
    }
}

class CollectionContainer {
    constructor(data) {
        this.data = data;
    }
}

export { CollectionContainer, GetNearEarthAsteroidsMapperConfiguration };
