import { AsteroidObserver } from "../../shared/Observers/AsteroidObserver.js";
import { Asteroid } from "../Entities/Asteroid.js";

class AsteroidManager {
    constructor(serviceProvider) {
        this.asteroids = [];

        this.asteroidObserver = serviceProvider.GetService(AsteroidObserver);
        this.asteroidObserver.Subscribe("GetAsteroids", this.CreateAsteroids.bind(this));
    }

    CreateAsteroids(asteroids) {
        this.asteroids.push(new Asteroid(asteroids.at(0)));

        // for (const asteroid of asteroids) {
        //     this.asteroids.push(new Asteroid(asteroid));
        // }

        return this.asteroids;
    }

    UpdateAsteroids() {
        for (const asteroid of this.asteroids) {
            asteroid.Update();
        }
    }
}

export { AsteroidManager };
