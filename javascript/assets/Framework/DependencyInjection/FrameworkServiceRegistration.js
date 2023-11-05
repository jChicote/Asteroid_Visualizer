import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { PlanetsController } from "../Controllers/PlanetsController.js";
import { GatewayClient } from "../Infrastructure/Gateways/GatewayClient.js";
import { HorizonsApiGateway } from "../Infrastructure/Gateways/HorizonsApiGateway.js";
import { CreatePlanetPresenter } from "../Presentation/CreatePlanet/CreatePlanetPresenter.js";
import { GetPlanetsPresenter } from "../Presentation/GetPlanets/GetPlanetsPresenter.js";
import { PlanetsAdapter } from "../../InterfaceAdapters/Controllers/PlanetsAdapter.js";

/**
 * Registers all the dependencies from the backend application.
 */
export function RegisterFrameworkServices(container) {
    RegisterGateways(container);
    RegisterControllers(container);
    RegisterControllers(container);
    RegisterPresentation(container);
}

/**
 * Register controllers for Dependency Injection.
 */
function RegisterControllers(container) {
    container.RegisterService(PlanetsController, { ServiceProvider, PlanetsAdapter });
}

/**
 * Register presenters for Dependency Injection.
 */
function RegisterPresentation(container) {
    container.RegisterService(CreatePlanetPresenter);
    container.RegisterService(GetPlanetsPresenter);
}

/**
 * Registers the API gateways used by the application.
 */
function RegisterGateways(container) {
    container.RegisterService(GatewayClient);
    container.RegisterService(HorizonsApiGateway, { GatewayClient });
}
