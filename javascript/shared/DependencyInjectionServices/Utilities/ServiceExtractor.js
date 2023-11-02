import { ServiceValidator } from "./ServiceValidator.js";

export class ServiceExtractor {
    static ExtractService(injectedDependencies, classType) {
        const service = this.FindService(injectedDependencies, classType);
        ServiceValidator.ValidateService(service);
        return service;
    }

    static FindService(injectedDependencies, classType) {
        return injectedDependencies.find((dependency) => dependency.name === classType.name).service;
    }
}
