import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { Planet } from "../../../Domain/Entities/Planet.js";
import { PlanetDto } from "../../Dtos/PlanetDto.js";

export class DtoMappingConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(Planet, PlanetDto, this.MapPlanetToPlanetDto);
    }

    MapPlanetToPlanetDto(planet, planetDto) {
        planetDto.planetCode = planet.planetCode;
        planetDto.eccentricity = planet.eccentricity;
        planetDto.meanAnomaly = planet.meanAnomaly;
        planetDto.planetRadius = planet.planetRadius;
        planetDto.semiMajorAxis = planet.semiMajorAxis;
        planetDto.sideRealDayPeriod = planet.sideRealDayPeriod;

        return planetDto;
    }
}
