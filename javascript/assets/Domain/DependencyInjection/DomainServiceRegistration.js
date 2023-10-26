import { PlanetRepository } from "../Repositories/PlanetRespository.js";

/**
 * Registers all the services from the Domain project
 */
export function RegisterDomainServices(container) {
    container.Register(PlanetRepository);
}
