import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { Planet } from "../../../Domain/Entities/Planet.js";

export class CreatePlanetMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(CreatePlanetDataContainer, Planet, this.MapDataContainerToPlanet);
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
        planet.perihelionDistance = dataContainer.heliocentricData.perihelionDistance;
        planet.planetCode = dataContainer.inputPort.planetCode;
        planet.planetRadius = dataContainer.physicalBodyData.planetRadius;
        planet.semiMajorAxis = dataContainer.heliocentricData.semiMajorAxis;
        planet.sideRealDayPeriod = dataContainer.physicalBodyData.sideRealDayPeriod;
        planet.startDate = dataContainer.captureData.startDate;

        return planet;
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
