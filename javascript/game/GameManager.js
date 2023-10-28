import { DataLoaderProvider } from "./Infrastructure/DataLoaders/DataLoaderProvider.js";

export class GameManager {
    constructor(serviceProvider) {
        this.dataLoaderProvider = new DataLoaderProvider(serviceProvider);
    }

    async Initialise() {
        // Initialise data
        const planetDataLoader = await this.dataLoaderProvider.CreateDataLoader("Planets");
        await planetDataLoader.LoadAsync();
    }

    Awake() {
    }
}
