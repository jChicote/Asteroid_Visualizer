import { ServiceProvider } from "../../../shared/DepedencyInjectionServices/ServiceProvider.js";
import { GetMainPlanetInteractor } from "../../Application/UseCases/GetMainPlanets/GetMainPlanetInteractor.js";
import { PlanetsController } from "../Controllers/PlanetsController.js";
import { GetMainPlanetPresenter } from "../Presentation/GetMainPlanet/GetMainPlanetPresenter.js";
import { HorizonsApiGateway } from "../Infrastructure/Gateways/HorizonsApiGateway.js";

/**
 * Registers all the dependencies from the backend application.
 */
export function RegisterFrameworkServices(container) {
    RegisterGateways(container);
    RegisterApplication(container);
    RegisterControllers(container);
    RegisterControllers(container);
    RegisterPresentation(container);
}

function RegisterApplication(container) {
    container.RegisterService(GetMainPlanetInteractor);
}

/**
 * Register controllers for Dependency Injection.
 */
function RegisterControllers(container) {
    container.RegisterService(PlanetsController, { ServiceProvider, HorizonsApiGateway });
}

/**
 * Register presenters for Dependency Injection.
 */
function RegisterPresentation(container) {
    container.RegisterService(GetMainPlanetPresenter);
}

/**
 * Registers the API gateways used by the application.
 */
function RegisterGateways(container) {
    container.RegisterService(HorizonsApiGateway);
}
