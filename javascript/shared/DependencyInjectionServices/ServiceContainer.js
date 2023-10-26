/* eslint-disable new-cap */
export const ServiceScopes = {
    Transient: "transient",
    Singleton: "singleton"
};

/**
 * IoC container to resolve dependencies.
 */
export class ServiceContainer {
    constructor() {
        this.dependencies = new Map();
        this.instances = new Map();
    }

    /**
     * Registers a service in the container as a dependency.
     * @param {*} dependency Class to register
     * @param {*} serviceDependencies Dependencies the service requires
     * @param {*} scope The DI lifetime to apply on this service. Note: Transient by default.
     */
    RegisterService(dependency, serviceDependencies = {}, scope = ServiceScopes.Transient) {
        if (!this.dependencies.has(dependency.name)) {
            this.dependencies.set(dependency.name, {
                dependency,
                serviceDependencies,
                scope
            });
        }
    }

    /**
     * Resolves a service from the container.
     */
    Resolve(ClassToResolve) {
        if (this.dependencies.size === 0) {
            console.warn("No dependencies have been registered in the container.");
            return null;
        }

        // Create a map for instances if it has not been created
        if (!this.instances.has(ClassToResolve.name)) {
            this.instances.set(ClassToResolve.name, new Map());
        }

        // Check if the instance has already been created in the scope
        const scope = this.instances.get(ClassToResolve.name);
        if (scope.has(ClassToResolve)) {
            return scope.get(ClassToResolve);
        }

        const { dependency, serviceDependencies: dependencies, scope: dependencyScope } = this.dependencies.get(ClassToResolve.name);

        // Check if the dependency is a singleton and if it has been created
        if (dependencyScope === ServiceScopes.Singleton && this.instances.has(ServiceScopes.Singleton)) {
            if (this.instances.get(ServiceScopes.Singleton).get(ClassToResolve) !== undefined) {
                return this.instances.get(ServiceScopes.Singleton).get(ClassToResolve); // TODO: Move singleton specific checks out
            }
        }

        // Resolve constructor dependencies of the dependency being resolved
        let instance;
        if (dependencies != null) {
            const resolvedDependencies = Object.entries(dependencies).map(([name, dependency]) => {
                const service = this.Resolve(dependency);
                return {
                    name,
                    service
                };
            });

            instance = new dependency(resolvedDependencies);
        } else {
            // TODO: We need a way of resolving dependies of nested objects wthout being affected by the softwware's architecture.
            // Create the instance
            instance = new dependency();
            console.log(instance);
        }

        // Store the instance in a singleton specific scope if applicable
        if (dependencyScope === ServiceScopes.Singleton) {
            if (!this.instances.has(ServiceScopes.Singleton)) {
                // Create a map for singleton instances if it has not been created
                this.instances.set(ServiceScopes.Singleton, new Map());
            }

            // Store the instance into a singleton specific map
            this.instances.get(ServiceScopes.Singleton).set(ClassToResolve, instance);
        }

        // Store the instance into a scope specific map
        scope.set(ClassToResolve, instance);

        return instance;
    }
}
