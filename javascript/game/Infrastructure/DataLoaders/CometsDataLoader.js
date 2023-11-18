import { CreateSmallCelestialObjectCommand } from "../../../assets/Framework/Presentation/CreateSmallCelestialObject/CreateSmallCelestialObjectCommand.js";
import { DataLoader } from "./DataLoader.js";
import { ObjectMapper } from "../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { SmallBodyApiGateway } from "../../../assets/Framework/Infrastructure/Gateways/SmallBody/SmallBodyApiGateway.js";
import { SmallCelestialObjectsController } from "../../../assets/Framework/Controllers/SmallCelestialObjectsController.js";

class CometsDataLoader extends DataLoader {
    constructor(serviceProvider) {
        super(serviceProvider);
        this.mapper = this.serviceProvider.GetService(ObjectMapper);
        this.sbdbApiGateway = this.serviceProvider.GetService(SmallBodyApiGateway);
        this.smallCelestialObjectsController = this.serviceProvider.GetService(SmallCelestialObjectsController);
    }

    async LoadAsync() {
        await this.CreateCometsAsync();

        return 0;
    }

    async CreateCometsAsync() {
        const response = await this.sbdbApiGateway.GetCometsAsync();

        if (response.isSuccessful) {
            for (const comet of response.data) {
                await this.smallCelestialObjectsController.CreateSmallCelestialObjectAsync(
                    this.mapper.Map(comet, CreateSmallCelestialObjectCommand));
            }
        } else {
            console.warn("The request invoking the SBDB Api was unsuccessful.", response.ErrorMessage);
        }
    }
}

export { CometsDataLoader };
