import { Asteroid } from "./Asteroid.js";
import { AsteroidObserver } from "../Observers/AsteroidObserver.js";
import { MaterialConfigurationProvider } from "../Infrastructure/Providers/MaterialConfigurationProvider.js";

class AsteroidManager {
    constructor(serviceProvider) {
        // Fields
        this.asteroids = [];
        this.serviceProvider = serviceProvider;
        this.asteroidObserver = serviceProvider.GetService(AsteroidObserver);

        this.asteroidObserver.Subscribe("GetAsteroids", this.CreateAsteroids.bind(this));
    }

    CreateAsteroids(asteroids) {
        const materialConfigurationProvider = this.serviceProvider.GetService(MaterialConfigurationProvider);

        for (const asteroid of asteroids) {
            this.asteroids.push(new Asteroid(asteroid, materialConfigurationProvider));
        }

        return this.asteroids;
    }
}

export { AsteroidManager };
