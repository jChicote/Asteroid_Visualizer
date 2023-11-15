import { Container } from "../../main.js";
import { RegisterApplicationServices, ConfigureApplicationMapperConfigurations } from "../assets/Application/DependencyInjection/ApplicationServiceRegistration.js";
import { RegisterDomainServices } from "../assets/Domain/DependencyInjection/DomainServiceRegistration.js";
import { RegisterFrameworkServices, ConfigureFrameworkMapperConfigurations } from "../assets/Framework/DependencyInjection/FrameworkServiceRegistration.js";
import { RegisterInterfaceAdapterServices } from "../assets/InterfaceAdapters/DependencyInjection/InterfaceAdapterRegistration.js";
import { ServiceScopes } from "./DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./DependencyInjectionServices/ServiceProvider.js";
import { RegisterSharedServices } from "./DependencyInjectionServices/SharedServiceRegistration.js";
import { ObjectMapper } from "./Infrastructure/Mapper/ObjectMapper.js";
import { PlanetObserver } from "./Observers/PlanetObserver.js";
import { SmallBodyApiGateway } from "../assets/Framework/Infrastructure/Gateways/SmallBodyApiGateway.js";

export class Configuration {
    ConfigureProject() {
        const container = Container();
        container.RegisterService(ServiceProvider, {}, ServiceScopes.Singleton);

        const serviceProvider = container.Resolve(ServiceProvider);

        // Register all services
        RegisterSharedServices(container);
        RegisterDomainServices(container);
        RegisterApplicationServices(container);
        RegisterInterfaceAdapterServices(container);
        RegisterFrameworkServices(container);

        // Configure mapper
        const mapper = serviceProvider.GetService(ObjectMapper);
        ConfigureApplicationMapperConfigurations(mapper);
        ConfigureFrameworkMapperConfigurations(mapper);

        // Configure observers between game and web areas of concern
        container.RegisterService(PlanetObserver, {}, ServiceScopes.Singleton);

        const testGateway = serviceProvider.GetService(SmallBodyApiGateway);
        testGateway.GetAsteroids();

        return 0;
    }
}
