import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { PlanetsController } from "../Controllers/PlanetsController.js";
import { GatewayClient } from "../Infrastructure/Gateways/GatewayClient.js";
import { HorizonsApiGateway } from "../Infrastructure/Gateways/HorizonsApiGateway.js";
import { CreatePlanetPresenter } from "../Presentation/CreatePlanet/CreatePlanetPresenter.js";
import { GetPlanetsPresenter } from "../Presentation/GetPlanets/GetPlanetsPresenter.js";
import { PlanetsAdapter } from "../../InterfaceAdapters/Controllers/PlanetsAdapter.js";
import { CreatePlanetConfiguration } from "../Presentation/CreatePlanet/CreatePlanetConfiguration.js";
import { GetPlanetsConfiguration } from "../Presentation/GetPlanets/GetPlanetsConfiguration.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ProxyServerUrlProvider } from "../Infrastructure/Gateways/Providers/ProxyServerUrlProvider.js";
import { HorizonsApiUriProvider } from "../Infrastructure/Gateways/Providers/HorizonsApiUriProvider.js";
import { PlanetObserver } from "../../../shared/Observers/PlanetObserver.js";
import { SmallBodyApiGateway } from "../Infrastructure/Gateways/SmallBodyApiGateway.js";

/**
 * Registers all the dependencies from the backend application.
 */
export function RegisterFrameworkServices(container) {
    RegisterGateways(container);
    RegisterControllers(container);
    RegisterControllers(container);
    RegisterPresentation(container);
}

/**
 * Register controllers for Dependency Injection.
 */
function RegisterControllers(container) {
    container.RegisterService(PlanetsController, { ServiceProvider, PlanetsAdapter, PlanetObserver });
}

/**
 * Register presenters for Dependency Injection.
 */
function RegisterPresentation(container) {
    container.RegisterService(CreatePlanetPresenter, { ObjectMapper });
    container.RegisterService(GetPlanetsPresenter, { ObjectMapper });
}

/**
 * Registers the API gateways used by the application.
 */
function RegisterGateways(container) {
    container.RegisterService(ProxyServerUrlProvider);
    container.RegisterService(HorizonsApiUriProvider, { ProxyServerUrlProvider });

    container.RegisterService(GatewayClient);
    container.RegisterService(HorizonsApiGateway, { GatewayClient, HorizonsApiUriProvider });
    container.RegisterService(SmallBodyApiGateway, { GatewayClient, ProxyServerUrlProvider });
}

export function ConfigureFrameworkMapperConfigurations(mapper) {
    const createPlanetConfiguration = new CreatePlanetConfiguration();
    const getPlanetsConfiguration = new GetPlanetsConfiguration();

    createPlanetConfiguration.RegisterConfigurations(mapper);
    getPlanetsConfiguration.RegisterConfigurations(mapper);
}
