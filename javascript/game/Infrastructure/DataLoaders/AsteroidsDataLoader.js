import { CreateSmallCelestialObjectCommand } from "../../../assets/Framework/Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectCommand.js";
import { DataLoader } from "./DataLoader.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { SmallBodyApiGateway } from "../../../assets/Framework/Infrastructure/Gateways/SmallBody/SmallBodyApiGateway.js";
import { SmallCelestialObjectsController } from "../../../assets/Framework/Controllers/SmallCelestialObjectsController.js";

class AsteroidsDataLoader extends DataLoader {
    constructor(serviceProvider) {
        super(serviceProvider);
        this.mapper = this.serviceProvider.GetService(ObjectMapper);
        this.sbdbApiGateway = this.serviceProvider.GetService(SmallBodyApiGateway);
        this.smallCelestialObjectsController = this.serviceProvider.GetService(SmallCelestialObjectsController);
    }

    async LoadAsync() {
        await this.CreateAsteroidsAsync();
    }

    async CreateAsteroidsAsync() {
        const response = await this.sbdbApiGateway.GetAsteroidsAsync();

        if (response.isSuccessful) {
            for (const asteroid of response.data) {
                await this.smallCelestialObjectsController.CreateSmallCelestialObjectAsync(
                    this.mapper.Map(asteroid, CreateSmallCelestialObjectCommand));
            }
        } else {
            console.warn("The request invoking the SBDB Api was unsuccessful.", response.ErrorMessage);
        }
    }
}

export { AsteroidsDataLoader };
