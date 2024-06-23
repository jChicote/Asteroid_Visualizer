import { PlanetCodes } from "../../Infrastructure/Gateways/HorizonsApiGateway.js";
import { ErrorResult, SuccessfulResult } from "../Common/PresentationResult.js";
import { CreatePlanetViewModel } from "./CreatePlanetViewModel.js";
import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";

export class CreatePlanetPresenter {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.result = {};
    }

    async PresentsPlanetDataAsync(planetData) {
        console.log("Planet has been created.");
        this.result = new SuccessfulResult(this.mapper.Map(planetData, CreatePlanetViewModel));
    }

    async PresentPlanetDataNotFoundAsync(planetCode, dataPointName) {
        const planetName = Object.values(PlanetCodes).find(code => code === planetCode);
        this.result = new ErrorResult("The planet " +
            planetName +
            "'s " +
            dataPointName +
            " information was not found.");
    }

    async PresentsRequestFailureAsync(errorMessage) {
        this.result = new ErrorResult(errorMessage);
    }
}
