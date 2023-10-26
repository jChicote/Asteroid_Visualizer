import { PlanetRepository } from "../../Domain/Repositories/PlanetRespository.js";
import { GetMainPlanetInteractor } from "../UseCases/GetMainPlanets/GetMainPlanetInteractor.js";

/**
 * Registers all the dependencies from the application backend.
 */
export function RegisterApplicationServices(container) {
    container.RegisterService(GetMainPlanetInteractor, { PlanetRepository });
}
