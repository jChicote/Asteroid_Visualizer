import { ServiceProvider } from "../../shared/DepedencyInjectionServices/ServiceProvider.js";

export class PlanetsController {
    constructor(serviceDependencies) {
        this.serviceProvider = serviceDependencies.find(dependency => dependency.name == ServiceProvider.name).service;
    }
}