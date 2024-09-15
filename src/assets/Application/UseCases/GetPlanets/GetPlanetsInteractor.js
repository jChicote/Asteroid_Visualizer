import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
// import { PlanetRepository } from "../../../Domain/Repositories/PlanetRepository.js";
import { PlanetDto } from "../../Dtos/PlanetDto.js";
// import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";

export class GetPlanetsInteractor {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, "ObjectMapper");
        this.planetRepository = ServiceExtractor.ObtainService(serviceDependencies, "PlanetRepository");
    }

    async Handle(inputPort, presenter) {
        const planets = await this.planetRepository.GetEntities();

        const planetDtos = [];
        planets.forEach(element => {
            planetDtos.push(this.mapper.Map(element, PlanetDto));
        });

        presenter.PresentPlanetsAsync(planetDtos);
    }
}
