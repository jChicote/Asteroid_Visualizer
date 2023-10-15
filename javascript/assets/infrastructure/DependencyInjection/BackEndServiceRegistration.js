import { PlanetsController } from '../../Controllers/PlanetsController.js';
import { GetMainPlanetsPresenter, TestPresenterService, TestPresenterServiceB } from '../../Presentation/GetMainPlanets/GetMainPlanetsPresenter.js';
import { HorizonsApiGateway } from '../gateways/horizons-gateway.js';
import { ServiceProvider } from '../../../shared/DepedencyInjectionServices/ServiceProvider.js';

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
    container.RegisterService(GetMainPlanetsPresenter, {TestPresenterService, TestPresenterServiceB});
    container.RegisterService(TestPresenterService);
    container.RegisterService(TestPresenterServiceB);
}

/**
 * Registers the API gateways used by the application.
 */
function RegisterGateways(container) {
    container.RegisterService(HorizonsApiGateway);
}
