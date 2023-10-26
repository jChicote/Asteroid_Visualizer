export class PlanetRepository {
    constructor() {
        this.data = new Map();
    }

    AddPlanet(planet) {
        this.data.set(planet.planetCode, planet);
    }

    Find(planetCode) {
        return this.data.get(planetCode);
    }
}
