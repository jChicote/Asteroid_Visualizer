import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { AsteroidObserver } from "../../../shared/Observers/AsteroidObserver.js";
import { CometObserver } from "../../../shared/Observers/CometObserver.js";
import { CreateSmallCelestialObjectInputPort } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInputPort.js";
import { GetAsteroidsInputPort } from "../../Application/UseCases/GetAsteroids/GetAsteroidsInputPort.js";
import { GetCometsInputPort } from "../../Application/UseCases/GetComets/GetCometsInputPort.js";
import { GetNearEarthAsteroidsInputPort } from "../../Application/UseCases/GetNearEarthAsteroids/GetNearEarthAsteroidsInputPort.js";
import { GetPotentiallyHazardousAsteroidsInputPort } from "../../Application/UseCases/GetPotentiallyHazardousAsteroids/GetPotentiallyHazardousAsteroidsInputPort.js";
import { SmallCelestialObjectAdapter } from "../../InterfaceAdapters/Controllers/SmallCelestialObjectAdapter.js";
import { CreateSmallCelestialObjectPresenter } from "../Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectPresenter.js";
import { GetAsteroidsPresenter } from "../Presentation/GetAsteroids/GetAsteroidsPresenter.js";
import { GetCometsPresenter } from "../Presentation/GetComets/GetCometsPresenter.js";
import { GetNearEarthAsteroidsPresenter } from "../Presentation/GetNearEarthAsteroids/GetNearEarthAsteroidsPresenter.js";
import { GetPotentiallyHazardousAsteroidsPresenter } from "../Presentation/GetPotentiallyHazardousAsteroids/GetPotentiallyHazardousAsteroidsPresenter.js";

class SmallCelestialObjectsController {
    constructor(serviceDependencies) {
        this.asteroidObserver = ServiceExtractor.ObtainService(serviceDependencies, AsteroidObserver);
        this.cometObserver = ServiceExtractor.ObtainService(serviceDependencies, CometObserver);
        this.getAsteroidsPresenter = ServiceExtractor.ObtainService(serviceDependencies, GetAsteroidsPresenter);
        this.getCometsPresenter = ServiceExtractor.ObtainService(serviceDependencies, GetCometsPresenter);
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.serviceProvider = ServiceExtractor.ObtainService(serviceDependencies, ServiceProvider);
        this.smallCelestialObjectAdapter = ServiceExtractor.ObtainService(serviceDependencies, SmallCelestialObjectAdapter);
        this.getNearEarthAsteroidsPresenter = ServiceExtractor.ObtainService(serviceDependencies, GetNearEarthAsteroidsPresenter);
        this.getPotentiallyHazardousAsteroidsPresenter = ServiceExtractor.ObtainService(serviceDependencies, GetPotentiallyHazardousAsteroidsPresenter);
    }

    async CreateSmallCelestialObjectAsync(command) {
        const presenter = this.serviceProvider.GetService(CreateSmallCelestialObjectPresenter);

        await this.smallCelestialObjectAdapter.CreateSmallCelestialObjectAsync(
            this.mapper.Map(command, CreateSmallCelestialObjectInputPort),
            presenter
        );

        // Returns number as there is no presentation
        return 0;
    }

    async GetAsteroidsAsync() {
        await this.smallCelestialObjectAdapter.Invoke(
            new GetAsteroidsInputPort(),
            this.getAsteroidsPresenter
        );

        this.asteroidObserver.Dispatch("GetAsteroids", this.getAsteroidsPresenter.result.result.asteroids);

        return this.getAsteroidsPresenter.result;
    }

    async GetCometsAsync() {
        await this.smallCelestialObjectAdapter.Invoke(
            new GetCometsInputPort(),
            this.getCometsPresenter
        );

        this.cometObserver.Dispatch("GetComets", this.getCometsPresenter.result.result.comets);

        return this.getCometsPresenter.result;
    }

    async GetNearEarthAsteroidsAsync() {
        await this.smallCelestialObjectAdapter.Invoke(
            new GetNearEarthAsteroidsInputPort(),
            this.getNearEarthAsteroidsPresenter
        );

        this.asteroidObserver.Dispatch("GetNearEarthAsteroids", this.getNearEarthAsteroidsPresenter.result.result.asteroids);

        return this.getNearEarthAsteroidsPresenter.result;
    }

    async GetPotentiallyHazardousAsteroidsAsync() {
        await this.smallCelestialObjectAdapter.Invoke(
            new GetPotentiallyHazardousAsteroidsInputPort(),
            this.getPotentiallyHazardousAsteroidsPresenter
        );

        this.asteroidObserver.Dispatch("GetPotentiallyHazardousAsteroids", this.getPotentiallyHazardousAsteroidsPresenter.result.result.asteroids);

        return this.getPotentiallyHazardousAsteroidsPresenter.result;
    }
}

export { SmallCelestialObjectsController };
