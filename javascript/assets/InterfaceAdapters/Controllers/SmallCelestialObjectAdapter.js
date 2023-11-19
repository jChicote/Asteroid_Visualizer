import { CreateSmallCelestialObjectInputPort } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInputPort.js";
import { CreateSmallCelestialObjectInteractor } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInteractor.js";
import { CreateSmallCelestialObjectPresenter } from "../../Framework/Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectPresenter.js";
import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { UseCaseMediator } from "../Infrastructure/UseCaseMediator.js";

class SmallCelestialObjectAdapter {
    constructor(serviceDependencies) {
        this.mediator = ServiceExtractor.ObtainService(serviceDependencies, UseCaseMediator);

        this.mediator.RegisterUseCase(CreateSmallCelestialObjectInputPort, CreateSmallCelestialObjectPresenter, ServiceExtractor.ObtainService(serviceDependencies, CreateSmallCelestialObjectInteractor));
    }

    async CreateSmallCelestialObjectAsync(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }

    async GetSmallCelestialObjectsAsync(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }
}

export { SmallCelestialObjectAdapter };
