import { RegisterBackendServices } from "../assets/Framework/DependencyInjection/BackEndServiceRegistration.js";
import { ServiceScopes } from "./DepedencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./DepedencyInjectionServices/ServiceProvider.js";
import { Container } from "../../main.js";

export class ConfigurationService {
    ConfigureProject() {
        const container = Container();
        container.RegisterService(ServiceProvider, {}, ServiceScopes.Singleton);

        // Register all services
        RegisterBackendServices(container);

        return 0;
    }
}
