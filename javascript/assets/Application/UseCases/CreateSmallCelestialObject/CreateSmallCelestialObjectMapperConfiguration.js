import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { SmallCelestialObject } from "../../../Domain/Entities/SmallCelestialBody.js";
import { CreateSmallCelestialObjectInputPort } from "./CreateSmallCelestialObjectInputPort.js";

class CreateSmallCelestialObjectMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(CreateSmallCelestialObjectInputPort, SmallCelestialObject, this.MapCreateSmallCelestialObjectInputPortToSmallCelestialObject);
    }

    MapCreateSmallCelestialObjectInputPortToSmallCelestialObject(inputPort, smallCelestialObject) {
        smallCelestialObject.aphelionDistance = inputPort.aphelionDistance;
        smallCelestialObject.argumentOfPerihelion = inputPort.argumentOfPerihelion;
        smallCelestialObject.diameter = inputPort.diameter;
        smallCelestialObject.eccentricity = inputPort.eccentricity;
        smallCelestialObject.fullName = inputPort.fullName;
        smallCelestialObject.gravitationMass = inputPort.gravitationMass;
        smallCelestialObject.id = inputPort.id;
        smallCelestialObject.kind = inputPort.kind;
        smallCelestialObject.inclination = inputPort.inclination;
        smallCelestialObject.longitudeOfTheAscendingNode = inputPort.longitudeOfTheAscendingNode;
        smallCelestialObject.meanAnomaly = inputPort.meanAnomaly;
        smallCelestialObject.meanMotion = inputPort.meanMotion;
        smallCelestialObject.nearEarthObject = inputPort.nearEarthObject;
        smallCelestialObject.orbitalPeriod = inputPort.orbitalPeriod;
        smallCelestialObject.perihelionDistance = inputPort.perihelionDistance;
        smallCelestialObject.poleRotation = inputPort.poleRotation;
        smallCelestialObject.semiMajorAxis = inputPort.semiMajorAxis;
        smallCelestialObject.timeOfPerihelion = inputPort.timeOfPerihelion;

        return smallCelestialObject;
    }
}

export { CreateSmallCelestialObjectMapperConfiguration };
