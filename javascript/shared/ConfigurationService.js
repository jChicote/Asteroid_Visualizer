import { RegisterFrameworkServices } from "../assets/Framework/DependencyInjection/FrameworkServiceRegistration.js";
import { RegisterApplicationServices } from "../assets/Application/DependencyInjection/ApplicationServiceRegistration.js";
import { ServiceScopes } from "./DepedencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./DepedencyInjectionServices/ServiceProvider.js";
import { Container } from "../../main.js";

export class ConfigurationService {
    ConfigureProject() {
        const container = Container();
        container.RegisterService(ServiceProvider, {}, ServiceScopes.Singleton);

        // Register all services
        RegisterApplicationServices(container);
        RegisterFrameworkServices(container);

        return 0;
    }
}
