import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { Planet } from "../../../Domain/Entities/Planet.js";
import { SmallCelestialObject } from "../../../Domain/Entities/SmallCelestialBody.js";
import { PlanetDto } from "../../Dtos/PlanetDto.js";
import { SmallCelestialObjectDto } from "../../Dtos/SmallCelestialObjectDto.js";

class DtoMappingConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(Planet, PlanetDto, this.MapPlanetToPlanetDto.bind(this));
        mapper.AddConfiguration(SmallCelestialObject, SmallCelestialObjectDto, this.MapSmallCelestialObjectToDto.bind(this));
    }

    MapPlanetToPlanetDto(planet, planetDto) {
        planetDto.argumentOfPerihelion = planet.argumentOfPerihelion;
        planetDto.eccentricity = planet.eccentricity;
        planetDto.inclination = planet.inclination;
        planetDto.longitudeOfTheAscendingNode = planet.longitudeOfTheAscendingNode;
        planetDto.meanAnomaly = planet.meanAnomaly;
        planetDto.planetCode = planet.planetCode;
        planetDto.planetRadius = planet.planetRadius;
        planetDto.semiMajorAxis = planet.semiMajorAxis;
        planetDto.sideRealDayPeriod = planet.sideRealDayPeriod;

        return planetDto;
    }

    MapSmallCelestialObjectToDto(smallCelestialObject, smallCelestialObjectDto) {
        smallCelestialObjectDto.aphelionDistance = smallCelestialObject.aphelionDistance;
        smallCelestialObjectDto.argumentOfPerihelion = smallCelestialObject.argumentOfPerihelion;
        smallCelestialObjectDto.diameter = smallCelestialObject.diameter;
        smallCelestialObjectDto.eccentricity = smallCelestialObject.eccentricity;
        smallCelestialObjectDto.fullName = smallCelestialObject.fullName;
        smallCelestialObjectDto.gravitationMass = smallCelestialObject.gravitationMass;
        smallCelestialObjectDto.id = smallCelestialObject.id;
        smallCelestialObjectDto.kind = smallCelestialObject.kind;
        smallCelestialObjectDto.inclination = smallCelestialObject.inclination;
        smallCelestialObjectDto.isPotentiallyHazardousAsteroid = smallCelestialObject.isPotentiallyHazardousAsteroid;
        smallCelestialObjectDto.longitudeOfTheAscendingNode = smallCelestialObject.longitudeOfTheAscendingNode;
        smallCelestialObjectDto.meanAnomaly = smallCelestialObject.meanAnomaly;
        smallCelestialObjectDto.meanMotion = smallCelestialObject.meanMotion;
        smallCelestialObjectDto.nearEarthObject = smallCelestialObject.nearEarthObject;
        smallCelestialObjectDto.orbitalPeriod = smallCelestialObject.orbitalPeriod;
        smallCelestialObjectDto.perihelionDistance = smallCelestialObject.perihelionDistance;
        smallCelestialObjectDto.poleRotation = smallCelestialObject.poleRotation;
        smallCelestialObjectDto.semiMajorAxis = smallCelestialObject.semiMajorAxis;
        smallCelestialObjectDto.timeOfPerihelion = smallCelestialObject.timeOfPerihelion;

        return smallCelestialObjectDto;
    }
}

export { DtoMappingConfiguration };
