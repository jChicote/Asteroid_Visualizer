import { CreateSmallCelestialObjectInputPort } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInputPort.js";
import { CreateSmallCelestialObjectInteractor } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInteractor.js";
import { CreateSmallCelestialObjectPresenter } from "../../Framework/Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectPresenter.js";
import { GetAsteroidsInputPort } from "../../Application/UseCases/GetAsteroids/GetAsteroidsInputPort.js";
import { GetAsteroidsInteractor } from "../../Application/UseCases/GetAsteroids/GetAsteroidsInteractor.js";
import { GetAsteroidsPresenter } from "../../Framework/Presentation/GetAsteroids/GetAsteroidsPresenter.js";
import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { UseCaseMediator } from "../Infrastructure/UseCaseMediator.js";

class SmallCelestialObjectAdapter {
    constructor(serviceDependencies) {
        this.mediator = ServiceExtractor.ObtainService(serviceDependencies, UseCaseMediator);

        this.mediator.RegisterUseCase(
            CreateSmallCelestialObjectInputPort,
            CreateSmallCelestialObjectPresenter,
            ServiceExtractor.ObtainService(serviceDependencies, CreateSmallCelestialObjectInteractor));
        this.mediator.RegisterUseCase(
            GetAsteroidsInputPort,
            GetAsteroidsPresenter,
            ServiceExtractor.ObtainService(serviceDependencies, GetAsteroidsInteractor));
    }

    async CreateSmallCelestialObjectAsync(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }

    async GetCometsAsync(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }

    async GetAsteroidsAsync(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }
}

export { SmallCelestialObjectAdapter };
