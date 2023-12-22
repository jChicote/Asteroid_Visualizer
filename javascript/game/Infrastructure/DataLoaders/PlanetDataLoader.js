import { PlanetsController } from "../../../assets/Framework/Controllers/PlanetsController.js";
import { HorizonsApiGateway, PlanetCodes } from "../../../assets/Framework/Infrastructure/Gateways/HorizonsApiGateway.js";
import { DataLoader } from "./DataLoader.js";

export class PlanetDataLoader extends DataLoader {
    constructor(serviceProvider) {
        super(serviceProvider);
        this.horizonsApiGateway = this.serviceProvider.GetService(HorizonsApiGateway);
        this.planetController = this.serviceProvider.GetService(PlanetsController);
    }

    async LoadAsync() {
        await this.CreatePlanetAsync(PlanetCodes.Mercury);
        // await this.CreatePlanetAsync(PlanetCodes.Venus);
        // await this.CreatePlanetAsync(PlanetCodes.Earth);
        // await this.CreatePlanetAsync(PlanetCodes.Mars);
        // await this.CreatePlanetAsync(PlanetCodes.Jupiter);
        // await this.CreatePlanetAsync(PlanetCodes.Saturn);
        // await this.CreatePlanetAsync(PlanetCodes.Uranus);
        // await this.CreatePlanetAsync(PlanetCodes.Neptune);
        // await this.CreatePlanetAsync(PlanetCodes.Pluto);

        // Get all planets to trigger dispatch of observer
        await this.planetController.GetPlanetsAsync();

        return 0;
    }

    async CreatePlanetAsync(planetCode) {
        const response = await this.horizonsApiGateway.GetPlanetEphemerisData(planetCode);

        if (response.isSuccessful) {
            await this.planetController.CreatePlanetAsync({
                planetCode,
                captureSection: response.data.captureSection,
                heliocentricSection: response.data.heliocentricSection,
                physicalBodySection: response.data.physicalBodySection
            });
        } else {
            console.warn(
                "The planet " +
                Object.keys(PlanetCodes).find((key) => PlanetCodes[key] === planetCode) +
                "'s " +
                " information was not found.", response.ErrorMessage);
        }
    }
}
