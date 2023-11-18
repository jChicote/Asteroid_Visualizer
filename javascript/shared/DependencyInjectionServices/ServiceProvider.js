import { Container } from "../../../main.js";
import { ServiceValidator } from "./Utilities/ServiceValidator.js";

/**
 * Responsible for providing services to the application.
 */
export class ServiceProvider {
    constructor() {
        this.container = Container();
    }

    GetService(ClassToResolve) {
        return ServiceValidator.ValidateService(this.container.Resolve(ClassToResolve));
    }
}

// This is only for a test
export function sum(a, b) {
    return a + b;
}
