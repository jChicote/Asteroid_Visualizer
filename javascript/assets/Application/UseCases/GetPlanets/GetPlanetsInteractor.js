import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { PlanetRepository } from "../../../Domain/Repositories/PlanetRepository.js";
import { PlanetDto } from "../../Dtos/PlanetDto.js";

export class GetPlanetsInteractor {
    constructor(serviceDependencies) {
        this.planetRepository = ServiceExtractor.ObtainService(serviceDependencies, PlanetRepository);
    }

    async Handle(inputPort, presenter) {
        const planets = await this.planetRepository.GetEntities();

        const planetDtos = [];
        planets.forEach(element => {
            planetDtos.push(new PlanetDto(
                element.planetCode,
                element.eccentricity,
                "",
                element.meanAnomaly,
                null,
                null,
                null,
                element.planetRadius,
                element.semiMajorAxis,
                element.sideRealDayPeriod,
                ""
            ));
        });

        presenter.PresentPlanetsAsync(planetDtos);
    }
}
