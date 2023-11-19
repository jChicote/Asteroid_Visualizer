import { AsteroidViewModel, GetAsteroidsViewModel } from "./GetAsteroidsViewModel.js";
import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { GetAsteroidsDto } from "../../../Application/UseCases/GetAsteroids/GetAsteroidsDto.js";

class GetAsteroidsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(GetAsteroidsDto, GetAsteroidsViewModel, this.MapGetAsteroidsDtoToViewModel.bind(this));
    }

    MapGetAsteroidsDtoToViewModel(asteroidsDto, asteroidsViewModel) {
        const mappedAsteroids = [];

        for (const asteroid of asteroidsDto.asteroids) {
            mappedAsteroids.push(this.MapSmallCelestialObjectDtoToAsteroidViewModel(asteroid, new AsteroidViewModel()));
        }

        asteroidsViewModel.asteroids = mappedAsteroids;
        return asteroidsViewModel;
    }

    MapSmallCelestialObjectDtoToAsteroidViewModel(smallCelestialObjectDto, asteroidViewModel) {
        asteroidViewModel.aphelionDistance = smallCelestialObjectDto.aphelionDistance;
        asteroidViewModel.argumentOfPerihelion = smallCelestialObjectDto.argumentOfPerihelion;
        asteroidViewModel.diameter = smallCelestialObjectDto.diameter;
        asteroidViewModel.eccentricity = smallCelestialObjectDto.eccentricity;
        asteroidViewModel.fullName = smallCelestialObjectDto.fullName;
        asteroidViewModel.gravitationMass = smallCelestialObjectDto.gravitationMass;
        asteroidViewModel.id = smallCelestialObjectDto.id;
        asteroidViewModel.longitudeOfTheAscendingNode = smallCelestialObjectDto.longitudeOfTheAscendingNode;
        asteroidViewModel.meanAnomaly = smallCelestialObjectDto.meanAnomaly;
        asteroidViewModel.meanMotion = smallCelestialObjectDto.meanMotion;
        asteroidViewModel.orbitalPeriod = smallCelestialObjectDto.orbitalPeriod;
        asteroidViewModel.perihelionDistance = smallCelestialObjectDto.perihelionDistance;
        asteroidViewModel.poleRotation = smallCelestialObjectDto.poleRotation;
        asteroidViewModel.semiMajorAxis = smallCelestialObjectDto.semiMajorAxis;
        asteroidViewModel.timeOfPerihelion = smallCelestialObjectDto.timeOfPerihelion;

        return asteroidViewModel;
    }
}

export { GetAsteroidsMapperConfiguration };
