import { ServiceProvider } from "../../shared/DepedencyInjectionServices/ServiceProvider.js";
import { GetMainPlanetInputPort, GetMainPlanetInteractor } from "../Application/UseCases/GetMainPlanets/GetMainPlanetInteractor.js";
import { GetMainPlanetPresenter } from "../Presentation/GetMainPlanets/GetMainPlanetPresenter.js";

export class PlanetsController {
    constructor(serviceDependencies) {
        this.serviceProvider = serviceDependencies.find(dependency => dependency.name == ServiceProvider.name).service;
    }

    async GetMainPlanetAsync(query){
        const interactor = serviceProvider.GetService(GetMainPlanetInteractor);
        const presenter = serviceProvider.GetService(GetMainPlanetPresenter);

        // TODO: Create a mediator to handle the different use cases.
        interactor.Handle(new GetMainPlanetInputPort(query.planetCode), presenter);
        return presenter.result;
    }
}