import { ServiceProvider } from '../../../shared/DepedencyInjectionServices/ServiceProvider.js';
import { PlanetsController } from '../../Controllers/PlanetsController.js';
import { GetMainPlanetPresenter } from '../../Presentation/GetMainPlanets/GetMainPlanetPresenter.js';
import { HorizonsApiGateway } from '../gateways/horizons-gateway.js';

/**
 * Registers all the dependencies from the backend application.
 */
export function RegisterBackendServices(container){
    RegisterApplication(container);
    RegisterGateways(container);
    RegisterControllers(container);
    RegisterPresentation(container);
}

function RegisterApplication(container) {
    container.RegisterService(PlanetsController, {HorizonsApiGateway});
}

/**
 * Register controllers for Dependency Injection.
 */
function RegisterControllers(container) {
    container.RegisterService(PlanetsController, {ServiceProvider});
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
