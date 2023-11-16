import { BaseObjectMapperConfiguration } from "../../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";

export class SmallBodyApiGatewayMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(object, SmallCelestialBody, this.MapResponseToSmallCelestialBody);
    }

    MapResponseToSmallCelestialBodyViewModel(responseContent, smallBody) {

    }
}
