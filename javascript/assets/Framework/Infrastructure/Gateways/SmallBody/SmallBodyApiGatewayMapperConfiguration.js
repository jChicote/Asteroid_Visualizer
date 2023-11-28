import { BaseObjectMapperConfiguration } from "../../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { SmallCelestialBodyViewModel } from "./SmallCelestialBodyViewModel.js";

class SmallBodyApiGatewayMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(SmallBodyResponseContainer, SmallCelestialBodyViewModel, this.MapResponseToSmallCelestialBodyViewModel.bind(this));
    }

    MapResponseToSmallCelestialBodyViewModel(responseContent, smallBody) {
        smallBody.id = responseContent.data.spkid;
        smallBody.aphelionDistance = this.ParseValidFloat(responseContent.data.ad);
        smallBody.argumentOfPerihelion = this.ParseValidFloat(responseContent.data.w);
        smallBody.diameter = this.ParseValidFloat(responseContent.data.diameter);
        smallBody.eccentricity = this.ParseValidFloat(responseContent.data.e);
        smallBody.fullName = responseContent.data.full_name;
        smallBody.gravitationMass = this.ParseValidFloat(responseContent.data.GM);
        smallBody.inclination = this.ParseValidFloat(responseContent.data.i);
        smallBody.kind = responseContent.data.kind;
        smallBody.isPotentiallyHazardousAsteroid = this.ParseValidBoolean(responseContent.data.pha);
        smallBody.longitudeOfTheAscendingNode = this.ParseValidFloat(responseContent.data.om);
        smallBody.meanAnomaly = this.ParseValidFloat(responseContent.data.ma);
        smallBody.meanMotion = this.ParseValidFloat(responseContent.data.n);
        smallBody.nearEarthObject = this.ParseValidBoolean(responseContent.data.neo);
        smallBody.orbitalPeriod = this.ParseValidFloat(responseContent.data.per);
        smallBody.perihelionDistance = this.ParseValidFloat(responseContent.data.q);
        smallBody.poleRotation = this.ParseValidFloat(responseContent.data.rot_per);
        smallBody.semiMajorAxis = this.ParseValidFloat(responseContent.data.a);
        smallBody.timeOfPerihelion = this.ParseValidFloat(responseContent.data.tp);

        return smallBody;
    }

    ParseValidFloat(data) {
        if (data === null || data === "" || data === undefined) {
            return null;
        }

        return parseFloat(data);
    }

    ParseValidBoolean(data) {
        if (data === "Y") {
            return true;
        }

        return false;
    }
}

class SmallBodyResponseContainer {
    constructor(data) {
        this.data = data;
    }
}

export { SmallBodyApiGatewayMapperConfiguration, SmallBodyResponseContainer };
