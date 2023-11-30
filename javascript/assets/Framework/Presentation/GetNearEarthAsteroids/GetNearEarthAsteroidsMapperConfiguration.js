import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { GetNearEarthAsteroidsDto } from "../../../Application/UseCases/GetNearEarthAsteroids/GetNearEarthAsteroidsDto.js";
import { AsteroidViewModel } from "../Common/AsteroidViewModel.js";
import { GetNearEarthAsteroidsViewModel } from "./GetNearEarthAsteroidViewModel.js";

class GetNearEarthAsteroidsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(GetNearEarthAsteroidsDto, GetNearEarthAsteroidsViewModel, this.MapGetAsteroidsDtoToViewModel.bind(this));
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
        asteroidViewModel.inclination = smallCelestialObjectDto.inclination;
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

export { GetNearEarthAsteroidsMapperConfiguration };
