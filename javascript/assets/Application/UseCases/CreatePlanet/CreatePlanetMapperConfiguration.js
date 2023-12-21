import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { Planet } from "../../../Domain/Entities/Planet.js";

export class CreatePlanetMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(CreatePlanetDataContainer, Planet, this.MapDataContainerToPlanet);
        // mapper.AddConfiguration(CreatePlanetDataContainer, PlanetDto, this.MapDataContainerToPlanetDto);
    }

    MapDataContainerToPlanet(dataContainer, planet) {
        planet.argumentOfPerihelion = dataContainer.heliocentricData.argumentOfPerihelion;
        planet.eccentricity = dataContainer.heliocentricData.eccentricity;
        planet.endDate = dataContainer.captureData.endDate;
        planet.inclination = dataContainer.heliocentricData.inclination;
        planet.longitudeOfAscendingNode = dataContainer.heliocentricData.longitudeOfAscendingNode;
        planet.meanAnomaly = dataContainer.heliocentricData.meanAnomaly;
        planet.meanSolarDay = dataContainer.physicalBodyData.meanSolarDay;
        planet.obliquityToOrbit = dataContainer.physicalBodyData.obliquityToOrbit;
        planet.planetCode = dataContainer.inputPort.planetCode;
        planet.planetRadius = dataContainer.physicalBodyData.planetRadius;
        planet.semiMajorAxis = dataContainer.heliocentricData.semiMajorAxis;
        planet.sideRealDayPeriod = dataContainer.physicalBodyData.sideRealDayPeriod;
        planet.startDate = dataContainer.captureData.startDate;

        return planet;
    }

    // MapDataContainerToPlanetDto(dataContainer, planetDto) {
    //     planetDto.argumentOfPerihelion = dataContainer.heliocentricData.argumentOfPerihelion;
    //     planetDto.eccentricity = dataContainer.heliocentricData.eccentricity;
    //     planetDto.endDate = dataContainer.captureData.endDate;
    //     planetDto.inclination = dataContainer.heliocentricData.inclination;
    //     planetDto.longitudeOfAscendingNode = dataContainer.heliocentricData.longitudeOfAscendingNode;
    //     planetDto.meanAnomaly = dataContainer.heliocentricData.meanAnomaly;
    //     planetDto.meanSolarDay = dataContainer.physicalBodyData.meanSolarDay;
    //     planetDto.obliquityToOrbit = dataContainer.physicalBodyData.obliquityToOrbit;
    //     planetDto.orbitalSpeed = dataContainer.physicalBodyData.orbitalSpeed;
    //     planetDto.planetCode = dataContainer.inputPort.planetCode;
    //     planetDto.planetRadius = dataContainer.physicalBodyData.planetRadius;
    //     planetDto.semiMajorAxis = dataContainer.heliocentricData.semiMajorAxis;
    //     planetDto.sideRealDayPeriod = dataContainer.physicalBodyData.sideRealDayPeriod;
    //     planetDto.startDate = dataContainer.captureData.startDate;

    //     return planetDto;
    // }
}

export class CreatePlanetDataContainer {
    constructor(captureData, heliocentricData, inputPort, physicalBodyData) {
        this.captureData = captureData;
        this.heliocentricData = heliocentricData;
        this.inputPort = inputPort;
        this.physicalBodyData = physicalBodyData;
    }
}
