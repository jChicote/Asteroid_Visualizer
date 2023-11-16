import { BaseObjectMapperConfiguration } from "../../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { SmallCelestialBodyViewModel } from "./SmallCelestialBodyViewModel.js";

export class SmallBodyApiGatewayMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(SmallBodyResponseContainer, SmallCelestialBodyViewModel, this.MapResponseToSmallCelestialBodyViewModel);
    }

    MapResponseToSmallCelestialBodyViewModel(responseContent, smallBody) {
        smallBody.id = responseContent.data.spkid;
        smallBody.fullName = responseContent.data.full_name;
        smallBody.kind = responseContent.data.kind;
        smallBody.aphelionDistance = responseContent.data.ad;
        smallBody.argumentOfPerihelion = responseContent.data.w;
        smallBody.diameter = responseContent.data.diameter;
        smallBody.eccentricity = responseContent.data.e;
        smallBody.gravitationMass = responseContent.data.GM;
        smallBody.longitudeOfTheAscendingNode = responseContent.data.om;
        smallBody.meanAnomaly = responseContent.data.ma;
        smallBody.meanMotion = responseContent.data.n;
        smallBody.orbitalPeriod = responseContent.data.per;
        smallBody.perihelionDistance = responseContent.data.q;
        smallBody.poleRotation = responseContent.data.pole;
        smallBody.semiMajorAxis = responseContent.data.a;
        smallBody.timeOfPerihelion = responseContent.data.tp;

        return smallBody;
    }
}

export class SmallBodyResponseContainer {
    constructor(data) {
        this.data = data;
    }
}
