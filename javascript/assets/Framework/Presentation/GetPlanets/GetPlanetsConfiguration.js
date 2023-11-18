import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { PlanetDto } from "../../../Application/Dtos/PlanetDto.js";
import { PlanetViewModel } from "./GetPlanetsViewModel.js";

export class GetPlanetsConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(PlanetDto, PlanetViewModel, this.MapPlanetDtoToPlanetViewMode);
    }

    MapPlanetDtoToPlanetViewMode(planetDto, planetViewModel) {
        planetViewModel.planetCode = planetDto.planetCode;
        planetViewModel.eccentricity = planetDto.eccentricity;
        planetViewModel.meanAnomaly = planetDto.meanAnomaly;
        planetViewModel.planetRadius = planetDto.planetRadius;
        planetViewModel.semiMajorAxis = planetDto.semiMajorAxis;
        planetViewModel.sideRealDayPeriod = planetDto.sideRealDayPeriod;

        return planetViewModel;
    }
}
