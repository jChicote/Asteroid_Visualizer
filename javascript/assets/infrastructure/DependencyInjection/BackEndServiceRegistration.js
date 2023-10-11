import { container } from "../../../shared/Startup.js";

/**
 * Registers all the dependencies from the backend application.
 */
export function RegisterServiceDependecies(){
    RegisterControllers();
    RegisterPresentation();
}

/**
 * Register controllers for Dependency Injection.
 */
function RegisterControllers() {
    container.bind(PlanetsController).toSelf();
}

/**
 * Register presenters for Dependency Injection.
 */
function RegisterPresentation() {
    container.bind(GetMainPlanetsPresenter).toSelf();
}
