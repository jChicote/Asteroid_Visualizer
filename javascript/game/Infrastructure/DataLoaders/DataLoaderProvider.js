import { PlanetDataLoader } from "./PlanetDataLoader.js";

export class DataLoaderProvider {
    constructor(serviceProvider) {
        this.serviceProvider = serviceProvider;
    }

    async CreateDataLoader(name) {
        if (name === "Planets") {
            return new PlanetDataLoader(this.serviceProvider);
        }

        console.log("No loader matches the name: " + name);
    }
}
