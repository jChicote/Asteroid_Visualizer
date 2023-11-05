import { PlanetRepository } from "../../Domain/Repositories/PlanetRepository.js";
import { CreatePlanetInteractor } from "../UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { CreatePlanetMapperConfiguration } from "../UseCases/CreatePlanet/CreatePlanetMapperConfiguration.js";
import { GetPlanetsInteractor } from "../UseCases/GetPlanets/GetPlanetsInteractor.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";

/**
 * Registers all the dependencies from the application backend.
 */
export function RegisterApplicationServices(container) {
    container.RegisterService(CreatePlanetInteractor, { ObjectMapper, PlanetRepository });
    container.RegisterService(GetPlanetsInteractor, { PlanetRepository });
}

export function ConfigureApplicationMapperConfigurations(mapper) {
    const val = new CreatePlanetMapperConfiguration();
    val.RegisterConfigurations(mapper);
}
