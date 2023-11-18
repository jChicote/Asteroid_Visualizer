export class PlanetRepository {
    constructor() {
        this.data = new Map();
    }

    async Add(planet) {
        this.data.set(planet.planetCode, planet);
    }

    async Find(planetCode) {
        return this.data.get(planetCode);
    }

    async GetEntities() {
        return Array.from(this.data.values());
    }
}
