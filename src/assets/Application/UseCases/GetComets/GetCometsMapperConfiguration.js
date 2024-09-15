import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { GetCometsDto } from "./GetCometsDto.js";

class GetCometsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(CometsCollectionContainer, GetCometsDto, this.MapCollectionContainerToDto.bind(this));
    }

    MapCollectionContainerToDto(collectionContainer, getCometsDto) {
        getCometsDto.comets = collectionContainer.data;

        return getCometsDto;
    }
}

class CometsCollectionContainer {
    constructor(data) {
        this.data = data;
    }
}

export { GetCometsMapperConfiguration, CometsCollectionContainer };
