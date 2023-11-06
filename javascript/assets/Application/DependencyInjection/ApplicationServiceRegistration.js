import { PlanetRepository } from "../../Domain/Repositories/PlanetRepository.js";
import { CreatePlanetInteractor } from "../UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { CreatePlanetMapperConfiguration } from "../UseCases/CreatePlanet/CreatePlanetMapperConfiguration.js";
import { GetPlanetsInteractor } from "../UseCases/GetPlanets/GetPlanetsInteractor.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { DtoMappingConfiguration } from "../Infrastructure/Mappings/DtoMappingConfiguration.js";

/**
 * Registers all the dependencies from the application backend.
 */
export function RegisterApplicationServices(container) {
    container.RegisterService(CreatePlanetInteractor, { ObjectMapper, PlanetRepository });
    container.RegisterService(GetPlanetsInteractor, { ObjectMapper, PlanetRepository });
}

/**
 * Registers mapping configurations to the mapper service.
 * @param {*} mapper Mapper service to configure mappings too
 */
export function ConfigureApplicationMapperConfigurations(mapper) {
    const createPlanetConfiguration = new CreatePlanetMapperConfiguration();
    const dtoMappingConfiguration = new DtoMappingConfiguration();

    createPlanetConfiguration.RegisterConfigurations(mapper);
    dtoMappingConfiguration.RegisterConfigurations(mapper);
}
