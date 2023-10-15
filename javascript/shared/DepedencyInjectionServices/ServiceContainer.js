import { RegisterServiceDependencies } from '../../assets/infrastructure/DependencyInjection/BackEndServiceRegistration.js';

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
     */
    RegisterService(dependency, scope = 'transient') {
        if (!this.dependencies.has(dependency.name)) {
            this.dependencies.set(dependency.name, {
                dependency,
                scope
            });
        }
    }

    /**
     * Resolves a service from the container.
     */
    Resolve(ClassToResolve, customDependencies = {}) {
        if (this.dependencies.size == 0) {
            console.warn('No dependencies have been registered in the container.');
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

        const { dependency, scope: dependencyScope } = this.dependencies.get(ClassToResolve.name);

        // Check if the dependency is a singleton and if it has been created
        if (dependencyScope === 'singleton' && this.instances.has('singleton')) {
            return this.instances.get('singleton').get(ClassToResolve); // TODO: Move singleton specific checks out
        }

        // TODO: We need a way of resolving dependies of nested objects wthout being affected by the softwware's architecture.
        // Create the instance
        const instance = new dependency();
        console.log(instance);

        // Resolve constructor dependencies of the dependency being resolved
        const resolvedDependencies = Object.entries(customDependencies).map(([key, dependency]) => {
            return this.Resolve(dependency);
        });

        // Store the instance in a singleton specific scope if applicable
        if (dependencyScope == 'singleton') {
            if (!this.instances.has('singleton')) {
                this.instances.set('singleton', new Map());
            }

            this.instances.get('singleton').set(ClassToResolve, instance);
        }

        // Store the instance into a scope specific map
        scope.set(ClassToResolve, instance);
        
        return instance;
    }
}

// export const serviceContainer = createContainer();

export function RegisterAllServices() {
    RegisterServiceDependencies(serviceContainer);
}