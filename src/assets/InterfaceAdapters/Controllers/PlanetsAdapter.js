// import { UseCaseMediator } from "../Infrastructure/UseCaseMediator.js";
import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
// import { GetPlanetsInteractor } from "../../Application/UseCases/GetPlanets/GetPlanetsInteractor.js";
import { GetPlanetsInputPort } from "../../Application/UseCases/GetPlanets/GetPlanetsInputPort.js";
// import { CreatePlanetInteractor } from "../../Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { CreatePlanetInputPort } from "../../Application/UseCases/CreatePlanet/CreatePlanetInputPort.js";
import { GetPlanetsPresenter } from "../../Framework/Presentation/GetPlanets/GetPlanetsPresenter.js";
import { CreatePlanetPresenter } from "../../Framework/Presentation/CreatePlanet/CreatePlanetPresenter.js";

export class PlanetsAdapter {
    constructor(serviceDependencies) {
        this.mediator = ServiceExtractor.ObtainService(serviceDependencies, "UseCaseMediator");

        // TODO: This should be done as a configuration settings for the UseCaseMediator registration.
        this.mediator.RegisterUseCase(GetPlanetsInputPort, GetPlanetsPresenter, ServiceExtractor.ObtainService(serviceDependencies, "GetPlanetsInteractor"));
        this.mediator.RegisterUseCase(CreatePlanetInputPort, CreatePlanetPresenter, ServiceExtractor.ObtainService(serviceDependencies, "CreatePlanetInteractor"));
    }

    async CreatePlanetAsync(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }

    async GetPlanetsAsync(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }
}
