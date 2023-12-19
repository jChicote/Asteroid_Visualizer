import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { PlanetDto } from "../../../Application/Dtos/PlanetDto.js";
import { PlanetViewModel } from "./GetPlanetsViewModel.js";

export class GetPlanetsConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(PlanetDto, PlanetViewModel, this.MapPlanetDtoToPlanetViewMode);
    }

    MapPlanetDtoToPlanetViewMode(planetDto, planetViewModel) {
        planetViewModel.argumentOfPerihelion = planetDto.argumentOfPerihelion;
        planetViewModel.eccentricity = planetDto.eccentricity;
        planetViewModel.inclination = planetDto.inclination;
        planetViewModel.longitudeOfAscendingNode = planetDto.longitudeOfAscendingNode;
        planetViewModel.meanAnomaly = planetDto.meanAnomaly;
        planetViewModel.planetCode = planetDto.planetCode;
        planetViewModel.planetRadius = planetDto.planetRadius;
        planetViewModel.semiMajorAxis = planetDto.semiMajorAxis;
        planetViewModel.sideRealDayPeriod = planetDto.sideRealDayPeriod;

        return planetViewModel;
    }
}
