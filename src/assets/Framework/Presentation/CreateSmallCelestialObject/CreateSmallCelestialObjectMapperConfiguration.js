import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { CreateSmallCelestialObjectInputPort } from "../../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInputPort.js";
import { SmallCelestialBodyViewModel } from "../../Infrastructure/Gateways/SmallBody/SmallCelestialBodyViewModel.js";
import { CreateSmallCelestialObjectCommand } from "./CreateSmallCelestialObjectCommand.js";

class CreateSmallCelestialObjectMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(SmallCelestialBodyViewModel, CreateSmallCelestialObjectCommand, this.MapResponseViewModelToCommand.bind(this));
        mapper.AddConfiguration(CreateSmallCelestialObjectCommand, CreateSmallCelestialObjectInputPort, this.MapCommandToInputPort.bind(this));
    }

    MapResponseViewModelToCommand(responseViewModel, command) {
        command.aphelionDistance = responseViewModel.aphelionDistance;
        command.argumentOfPerihelion = responseViewModel.argumentOfPerihelion;
        command.diameter = responseViewModel.diameter;
        command.eccentricity = responseViewModel.eccentricity;
        command.fullName = responseViewModel.fullName;
        command.gravitationMass = responseViewModel.gravitationMass;
        command.id = responseViewModel.id;
        command.kind = responseViewModel.kind;
        command.inclination = responseViewModel.inclination;
        command.isPotentiallyHazardousAsteroid = responseViewModel.isPotentiallyHazardousAsteroid;
        command.longitudeOfTheAscendingNode = responseViewModel.longitudeOfTheAscendingNode;
        command.meanAnomaly = responseViewModel.meanAnomaly;
        command.meanMotion = responseViewModel.meanMotion;
        command.nearEarthObject = responseViewModel.nearEarthObject;
        command.orbitalPeriod = responseViewModel.orbitalPeriod;
        command.perihelionDistance = responseViewModel.perihelionDistance;
        command.poleRotation = responseViewModel.poleRotation;
        command.semiMajorAxis = responseViewModel.semiMajorAxis;
        command.timeOfPerihelion = responseViewModel.timeOfPerihelion;

        return command;
    }

    MapCommandToInputPort(command, inputPort) {
        inputPort.aphelionDistance = command.aphelionDistance;
        inputPort.argumentOfPerihelion = command.argumentOfPerihelion;
        inputPort.diameter = command.diameter;
        inputPort.eccentricity = command.eccentricity;
        inputPort.fullName = command.fullName;
        inputPort.gravitationMass = command.gravitationMass;
        inputPort.id = command.id;
        inputPort.kind = command.kind;
        inputPort.inclination = command.inclination;
        inputPort.isPotentiallyHazardousAsteroid = command.isPotentiallyHazardousAsteroid;
        inputPort.longitudeOfTheAscendingNode = command.longitudeOfTheAscendingNode;
        inputPort.meanAnomaly = command.meanAnomaly;
        inputPort.meanMotion = command.meanMotion;
        inputPort.nearEarthObject = command.nearEarthObject;
        inputPort.orbitalPeriod = command.orbitalPeriod;
        inputPort.perihelionDistance = command.perihelionDistance;
        inputPort.poleRotation = command.poleRotation;
        inputPort.semiMajorAxis = command.semiMajorAxis;
        inputPort.timeOfPerihelion = command.timeOfPerihelion;

        return inputPort;
    }
}

export { CreateSmallCelestialObjectMapperConfiguration };
