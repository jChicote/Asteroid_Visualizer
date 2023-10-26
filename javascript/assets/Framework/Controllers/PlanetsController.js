import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { CreatePlanetInteractor } from "../../Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { HorizonsApiGateway } from "../Infrastructure/Gateways/HorizonsApiGateway.js";
import { CreatePlanetPresenter } from "../Presentation/CreatePlanet/CreatePlanetPresenter.js";
import { CreatePlanetInputPort } from "../../Application/UseCases/CreatePlanet/CreatePlanetInputPort.js";

export class PlanetsController {
    constructor(serviceDependencies) {
        this.serviceProvider = serviceDependencies.find((dependency) => dependency.name === ServiceProvider.name).service;
        this.horizonsGateway = serviceDependencies.find((dependency) => dependency.name === HorizonsApiGateway.name).service;
    }

    async GetMainPlanetAsync(query) {
        const interactor = this.serviceProvider.GetService(CreatePlanetInteractor);
        const presenter = this.serviceProvider.GetService(CreatePlanetPresenter);

        const response = await this.horizonsGateway.GetPlanetEphemerisData(query.planetCode);

        if (response.isSuccessful) {
            // TODO: Create a mediator to handle the different use cases. The controller should rely on the abstraction of the use case
            await interactor.Handle(
                new CreatePlanetInputPort(query.planetCode, response.data.captureSection, response.data.heliocentricSection, response.data.physicalBodySection),
                presenter
            );
        } else {
            presenter.PresentsRequestFailureAsync(response.ErrorMessage);
        }

        return presenter.result;
    }
}
