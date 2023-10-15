import { RegisterBackendServices } from "../assets/infrastructure/DependencyInjection/BackEndServiceRegistration.js";
import { ServiceContainer, ServiceScopes } from "./DepedencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./DepedencyInjectionServices/ServiceProvider.js";
import { Container } from "../../main.js"

export class ConfigurationService {
    constructor() {}

    ConfigureProject() {
        const container = Container();
        container.RegisterService(ServiceProvider, {}, ServiceScopes.Singleton);

        // Register all services
        RegisterBackendServices(container);


        return 0;
    }

}