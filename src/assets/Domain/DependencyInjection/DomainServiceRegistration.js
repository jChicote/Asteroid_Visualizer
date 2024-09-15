import { PlanetRepository } from "../Repositories/PlanetRepository.js";
import { ServiceScopes } from "../../../shared/DependencyInjectionServices/ServiceContainer.js";
import { SmallCelestialObjectRepository } from "../Repositories/SmallCelestialObjectRepository.js";

/**
 * Registers all the services from the Domain project
 */
export function RegisterDomainServices(container) {
    container.RegisterService(PlanetRepository, {}, ServiceScopes.Singleton);
    container.RegisterService(SmallCelestialObjectRepository, {}, ServiceScopes.Singleton);
}
