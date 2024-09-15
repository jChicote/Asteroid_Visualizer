import { EventMediator } from "../mediator/EventMediator.js";
import { ServiceScopes } from "../../shared/DependencyInjectionServices/ServiceContainer.js";

function RegisterUserInterfaceServices(container) {
    container.RegisterService(EventMediator, {}, ServiceScopes.Singleton);
}

export { RegisterUserInterfaceServices };
