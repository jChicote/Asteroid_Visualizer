import { CreatePlanetInputPort } from "../../Application/UseCases/CreatePlanet/CreatePlanetInputPort.js";
import { CreatePlanetPresenter } from "../Presentation/CreatePlanet/CreatePlanetPresenter.js";
import { GetPlanetsInputPort } from "../../Application/UseCases/GetPlanets/GetPlanetsInputPort.js";
import { GetPlanetsPresenter } from "../Presentation/GetPlanets/GetPlanetsPresenter.js";
import { PlanetObserver } from "../../../shared/Observers/PlanetObserver.js";
import { PlanetsAdapter } from "../../InterfaceAdapters/Controllers/PlanetsAdapter.js";
import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";

export class PlanetsController {
    constructor(serviceDependencies) {
        this.serviceProvider = ServiceExtractor.ObtainService(serviceDependencies, ServiceProvider);
        this.planetAdapter = ServiceExtractor.ObtainService(serviceDependencies, PlanetsAdapter);
        this.planetObserver = ServiceExtractor.ObtainService(serviceDependencies, PlanetObserver);
    }

    async CreatePlanetAsync(query) {
        const presenter = this.serviceProvider.GetService(CreatePlanetPresenter);

        await this.planetAdapter.CreatePlanetAsync(
            new CreatePlanetInputPort(query.planetCode, query.captureSection, query.heliocentricSection, query.physicalBodySection),
            presenter
        );

        return presenter.result;
    }

    async GetPlanetsAsync() {
        const presenter = this.serviceProvider.GetService(GetPlanetsPresenter);

        await this.planetAdapter.GetPlanetsAsync(new GetPlanetsInputPort(), presenter);
        this.planetObserver.Dispatch("GetPlanets", presenter.result.result.planets);

        return presenter.result;
    }
}
