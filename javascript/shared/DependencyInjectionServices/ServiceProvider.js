import { ServiceValidator } from "./Utilities/ServiceValidator.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";

/**
 * Responsible for providing services to the application.
 */
export class ServiceProvider {
    GetService(ClassToResolve) {
        return ServiceValidator.ValidateService(
            SolarSystemVisualizer.serviceContainer
                .Resolve(ClassToResolve));
    }
}

// This is only for a test
export function sum(a, b) {
    return a + b;
}
