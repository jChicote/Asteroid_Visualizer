import { ServiceScopes } from "../../../shared/DependencyInjectionServices/ServiceContainer.js";
import { CreatePlanetInteractor } from "../../Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { CreateSmallCelestialObjectInteractor } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInteractor.js";
import { GetAsteroidsInteractor } from "../../Application/UseCases/GetAsteroids/GetAsteroidsInteractor.js";
import { GetCometsInteractor } from "../../Application/UseCases/GetComets/GetCometsInteractor.js";
import { GetNearEarthAsteroidsInteractor } from "../../Application/UseCases/GetNearEarthAsteroids/GetNearEarthAsteroidsInteractor.js";
import { GetPlanetsInteractor } from "../../Application/UseCases/GetPlanets/GetPlanetsInteractor.js";
import { GetPotentiallyHazardousAsteroidsInteractor } from "../../Application/UseCases/GetPotentiallyHazardousAsteroids/GetPotentiallyHazardousAsteroidsInteractor.js";
import { PlanetsAdapter } from "../Controllers/PlanetsAdapter.js";
import { SmallCelestialObjectAdapter } from "../Controllers/SmallCelestialObjectAdapter.js";
import { UseCaseMediator } from "../Infrastructure/UseCaseMediator.js";

/**
 * Registers all the dependencies from the interface adapters.
 */
export function RegisterInterfaceAdapterServices(container) {
    container.RegisterService(UseCaseMediator, {}, ServiceScopes.Singleton);
    container.RegisterService(SmallCelestialObjectAdapter, {
        UseCaseMediator,
        CreateSmallCelestialObjectInteractor,
        GetAsteroidsInteractor,
        GetCometsInteractor,
        GetNearEarthAsteroidsInteractor,
        GetPotentiallyHazardousAsteroidsInteractor
    }, ServiceScopes.Singleton);
    container.RegisterService(PlanetsAdapter, { UseCaseMediator, GetPlanetsInteractor, CreatePlanetInteractor }, ServiceScopes.Singleton);
}
