import { CreateSmallCelestialObjectInputPort } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInputPort.js";
import { AsteroidObserver } from "../../../shared/Observers/AsteroidObserver.js";
import { CreateSmallCelestialObjectPresenter } from "../Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectPresenter.js";
import { GetAsteroidsInputPort } from "../../Application/UseCases/GetAsteroids/GetAsteroidsInputPort.js";
import { GetAsteroidsPresenter } from "../Presentation/GetAsteroids/GetAsteroidsPresenter.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { SmallCelestialObjectAdapter } from "../../InterfaceAdapters/Controllers/SmallCelestialObjectAdapter.js";

class SmallCelestialObjectsController {
    constructor(serviceDependencies) {
        this.asteroidObserver = ServiceExtractor.ObtainService(serviceDependencies, AsteroidObserver);
        this.getAsteroidsPresenter = ServiceExtractor.ObtainService(serviceDependencies, GetAsteroidsPresenter);
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.serviceProvider = ServiceExtractor.ObtainService(serviceDependencies, ServiceProvider);
        this.smallCelestialObjectAdapter = ServiceExtractor.ObtainService(serviceDependencies, SmallCelestialObjectAdapter);
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
        await this.smallCelestialObjectAdapter.GetAsteroidsAsync(
            new GetAsteroidsInputPort(),
            this.getAsteroidsPresenter
        );

        this.asteroidObserver.Dispatch("GetAsteroids", this.getAsteroidsPresenter.result.result.asteroids);

        return this.getAsteroidsPresenter.result;
    }
}

export { SmallCelestialObjectsController };
