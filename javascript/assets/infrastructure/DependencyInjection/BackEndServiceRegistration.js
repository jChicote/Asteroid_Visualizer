import { PlanetsController } from '../../Controllers/PlanetsController.js';
import { GetMainPlanetsPresenter, TestPresenterService, TestPresenterServiceB } from '../../Presentation/GetMainPlanets/GetMainPlanetsPresenter.js';

/**
 * Registers all the dependencies from the backend application.
 */
export function RegisterBackendServices(container){
    RegisterGateways(container);
    RegisterControllers(container);
    RegisterPresentation(container);
}

/**
 * Register controllers for Dependency Injection.
 */
function RegisterControllers(container) {
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

}
