
class ServiceContainer {
    constructor() {
        this.dependencies = {};
    }

    /**
     * Registers a service in the container as a dependency.
     * @param {*} name Name of the service.
     * @param {*} dependency Implementation of the service.
     */
    RegisterService(name, dependency) {
        this.dependencies[name] = dependency;
        ServiceContainer.inject
    }

    /**
     * Resolves a service from the container.
     * @param {*} name Name of the service to resolve.
     * @returns The instance of the dependency.
     */
    Resolve(name) {
        if (this.dependencies[name]) {
            return this.dependencies[name];
        }
        else {
            throw new Error("ServiceNotFound");
        }
    }
}