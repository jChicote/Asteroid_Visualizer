class SmallCelestialObjectRepository {
    constructor() {
        this.data = new Map();
    }

    async Add(smallCelestialObject) {
        this.data.set(smallCelestialObject.id, smallCelestialObject);
    }

    async Find(id) {
        return this.data.get(id);
    }

    async GetEntities() {
        return Array.from(this.data.values());
    }
}

export { SmallCelestialObjectRepository };
