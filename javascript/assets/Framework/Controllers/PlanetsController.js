import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { CreatePlanetInteractor } from "../../Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { CreatePlanetPresenter } from "../Presentation/CreatePlanet/CreatePlanetPresenter.js";
import { CreatePlanetInputPort } from "../../Application/UseCases/CreatePlanet/CreatePlanetInputPort.js";
import { GetPlanetsInteractor } from "../../Application/UseCases/GetPlanets/GetPlanetsInteractor.js";
import { GetPlanetsPresenter } from "../Presentation/GetPlanets/GetPlanetsPresenter.js";
import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";

export class PlanetsController {
    constructor(serviceDependencies) {
        this.serviceProvider = ServiceExtractor.ExtractService(serviceDependencies, ServiceProvider);
    }

    async CreatePlanetAsync(query) {
        const interactor = this.serviceProvider.GetService(CreatePlanetInteractor);
        const presenter = this.serviceProvider.GetService(CreatePlanetPresenter);

        await interactor.Handle(
            new CreatePlanetInputPort(query.planetCode, query.captureSection, query.heliocentricSection, query.physicalBodySection),
            presenter
        );

        return presenter.result;
    }

    async GetPlanetsAsync() {
        const interactor = this.serviceProvider.GetService(GetPlanetsInteractor);
        const presenter = this.serviceProvider.GetService(GetPlanetsPresenter);

        await interactor.Handle(undefined, presenter);

        return presenter.result;
    }
}
