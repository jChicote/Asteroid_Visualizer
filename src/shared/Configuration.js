import { ConfigureApplicationMapperConfigurations, RegisterApplicationServices } from "../assets/Application/DependencyInjection/ApplicationServiceRegistration.js";
import { ConfigureFrameworkMapperConfigurations, RegisterFrameworkServices } from "../assets/Framework/DependencyInjection/FrameworkServiceRegistration.js";
import { ObjectMapper } from "./Infrastructure/Mapper/ObjectMapper.js";
import { RegisterDomainServices } from "../assets/Domain/DependencyInjection/DomainServiceRegistration.js";
import { RegisterGameServices } from "../game/Infrastructure/DependencyInjection/GameServiceRegistration.js";
import { RegisterInterfaceAdapterServices } from "../assets/InterfaceAdapters/DependencyInjection/InterfaceAdapterRegistration.js";
import { RegisterSharedServices } from "./DependencyInjectionServices/SharedServiceRegistration.js";
import { RegisterUserInterfaceServices } from "../user-interface/dependency-injection/UserInterfaceRegistration.js";
import { ServiceProvider } from "./DependencyInjectionServices/ServiceProvider.js";
import { ServiceScopes } from "./DependencyInjectionServices/ServiceContainer.js";
import { SolarSystemVisualizer } from "../SolarSystemVisualizer.js";

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
        RegisterUserInterfaceServices(container);

        // Configure mapper
        const mapper = serviceProvider.GetService(ObjectMapper);
        ConfigureApplicationMapperConfigurations(mapper);
        ConfigureFrameworkMapperConfigurations(mapper);

        return 0;
    }
}

export { Configuration };
