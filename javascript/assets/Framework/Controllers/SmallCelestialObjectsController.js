import { CreateSmallCelestialObjectInputPort } from "../../Application/UseCases/CreateSmallCelestialObject/CreateSmallCelestialObjectInputPort.js";
import { CreateSmallCelestialObjectPresenter } from "../Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectPresenter.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { ServiceProvider } from "../../../shared/DependencyInjectionServices/ServiceProvider.js";
import { SmallCelestialObjectAdapter } from "../../InterfaceAdapters/Controllers/SmallCelestialObjectAdapter.js";

class SmallCelestialObjectsController {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.serviceProvider = ServiceExtractor.ObtainService(serviceDependencies, ServiceProvider);
        this.smallCelestialObjectAdapter = ServiceExtractor.ObtainService(serviceDependencies, SmallCelestialObjectAdapter);
    }

    async CreateSmallCelestialObjectAsync(command) {
        const presenter = this.serviceProvider.GetService(CreateSmallCelestialObjectPresenter);

        await this.smallCelestialObjectAdapter.CreateSmallCelestialObjectAsync(
            new CreateSmallCelestialObjectInputPort(command.planetCode, command.captureSection, command.heliocentricSection, command.physicalBodySection),
            presenter
        );

        // Returns number as there is no presentation
        return 0;
    }
}

export { SmallCelestialObjectsController };
