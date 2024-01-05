import { SolarSystemVisualizer } from "../../main.js";
import { ConfigureApplicationMapperConfigurations, RegisterApplicationServices } from "../assets/Application/DependencyInjection/ApplicationServiceRegistration.js";
import { RegisterDomainServices } from "../assets/Domain/DependencyInjection/DomainServiceRegistration.js";
import { ConfigureFrameworkMapperConfigurations, RegisterFrameworkServices } from "../assets/Framework/DependencyInjection/FrameworkServiceRegistration.js";
import { RegisterInterfaceAdapterServices } from "../assets/InterfaceAdapters/DependencyInjection/InterfaceAdapterRegistration.js";
import { ServiceScopes } from "./DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./DependencyInjectionServices/ServiceProvider.js";
import { RegisterSharedServices } from "./DependencyInjectionServices/SharedServiceRegistration.js";
import { ObjectMapper } from "./Infrastructure/Mapper/ObjectMapper.js";
import { RegisterGameServices } from "../game/Infrastructure/DependencyInjection/GameServiceRegistration.js";

class Configuration {
    ConfigureProject() {
        const container = SolarSystemVisualizer.serviceContainer; // Referenced in variable for readability.
        container.RegisterService(ServiceProvider, {}, ServiceScopes.Singleton);

        const serviceProvider = container.Resolve(ServiceProvider);

        // Register all services
        RegisterSharedServices(container);
        RegisterDomainServices(container);
        RegisterApplicationServices(container);
        RegisterInterfaceAdapterServices(container);
        RegisterFrameworkServices(container);
        RegisterGameServices(container);

        // Configure mapper
        const mapper = serviceProvider.GetService(ObjectMapper);
        ConfigureApplicationMapperConfigurations(mapper);
        ConfigureFrameworkMapperConfigurations(mapper);

        return 0;
    }
}

export { Configuration };
