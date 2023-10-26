import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { GetMainPlanetInputPort } from "../../Application/UseCases/GetMainPlanets/GetMainPlanetInputPort.js";
import { GetMainPlanetInteractor } from "../../Application/UseCases/GetMainPlanets/GetMainPlanetInteractor.js";
import { HorizonsApiGateway } from "../Infrastructure/Gateways/HorizonsApiGateway.js";
import { GetMainPlanetPresenter } from "../Presentation/GetMainPlanet/GetMainPlanetPresenter.js";

export class PlanetsController {
    constructor(serviceDependencies) {
        this.serviceProvider = serviceDependencies.find((dependency) => dependency.name === ServiceProvider.name).service;
        this.horizonsGateway = serviceDependencies.find((dependency) => dependency.name === HorizonsApiGateway.name).service;
    }

    async GetMainPlanetAsync(query) {
        const interactor = this.serviceProvider.GetService(GetMainPlanetInteractor);
        const presenter = this.serviceProvider.GetService(GetMainPlanetPresenter);

        const response = await this.horizonsGateway.GetPlanetEphemerisData(query.planetCode);

        if (response.isSuccessful) {
            // TODO: Create a mediator to handle the different use cases. The controller should rely on the abstraction of the use case
            await interactor.Handle(
                new GetMainPlanetInputPort(query.planetCode, response.data.captureSection, response.data.heliocentricSection, response.data.physicalBodySection),
                presenter
            );
        } else {
            presenter.PresentsRequestFailureAsync(response.ErrorMessage);
        }

        return presenter.result;
    }
}
