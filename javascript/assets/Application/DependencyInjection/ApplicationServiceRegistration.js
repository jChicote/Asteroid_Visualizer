import { PlanetRepository } from "../../Domain/Repositories/PlanetRepository.js";
import { CreatePlanetInteractor } from "../UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { GetPlanetsInteractor } from "../UseCases/GetPlanets/GetPlanetsInteractor.js";

/**
 * Registers all the dependencies from the application backend.
 */
export function RegisterApplicationServices(container) {
    container.RegisterService(CreatePlanetInteractor, { PlanetRepository });
    container.RegisterService(GetPlanetsInteractor, { PlanetRepository });
}
