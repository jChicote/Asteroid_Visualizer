import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { CreateSmallCelestialObjectCommand } from "./CreateSmallCelestialObjectCommand.js";
import { CreateSmallCelestialObjectInputPort } from "../../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInputPort.js";
import { SmallCelestialBodyViewModel } from "../../Infrastructure/Gateways/SmallBody/SmallCelestialBodyViewModel.js";

class CreateSmallCelestialObjectMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(SmallCelestialBodyViewModel, CreateSmallCelestialObjectCommand, this.MapResponseViewModelToCommand);
        mapper.AddConfiguration(CreateSmallCelestialObjectCommand, CreateSmallCelestialObjectInputPort, this.MapCommandToInputPort);
    }

    MapResponseViewModelToCommand(responseViewModel, command) {
        command.aphelionDistance = responseViewModel.ad;
        command.argumentOfPerihelion = responseViewModel.w;
        command.diameter = responseViewModel.diameter;
        command.eccentricity = responseViewModel.e;
        command.fullName = responseViewModel.full_name;
        command.gravitationMass = responseViewModel.GM;
        command.id = responseViewModel.spkid;
        command.kind = responseViewModel.kind;
        command.longitudeOfTheAscendingNode = responseViewModel.om;
        command.meanAnomaly = responseViewModel.ma;
        command.meanMotion = responseViewModel.n;
        command.orbitalPeriod = responseViewModel.per;
        command.perihelionDistance = responseViewModel.q;
        command.poleRotation = responseViewModel.pole;
        command.semiMajorAxis = responseViewModel.a;
        command.timeOfPerihelion = responseViewModel.tp;

        return command;
    }

    MapCommandToInputPort(command, inputPort) {
        inputPort.aphelionDistance = command.ad;
        inputPort.argumentOfPerihelion = command.w;
        inputPort.diameter = command.diameter;
        inputPort.eccentricity = command.e;
        inputPort.fullName = command.full_name;
        inputPort.gravitationMass = command.GM;
        inputPort.id = command.spkid;
        inputPort.kind = command.kind;
        inputPort.longitudeOfTheAscendingNode = command.om;
        inputPort.meanAnomaly = command.ma;
        inputPort.meanMotion = command.n;
        inputPort.orbitalPeriod = command.per;
        inputPort.perihelionDistance = command.q;
        inputPort.poleRotation = command.pole;
        inputPort.semiMajorAxis = command.a;
        inputPort.timeOfPerihelion = command.tp;

        return inputPort;
    }
}

export { CreateSmallCelestialObjectMapperConfiguration };
