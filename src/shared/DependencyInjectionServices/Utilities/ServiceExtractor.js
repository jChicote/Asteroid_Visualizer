import { ServiceValidator } from "./ServiceValidator.js";

export class ServiceExtractor {
    /**
     * Retrieve service from injected dependencies.
     * @param {*} injectedDependencies dependencies required for the service.
     * @param {*} classType Service type to retrieve.
     * @returns Valid service
     */
    static ObtainService(injectedDependencies, classType) {
        const service = this.FindService(injectedDependencies, classType);
        ServiceValidator.ValidateService(service);
        return service;
    }

    static FindService(injectedDependencies, classType) {
        return injectedDependencies.find((dependency) => dependency.name === classType).service;
    }
}
