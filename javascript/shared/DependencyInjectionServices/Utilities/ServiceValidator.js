export class ServiceValidator {
    static ValidateService(service) {
        if (!service) {
            throw new Error(`Service ${dependency.name} is not registered.`);
        }

        return service;
    }
}
