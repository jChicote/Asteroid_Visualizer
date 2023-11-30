import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { CometViewModel, GetCometsViewModel } from "./GetCometsViewModel.js";
import { GetCometsDto } from "../../../Application/UseCases/GetComets/GetCometsDto.js";

class GetCometsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(GetCometsDto, GetCometsViewModel, this.MapGetCometsDtoToViewModel.bind(this));
    }

    MapGetCometsDtoToViewModel(cometsDto, cometsViewModel) {
        const mappedComets = [];

        for (const comet of cometsDto.comets) {
            mappedComets.push(this.MapSmallCelestialObjectDtoToCometViewModel(comet, new CometViewModel()));
        }

        cometsViewModel.comets = mappedComets;
        return cometsViewModel;
    }

    MapSmallCelestialObjectDtoToCometViewModel(smallCelestialObjectDto, cometViewModel) {
        cometViewModel.aphelionDistance = smallCelestialObjectDto.aphelionDistance;
        cometViewModel.argumentOfPerihelion = smallCelestialObjectDto.argumentOfPerihelion;
        cometViewModel.diameter = smallCelestialObjectDto.diameter;
        cometViewModel.eccentricity = smallCelestialObjectDto.eccentricity;
        cometViewModel.fullName = smallCelestialObjectDto.fullName;
        cometViewModel.gravitationMass = smallCelestialObjectDto.gravitationMass;
        cometViewModel.id = smallCelestialObjectDto.id;
        cometViewModel.inclination = smallCelestialObjectDto.inclination;
        cometViewModel.longitudeOfTheAscendingNode = smallCelestialObjectDto.longitudeOfTheAscendingNode;
        cometViewModel.meanAnomaly = smallCelestialObjectDto.meanAnomaly;
        cometViewModel.meanMotion = smallCelestialObjectDto.meanMotion;
        cometViewModel.orbitalPeriod = smallCelestialObjectDto.orbitalPeriod;
        cometViewModel.perihelionDistance = smallCelestialObjectDto.perihelionDistance;
        cometViewModel.poleRotation = smallCelestialObjectDto.poleRotation;
        cometViewModel.semiMajorAxis = smallCelestialObjectDto.semiMajorAxis;
        cometViewModel.timeOfPerihelion = smallCelestialObjectDto.timeOfPerihelion;

        return cometViewModel;
    }
}

export { GetCometsMapperConfiguration };
