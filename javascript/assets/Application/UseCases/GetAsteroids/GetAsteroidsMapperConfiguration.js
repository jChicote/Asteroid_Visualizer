import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { GetAsteroidsDto } from "./GetAsteroidsDto.js";
import { SmallCelestialObject } from "../../../Domain/Entities/SmallCelestialBody.js";
import { SmallCelestialObjectDto } from "../../Dtos/SmallCelestialObjectDto.js";

class GetAsteroidsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(SmallCelestialObject, SmallCelestialObjectDto, this.MapDomainToDto.bind(this));
        mapper.AddConfiguration(AsteroidsCollectionContainer, GetAsteroidsDto, this.MapCollectionContainerToDto.bind(this));
    }

    MapDomainToDto(smallCelestialObject, smallCelestialObjectDto) {
        smallCelestialObjectDto.aphelionDistance = smallCelestialObject.ad;
        smallCelestialObjectDto.argumentOfPerihelion = smallCelestialObject.w;
        smallCelestialObjectDto.diameter = smallCelestialObject.diameter;
        smallCelestialObjectDto.eccentricity = smallCelestialObject.e;
        smallCelestialObjectDto.fullName = smallCelestialObject.full_name;
        smallCelestialObjectDto.gravitationMass = smallCelestialObject.GM;
        smallCelestialObjectDto.id = smallCelestialObject.spkid;
        smallCelestialObjectDto.kind = smallCelestialObject.kind;
        smallCelestialObjectDto.longitudeOfTheAscendingNode = smallCelestialObject.om;
        smallCelestialObjectDto.meanAnomaly = smallCelestialObject.ma;
        smallCelestialObjectDto.meanMotion = smallCelestialObject.n;
        smallCelestialObjectDto.orbitalPeriod = smallCelestialObject.per;
        smallCelestialObjectDto.perihelionDistance = smallCelestialObject.q;
        smallCelestialObjectDto.poleRotation = smallCelestialObject.pole;
        smallCelestialObjectDto.semiMajorAxis = smallCelestialObject.a;
        smallCelestialObjectDto.timeOfPerihelion = smallCelestialObject.tp;

        return smallCelestialObjectDto;
    }

    MapCollectionContainerToDto(collectionContainer, getAsteroidsDto) {
        getAsteroidsDto.data = collectionContainer.data;

        return getAsteroidsDto;
    }
}

class AsteroidsCollectionContainer {
    constructor(data) {
        this.data = data;
    }
}

export { AsteroidsCollectionContainer, GetAsteroidsMapperConfiguration };
