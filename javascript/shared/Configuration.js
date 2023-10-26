import { Container } from "../../main.js";
import { RegisterApplicationServices } from "../assets/Application/DependencyInjection/ApplicationServiceRegistration.js";
import { RegisterDomainServices } from "../assets/Domain/DependencyInjection/DomainServiceRegistration.js";
import { RegisterFrameworkServices } from "../assets/Framework/DependencyInjection/FrameworkServiceRegistration.js";
import { ServiceScopes } from "./DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./DependencyInjectionServices/ServiceProvider.js";

export class Configuration {
    ConfigureProject() {
        const container = Container();
        container.RegisterService(ServiceProvider, {}, ServiceScopes.Singleton);

        // Register all services
        RegisterDomainServices(container);
        RegisterApplicationServices(container);
        RegisterFrameworkServices(container);

        return 0;
    }
}
