
/**
 * Responsible for providing services to the application.
 */
export class ServiceProvider {
    constructor(container) {
        if (this.container == null) {
            throw new Error("container cannot be null");
        }

        this.container = container;
    }

    GetService(ClassToResolve) {
        
    }
}