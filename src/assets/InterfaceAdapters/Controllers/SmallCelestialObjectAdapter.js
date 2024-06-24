import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { CreateSmallCelestialObjectInputPort } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInputPort.js";
// import { CreateSmallCelestialObjectInteractor } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInteractor.js";
import { GetAsteroidsInputPort } from "../../Application/UseCases/GetAsteroids/GetAsteroidsInputPort.js";
// import { GetAsteroidsInteractor } from "../../Application/UseCases/GetAsteroids/GetAsteroidsInteractor.js";
import { GetCometsInputPort } from "../../Application/UseCases/GetComets/GetCometsInputPort.js";
// import { GetCometsInteractor } from "../../Application/UseCases/GetComets/GetCometsInteractor.js";
import { GetNearEarthAsteroidsInputPort } from "../../Application/UseCases/GetNearEarthAsteroids/GetNearEarthAsteroidsInputPort.js";
// import { GetNearEarthAsteroidsInteractor } from "../../Application/UseCases/GetNearEarthAsteroids/GetNearEarthAsteroidsInteractor.js";
import { GetPotentiallyHazardousAsteroidsInputPort } from "../../Application/UseCases/GetPotentiallyHazardousAsteroids/GetPotentiallyHazardousAsteroidsInputPort.js";
// import { GetPotentiallyHazardousAsteroidsInteractor } from "../../Application/UseCases/GetPotentiallyHazardousAsteroids/GetPotentiallyHazardousAsteroidsInteractor.js";
import { CreateSmallCelestialObjectPresenter } from "../../Framework/Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectPresenter.js";
import { GetAsteroidsPresenter } from "../../Framework/Presentation/GetAsteroids/GetAsteroidsPresenter.js";
import { GetCometsPresenter } from "../../Framework/Presentation/GetComets/GetCometsPresenter.js";
import { GetNearEarthAsteroidsPresenter } from "../../Framework/Presentation/GetNearEarthAsteroids/GetNearEarthAsteroidsPresenter.js";
import { GetPotentiallyHazardousAsteroidsPresenter } from "../../Framework/Presentation/GetPotentiallyHazardousAsteroids/GetPotentiallyHazardousAsteroidsPresenter.js";
// import { UseCaseMediator } from "../Infrastructure/UseCaseMediator.js";

class SmallCelestialObjectAdapter {
    constructor(serviceDependencies) {
        this.mediator = ServiceExtractor.ObtainService(serviceDependencies, "UseCaseMediator");

        this.mediator.RegisterUseCase(
            CreateSmallCelestialObjectInputPort,
            CreateSmallCelestialObjectPresenter,
            ServiceExtractor.ObtainService(serviceDependencies, "CreateSmallCelestialObjectInteractor"));
        this.mediator.RegisterUseCase(
            GetCometsInputPort,
            GetCometsPresenter,
            ServiceExtractor.ObtainService(serviceDependencies, "GetCometsInteractor"));
        this.mediator.RegisterUseCase(
            GetAsteroidsInputPort,
            GetAsteroidsPresenter,
            ServiceExtractor.ObtainService(serviceDependencies, "GetAsteroidsInteractor"));
        this.mediator.RegisterUseCase(
            GetNearEarthAsteroidsInputPort,
            GetNearEarthAsteroidsPresenter,
            ServiceExtractor.ObtainService(serviceDependencies, "GetNearEarthAsteroidsInteractor"));
        this.mediator.RegisterUseCase(
            GetPotentiallyHazardousAsteroidsInputPort,
            GetPotentiallyHazardousAsteroidsPresenter,
            ServiceExtractor.ObtainService(serviceDependencies, "GetPotentiallyHazardousAsteroidsInteractor"));
    }

    async CreateSmallCelestialObjectAsync(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }

    async Invoke(inputPort, presenter) {
        this.mediator.Invoke(inputPort, presenter);
    }
}

export { SmallCelestialObjectAdapter };
