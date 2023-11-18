import { PlanetDto } from "../../../Application/Dtos/PlanetDto.js";
import { CreatePlanetViewModel } from "./CreatePlanetViewModel.js";
import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";

export class CreatePlanetConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(PlanetDto, CreatePlanetViewModel, this.MapPlanetDtoToCreatePlanetViewModel);
    }

    MapPlanetDtoToCreatePlanetViewModel(planetDto, createPlanetViewModel) {
        createPlanetViewModel.startDate = planetDto.startDate;
        createPlanetViewModel.eccentricity = planetDto.eccentricity;
        createPlanetViewModel.endDate = planetDto.endDate;
        createPlanetViewModel.obliquityToOrbit = planetDto.obliquityToOrbit;
        createPlanetViewModel.orbitalSpeed = planetDto.orbitalSpeed;
        createPlanetViewModel.meanAnomaly = planetDto.meanAnomaly;
        createPlanetViewModel.meanSolarDay = planetDto.meanSolarDay;
        createPlanetViewModel.semiMajorAxis = planetDto.semiMajorAxis;
        createPlanetViewModel.sideRealDayPeriod = planetDto.sideRealDayPeriod;
        createPlanetViewModel.planetRadius = planetDto.planetRadius;

        return createPlanetViewModel;
    }
}
