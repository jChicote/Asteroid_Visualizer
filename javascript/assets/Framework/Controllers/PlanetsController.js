import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { CreatePlanetInteractor } from "../../Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { CreatePlanetPresenter } from "../Presentation/CreatePlanet/CreatePlanetPresenter.js";
import { CreatePlanetInputPort } from "../../Application/UseCases/CreatePlanet/CreatePlanetInputPort.js";

export class PlanetsController {
    constructor(serviceDependencies) {
        this.serviceProvider = serviceDependencies.find((dependency) => dependency.name === ServiceProvider.name).service;
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
}
