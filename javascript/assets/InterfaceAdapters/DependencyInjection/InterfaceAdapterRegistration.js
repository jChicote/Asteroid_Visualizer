import { CreatePlanetInteractor } from "../../Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { CreateSmallCelestialObjectInteractor } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInteractor.js";
import { GetPlanetsInteractor } from "../../Application/UseCases/GetPlanets/GetPlanetsInteractor.js";
import { PlanetsAdapter } from "../Controllers/PlanetsAdapter.js";
import { ServiceScopes } from "../../../shared/DependencyInjectionServices/ServiceContainer.js";
import { SmallCelestialObjectAdapter } from "../Controllers/SmallCelestialObjectAdapter.js";
import { UseCaseMediator } from "../Infrastructure/UseCaseMediator.js";

/**
 * Registers all the dependencies from the interface adapters.
 */
export function RegisterInterfaceAdapterServices(container) {
    container.RegisterService(UseCaseMediator, {}, ServiceScopes.Singleton);
    container.RegisterService(SmallCelestialObjectAdapter, { UseCaseMediator, CreateSmallCelestialObjectInteractor }, ServiceScopes.Singleton);
    container.RegisterService(PlanetsAdapter, { UseCaseMediator, GetPlanetsInteractor, CreatePlanetInteractor }, ServiceScopes.Singleton);
}
