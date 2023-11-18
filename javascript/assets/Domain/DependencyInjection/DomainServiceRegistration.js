import { ServiceScopes } from "../../../shared/DependencyInjectionServices/ServiceContainer.js";
import { PlanetRepository } from "../Repositories/PlanetRepository.js";

/**
 * Registers all the services from the Domain project
 */
export function RegisterDomainServices(container) {
    container.RegisterService(PlanetRepository, {}, ServiceScopes.Singleton);
}
