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
        smallCelestialObjectDto.aphelionDistance = smallCelestialObject.aphelionDistance;
        smallCelestialObjectDto.argumentOfPerihelion = smallCelestialObject.argumentOfPerihelion;
        smallCelestialObjectDto.diameter = smallCelestialObject.diameter;
        smallCelestialObjectDto.eccentricity = smallCelestialObject.eccentricity;
        smallCelestialObjectDto.fullName = smallCelestialObject.fullName;
        smallCelestialObjectDto.gravitationMass = smallCelestialObject.gravitationMass;
        smallCelestialObjectDto.id = smallCelestialObject.id;
        smallCelestialObjectDto.kind = smallCelestialObject.kind;
        smallCelestialObjectDto.longitudeOfTheAscendingNode = smallCelestialObject.longitudeOfTheAscendingNode;
        smallCelestialObjectDto.meanAnomaly = smallCelestialObject.meanAnomaly;
        smallCelestialObjectDto.meanMotion = smallCelestialObject.meanMotion;
        smallCelestialObjectDto.orbitalPeriod = smallCelestialObject.orbitalPeriod;
        smallCelestialObjectDto.perihelionDistance = smallCelestialObject.perihelionDistance;
        smallCelestialObjectDto.poleRotation = smallCelestialObject.poleRotation;
        smallCelestialObjectDto.semiMajorAxis = smallCelestialObject.semiMajorAxis;
        smallCelestialObjectDto.timeOfPerihelion = smallCelestialObject.timeOfPerihelion;

        return smallCelestialObjectDto;
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
