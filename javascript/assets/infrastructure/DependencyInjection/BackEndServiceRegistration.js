import { container } from "../../../Shared/StartupContainer";

/**
 * Registers all the dependencies from the backend application.
 */
export function RegisterServiceDependecies(){
    RegisterControllers();
    RegisterPresentation();
}

function RegisterControllers() {
    container.bind(PlanetsController).toSelf();
}

function RegisterPresentation() {

}
