import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { PlanetRepository } from "../../Domain/Repositories/PlanetRepository.js";
import { SmallCelestialObjectRepository } from "../../Domain/Repositories/SmallCelestialObjectRepository.js";
import { DtoMappingConfiguration } from "../Dtos/Mappings/DtoMappingConfiguration.js";
import { CreatePlanetInteractor } from "../UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { CreatePlanetMapperConfiguration } from "../UseCases/CreatePlanet/CreatePlanetMapperConfiguration.js";
import { CreateSmallCelestialObjectInteractor } from "../UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInteractor.js";
import { CreateSmallCelestialObjectMapperConfiguration } from "../UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectMapperConfiguration.js";
import { GetAsteroidsInteractor } from "../UseCases/GetAsteroids/GetAsteroidsInteractor.js";
import { GetAsteroidsMapperConfiguration } from "../UseCases/GetAsteroids/GetAsteroidsMapperConfiguration.js";
import { GetCometsInteractor } from "../UseCases/GetComets/GetCometsInteractor.js";
import { GetCometsMapperConfiguration } from "../UseCases/GetComets/GetCometsMapperConfiguration.js";
import { GetNearEarthAsteroidsInteractor } from "../UseCases/GetNearEarthAsteroids/GetNearEarthAsteroidsInteractor.js";
import { GetNearEarthAsteroidsMapperConfiguration } from "../UseCases/GetNearEarthAsteroids/GetNearEarthAsteroidsMapperConfiguration.js";
import { GetPlanetsInteractor } from "../UseCases/GetPlanets/GetPlanetsInteractor.js";
import { GetPotentiallyHazardousAsteroidsInteractor } from "../UseCases/GetPotentiallyHazardousAsteroids/GetPotentiallyHazardousAsteroidsInteractor.js";
import { GetPotentiallyHazardousAsteroidsMapperConfiguration } from "../UseCases/GetPotentiallyHazardousAsteroids/GetPotentiallyHazardousAsteroidsMapperConfiguration.js";

/**
 * Registers all the dependencies from the application backend.
 */
export function RegisterApplicationServices(container) {
    container.RegisterService(CreatePlanetInteractor, { ObjectMapper, PlanetRepository });
    container.RegisterService(CreateSmallCelestialObjectInteractor, { ObjectMapper, SmallCelestialObjectRepository });
    container.RegisterService(GetAsteroidsInteractor, { ObjectMapper, SmallCelestialObjectRepository });
    container.RegisterService(GetCometsInteractor, { ObjectMapper, SmallCelestialObjectRepository });
    container.RegisterService(GetPlanetsInteractor, { ObjectMapper, PlanetRepository });
    container.RegisterService(GetNearEarthAsteroidsInteractor, { ObjectMapper, SmallCelestialObjectRepository });
    container.RegisterService(GetPotentiallyHazardousAsteroidsInteractor, { ObjectMapper, SmallCelestialObjectRepository });
}

/**
 * Registers mapping configurations to the mapper service.
 * @param {*} mapper Mapper service to configure mappings too
 */
export function ConfigureApplicationMapperConfigurations(mapper) {
    const getCometsMapperConfiguration = new GetCometsMapperConfiguration();
    const createPlanetConfiguration = new CreatePlanetMapperConfiguration();
    const createSmallCelestialObjectConfiguration = new CreateSmallCelestialObjectMapperConfiguration();
    const dtoMappingConfiguration = new DtoMappingConfiguration();
    const getAsteroidsMapperConfiguration = new GetAsteroidsMapperConfiguration();
    const getNearEarthAsteroidsConfiguration = new GetNearEarthAsteroidsMapperConfiguration();
    const GetPotentiallyHazardousAsteroidsConfiguration = new GetPotentiallyHazardousAsteroidsMapperConfiguration();

    getCometsMapperConfiguration.RegisterConfigurations(mapper);
    createPlanetConfiguration.RegisterConfigurations(mapper);
    createSmallCelestialObjectConfiguration.RegisterConfigurations(mapper);
    dtoMappingConfiguration.RegisterConfigurations(mapper);
    getAsteroidsMapperConfiguration.RegisterConfigurations(mapper);
    getNearEarthAsteroidsConfiguration.RegisterConfigurations(mapper);
    GetPotentiallyHazardousAsteroidsConfiguration.RegisterConfigurations(mapper);
}
