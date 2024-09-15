import { AsteroidsDataLoader } from "./AsteroidsDataLoader.js";
import { CometsDataLoader } from "./CometsDataLoader.js";
import { PlanetDataLoader } from "./PlanetDataLoader.js";

export class DataLoaderProvider {
    constructor(serviceProvider) {
        this.serviceProvider = serviceProvider;
    }

    async CreateDataLoader(name) {
        if (name === "Planets") {
            return new PlanetDataLoader(this.serviceProvider);
        } else if (name === "Asteroids") {
            return new AsteroidsDataLoader(this.serviceProvider);
        } else if (name === "Comets") {
            return new CometsDataLoader(this.serviceProvider);
        }

        console.log("No loader matches the name: " + name);
    }
}
