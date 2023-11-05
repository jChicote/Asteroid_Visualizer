import { PlanetsAdapter } from "../Controllers/PlanetsAdapter.js";
import { UseCaseMediator } from "../Infrastructure/UseCaseMediator.js";
import { GetPlanetsInteractor } from "../../Application/UseCases/GetPlanets/GetPlanetsInteractor.js";
import { CreatePlanetInteractor } from "../../Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { ServiceScopes } from "../../../shared/DependencyInjectionServices/ServiceContainer.js";

/**
 * Registers all the dependencies from the interface adapters.
 */
export function RegisterInterfaceAdapterServices(container) {
    container.RegisterService(UseCaseMediator, {}, ServiceScopes.Singleton);
    container.RegisterService(PlanetsAdapter, { UseCaseMediator, GetPlanetsInteractor, CreatePlanetInteractor });
}
