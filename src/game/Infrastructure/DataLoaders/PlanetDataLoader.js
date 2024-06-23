import { PlanetsController } from "../../../assets/Framework/Controllers/PlanetsController.js";
import { HorizonsApiGateway, PlanetCodes } from "../../../assets/Framework/Infrastructure/Gateways/HorizonsApiGateway.js";
import { EventMediator } from "../../../user-interface/mediator/EventMediator.js";
import { DataLoader } from "./DataLoader.js";

export class PlanetDataLoader extends DataLoader {
    constructor(serviceProvider) {
        super(serviceProvider);
        this.horizonsApiGateway = this.serviceProvider.GetService(HorizonsApiGateway);
        this.planetController = this.serviceProvider.GetService(PlanetsController);
    }

    async LoadAsync() {
        const eventMediator = this.serviceProvider.GetService(EventMediator);

        await this.CreatePlanetAsync(PlanetCodes.Mercury);
        eventMediator.Notify("UpdateLoadingBar", 82);

        await this.CreatePlanetAsync(PlanetCodes.Venus);
        eventMediator.Notify("UpdateLoadingBar", 84);

        await this.CreatePlanetAsync(PlanetCodes.Earth);
        eventMediator.Notify("UpdateLoadingBar", 86);

        await this.CreatePlanetAsync(PlanetCodes.Mars);
        eventMediator.Notify("UpdateLoadingBar", 88);

        await this.CreatePlanetAsync(PlanetCodes.Jupiter);
        eventMediator.Notify("UpdateLoadingBar", 90);

        await this.CreatePlanetAsync(PlanetCodes.Saturn);
        eventMediator.Notify("UpdateLoadingBar", 92);

        await this.CreatePlanetAsync(PlanetCodes.Uranus);
        eventMediator.Notify("UpdateLoadingBar", 94);

        await this.CreatePlanetAsync(PlanetCodes.Neptune);
        eventMediator.Notify("UpdateLoadingBar", 96);

        await this.CreatePlanetAsync(PlanetCodes.Pluto);
        eventMediator.Notify("UpdateLoadingBar", 98);

        // Get all planets to trigger dispatch of observer
        await this.planetController.GetPlanetsAsync();
        eventMediator.Notify("UpdateLoadingBar", 99);

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
