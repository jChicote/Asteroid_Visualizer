import { CreatePlanetConfiguration } from "../Presentation/CreatePlanet/CreatePlanetConfiguration.js";
import { CreatePlanetPresenter } from "../Presentation/CreatePlanet/CreatePlanetPresenter.js";
import { CreateSmallCelestialObjectMapperConfiguration } from "../Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectMapperConfiguration.js";
import { CreateSmallCelestialObjectPresenter } from "../Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectPresenter.js";
import { GatewayClient } from "../Infrastructure/Gateways/GatewayClient.js";
import { GetAsteroidsMapperConfiguration } from "../Presentation/GetAsteroids/GetAsteroidsMapperConfiguration.js";
import { GetAsteroidsPresenter } from "../Presentation/GetAsteroids/GetAsteroidsPresenter.js";
import { GetPlanetsConfiguration } from "../Presentation/GetPlanets/GetPlanetsConfiguration.js";
import { GetPlanetsPresenter } from "../Presentation/GetPlanets/GetPlanetsPresenter.js";
import { HorizonsApiGateway } from "../Infrastructure/Gateways/HorizonsApiGateway.js";
import { HorizonsApiUriProvider } from "../Infrastructure/Gateways/Providers/HorizonsApiUriProvider.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { PlanetObserver } from "../../../shared/Observers/PlanetObserver.js";
import { PlanetsAdapter } from "../../InterfaceAdapters/Controllers/PlanetsAdapter.js";
import { PlanetsController } from "../Controllers/PlanetsController.js";
import { ProxyServerUrlProvider } from "../Infrastructure/Gateways/Providers/ProxyServerUrlProvider.js";
import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { SmallBodyApiGateway } from "../Infrastructure/Gateways/SmallBody/SmallBodyApiGateway.js";
import { SmallBodyApiGatewayMapperConfiguration } from "../Infrastructure/Gateways/SmallBody/SmallBodyApiGatewayMapperConfiguration.js";
import { SmallCelestialObjectAdapter } from "../../InterfaceAdapters/Controllers/SmallCelestialObjectAdapter.js";
import { SmallCelestialObjectsController } from "../Controllers/SmallCelestialObjectsController.js";
import { AsteroidObserver } from "../../../shared/Observers/AsteroidObserver.js";

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
    container.RegisterService(SmallCelestialObjectsController, {
        AsteroidObserver,
        GetAsteroidsPresenter,
        ObjectMapper,
        ServiceProvider,
        SmallCelestialObjectAdapter
    });
}

/**
 * Register presenters for Dependency Injection.
 */
function RegisterPresentation(container) {
    container.RegisterService(CreatePlanetPresenter, { ObjectMapper });
    container.RegisterService(CreateSmallCelestialObjectPresenter);
    container.RegisterService(GetAsteroidsPresenter, { ObjectMapper });
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
    container.RegisterService(SmallBodyApiGateway, { GatewayClient, ProxyServerUrlProvider, ObjectMapper });
}

export function ConfigureFrameworkMapperConfigurations(mapper) {
    // Presentation
    const createPlanetConfiguration = new CreatePlanetConfiguration();
    const createSmallCelestialObjectConfiguration = new CreateSmallCelestialObjectMapperConfiguration();
    const getAsteroidsMapperConfiguration = new GetAsteroidsMapperConfiguration();
    const getPlanetsConfiguration = new GetPlanetsConfiguration();

    createPlanetConfiguration.RegisterConfigurations(mapper);
    createSmallCelestialObjectConfiguration.RegisterConfigurations(mapper);
    getAsteroidsMapperConfiguration.RegisterConfigurations(mapper);
    getPlanetsConfiguration.RegisterConfigurations(mapper);

    // Gateways
    const smallBodyApiGatewayMapperConfiguration = new SmallBodyApiGatewayMapperConfiguration();

    smallBodyApiGatewayMapperConfiguration.RegisterConfigurations(mapper);
}
