import { Planet } from "../../../Domain/Entities/Planet.js";
import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { PlanetDto } from "../../Dtos/PlanetDto.js";

export class CreatePlanetMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(CreatePlanetDataContainer, Planet, this.MapDataContainerToPlanet);
        mapper.AddConfiguration(CreatePlanetDataContainer, PlanetDto, this.MapDataContainerToPlanetDto);
    }

    MapDataContainerToPlanet(dataContainer, planet) {
        planet.planetCode = dataContainer.inputPort.planetCode;
        planet.eccentricity = dataContainer.heliocentricData.eccentricity;
        planet.meanAnomaly = dataContainer.heliocentricData.meanAnomaly;
        planet.planetRadius = dataContainer.physicalBodyData.planetRadius;
        planet.semiMajorAxis = dataContainer.heliocentricData.semiMajorAxis;
        planet.sideRealDayPeriod = dataContainer.physicalBodyData.sideRealDayPeriod;

        return planet;
    }

    MapDataContainerToPlanetDto(dataContainer, planetDto) {
        planetDto.planetCode = dataContainer.inputPort.planetCode;
        planetDto.eccentricity = dataContainer.heliocentricData.eccentricity;
        planetDto.endDate = dataContainer.captureData.endDate;
        planetDto.meanAnomaly = dataContainer.heliocentricData.meanAnomaly;
        planetDto.meanSolarDay = dataContainer.physicalBodyData.meanSolarDay;
        planetDto.obliquityToOrbit = dataContainer.physicalBodyData.obliquityToOrbit;
        planetDto.orbitalSpeed = dataContainer.physicalBodyData.orbitalSpeed;
        planetDto.planetRadius = dataContainer.physicalBodyData.planetRadius;
        planetDto.semiMajorAxis = dataContainer.heliocentricData.semiMajorAxis;
        planetDto.sideRealDayPeriod = dataContainer.physicalBodyData.sideRealDayPeriod;
        planetDto.startDate = dataContainer.captureData.startDate;

        return planetDto;
    }
}

export class CreatePlanetDataContainer {
    constructor(captureData, heliocentricData, inputPort, physicalBodyData) {
        this.captureData = captureData;
        this.heliocentricData = heliocentricData;
        this.inputPort = inputPort;
        this.physicalBodyData = physicalBodyData;
    }
}
