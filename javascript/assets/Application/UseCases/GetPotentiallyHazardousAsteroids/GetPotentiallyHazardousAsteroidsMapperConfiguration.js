import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { CollectionContainer } from "../Common/Containers/CollectionContainer.js";
import { GetPotentiallyHazardousAsteroidsDto } from "./GetPotentiallyHazardousAsteroidsDto.js";

class GetPotentiallyHazardousAsteroidsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(CollectionContainer, GetPotentiallyHazardousAsteroidsDto, this.MapCollectionContainerToDto.bind(this));
    }

    MapCollectionContainerToDto(collectionContainer, dto) {
        dto.asteroids = collectionContainer.data;
    }
}

export { GetPotentiallyHazardousAsteroidsMapperConfiguration };
