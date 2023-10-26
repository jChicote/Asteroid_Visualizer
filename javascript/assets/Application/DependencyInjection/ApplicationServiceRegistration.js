import { PlanetRepository } from "../../Domain/Repositories/PlanetRepository.js";
import { CreatePlanetInteractor } from "../UseCases/CreatePlanet/CreatePlanetInteractor.js";

/**
 * Registers all the dependencies from the application backend.
 */
export function RegisterApplicationServices(container) {
    container.RegisterService(CreatePlanetInteractor, { PlanetRepository });
}
