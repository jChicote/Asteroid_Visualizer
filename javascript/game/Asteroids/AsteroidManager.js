import { VisualiserManager } from "../../../main.js";
import { MaterialConfigurationProvider } from "../Infrastructure/Providers/MaterialConfigurationProvider.js";
import { AsteroidObserver } from "../Observers/AsteroidObserver.js";
import { Asteroid } from "./Asteroid.js";

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

    UpdateAsteroids() {
        if (!VisualiserManager().gameState.isPaused) {
            for (const asteroid of this.asteroids) {
                asteroid.Update();
            }
        }
    }
}

export { AsteroidManager };
