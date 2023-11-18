import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { CreateSmallCelestialObjectInputPort } from "./CreateSmallCelestialObjectInputPort.js";
import { SmallCelestialObject } from "../../../Domain/Entities/SmallCelestialBody.js";

class CreateSmallCelestialObjectMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(CreateSmallCelestialObjectInputPort, SmallCelestialObject, this.MapCreateSmallCelestialObjectInputPortToSmallCelestialObject);
    }

    MapCreateSmallCelestialObjectInputPortToSmallCelestialObject(inputPort, smallCelestialObject) {
        smallCelestialObject.aphelionDistance = inputPort.ad;
        smallCelestialObject.argumentOfPerihelion = inputPort.w;
        smallCelestialObject.diameter = inputPort.diameter;
        smallCelestialObject.eccentricity = inputPort.e;
        smallCelestialObject.fullName = inputPort.full_name;
        smallCelestialObject.gravitationMass = inputPort.GM;
        smallCelestialObject.id = inputPort.spkid;
        smallCelestialObject.kind = inputPort.kind;
        smallCelestialObject.longitudeOfTheAscendingNode = inputPort.om;
        smallCelestialObject.meanAnomaly = inputPort.ma;
        smallCelestialObject.meanMotion = inputPort.n;
        smallCelestialObject.orbitalPeriod = inputPort.per;
        smallCelestialObject.perihelionDistance = inputPort.q;
        smallCelestialObject.poleRotation = inputPort.pole;
        smallCelestialObject.semiMajorAxis = inputPort.a;
        smallCelestialObject.timeOfPerihelion = inputPort.tp;

        return smallCelestialObject;
    }
}

export { CreateSmallCelestialObjectMapperConfiguration };
