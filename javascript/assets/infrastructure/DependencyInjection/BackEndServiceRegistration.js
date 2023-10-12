import { PlanetsController } from '../../Controllers/PlanetsController.js';
import { GetMainPlanetsPresenter } from '../../Presentation/GetMainPlanets/GetMainPlanetsPresenter.js';

/**
 * Registers all the dependencies from the backend application.
 */
export function RegisterServiceDependencies(container){
    RegisterControllers(container);
    RegisterPresentation(container);
}

/**
 * Register controllers for Dependency Injection.
 */
function RegisterControllers(container) {
    container.register({
        PlanetsController: asClass(PlanetsController).singleton(),
    });
    // container.bind(PlanetsController).toSelf();
}

/**
 * Register presenters for Dependency Injection.
 */
function RegisterPresentation(container) {
    container.register({
        GetMainPlanetsPresenter: asClass(GetMainPlanetsPresenter).singleton()
    })
    // container.bind(GetMainPlanetsPresenter).toSelf();
}
