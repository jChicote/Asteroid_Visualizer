import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { PlanetDto } from "../../../Application/Dtos/PlanetDto.js";
import { CreatePlanetViewModel } from "./CreatePlanetViewModel.js";

export class CreatePlanetConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(PlanetDto, CreatePlanetViewModel, this.MapPlanetDtoToCreatePlanetViewModel);
    }

    MapPlanetDtoToCreatePlanetViewModel(planetDto, createPlanetViewModel) {
        createPlanetViewModel.argumentOfPerihelion = planetDto.argumentOfPerihelion;
        createPlanetViewModel.eccentricity = planetDto.eccentricity;
        createPlanetViewModel.endDate = planetDto.endDate;
        createPlanetViewModel.inclination = planetDto.inclination;
        createPlanetViewModel.longitudeOfAscendingNode = planetDto.longitudeOfAscendingNode;
        createPlanetViewModel.meanAnomaly = planetDto.meanAnomaly;
        createPlanetViewModel.meanSolarDay = planetDto.meanSolarDay;
        createPlanetViewModel.obliquityToOrbit = planetDto.obliquityToOrbit;
        createPlanetViewModel.orbitalSpeed = planetDto.orbitalSpeed;
        createPlanetViewModel.planetRadius = planetDto.planetRadius;
        createPlanetViewModel.semiMajorAxis = planetDto.semiMajorAxis;
        createPlanetViewModel.sideRealDayPeriod = planetDto.sideRealDayPeriod;
        createPlanetViewModel.startDate = planetDto.startDate;

        return createPlanetViewModel;
    }
}
