import { AsteroidViewModel, GetAsteroidsViewModel } from "./GetAsteroidsViewModel.js";
import { BaseObjectMapperConfiguration } from "../../../../shared/Infrastructure/Mapper/BaseObjectMapperConfiguration.js";
import { GetAsteroidsDto } from "../../../Application/UseCases/GetAsteroids/GetAsteroidsDto.js";

class GetAsteroidsMapperConfiguration extends BaseObjectMapperConfiguration {
    RegisterConfigurations(mapper) {
        mapper.AddConfiguration(GetAsteroidsDto, GetAsteroidsViewModel, this.MapGetAsteroidsDtoToViewModel.bind(this));
    }

    MapGetAsteroidsDtoToViewModel(asteroidsDto, asteroidsViewModel) {
        const mappedAsteroids = [];

        for (const asteroid of asteroidsDto.data) {
            mappedAsteroids.push(this.MapSmallCelestialObjectDtoToAsteroidViewModel(asteroid, new AsteroidViewModel()));
        }

        asteroidsViewModel.asteroids = mappedAsteroids;
    }

    MapSmallCelestialObjectDtoToAsteroidViewModel(smallCelestialObjectDto, asteroidViewModel) {
        asteroidViewModel.aphelionDistance = smallCelestialObjectDto.ad;
        asteroidViewModel.argumentOfPerihelion = smallCelestialObjectDto.w;
        asteroidViewModel.diameter = smallCelestialObjectDto.diameter;
        asteroidViewModel.eccentricity = smallCelestialObjectDto.e;
        asteroidViewModel.fullName = smallCelestialObjectDto.full_name;
        asteroidViewModel.gravitationMass = smallCelestialObjectDto.GM;
        asteroidViewModel.id = smallCelestialObjectDto.spkid;
        asteroidViewModel.longitudeOfTheAscendingNode = smallCelestialObjectDto.om;
        asteroidViewModel.meanAnomaly = smallCelestialObjectDto.ma;
        asteroidViewModel.meanMotion = smallCelestialObjectDto.n;
        asteroidViewModel.orbitalPeriod = smallCelestialObjectDto.per;
        asteroidViewModel.perihelionDistance = smallCelestialObjectDto.q;
        asteroidViewModel.poleRotation = smallCelestialObjectDto.pole;
        asteroidViewModel.semiMajorAxis = smallCelestialObjectDto.a;
        asteroidViewModel.timeOfPerihelion = smallCelestialObjectDto.tp;

        return asteroidViewModel;
    }
}

export { GetAsteroidsMapperConfiguration };
