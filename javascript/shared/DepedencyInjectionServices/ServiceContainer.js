import { RegisterServiceDependencies } from '../../assets/infrastructure/DependencyInjection/BackEndServiceRegistration.js';
import { createContainer } from '/node_modules/awilix/lib/awilix.module.mjs'; ///node_modules/awilix/lib/awilix.js';
// const { createContainer } = require('../../../node_modules/awilix');

// /**
//  * IoC container to resolve dependencies.
//  */
// class ServiceContainer {
//     constructor() {
//         this.dependencies = {};
//     }

//     /**
//      * Registers a service in the container as a dependency.
//      * @param {*} name Name of the service.
//      * @param {*} dependency Implementation of the service.
//      */
//     RegisterService(name, dependency) {
//         this.dependencies[name] = dependency;
//         ServiceContainer.inject
//     }

//     /**
//      * Resolves a service from the container.
//      * @param {*} name Name of the service to resolve.
//      * @returns The instance of the dependency.
//      */
//     Resolve(name) {
//         if (this.dependencies[name]) {
//             return this.dependencies[name];
//         }
//         else {
//             throw new Error("ServiceNotFound");
//         }
//     }

//     /**
//      * Resolves a service from the container.
//      * @param {*} classType The class type of the service to resolve
//      * @returns The instance of the dependency.
//      */
//     Resolve(classType) {
//         try {

//         }
//         catch(error) {
//             throw new Error(error);
//         }
//     }
// }

const serviceContainer = createContainer();

export function RegisterAllServices() {
    RegisterServiceDependencies(serviceContainer);
}