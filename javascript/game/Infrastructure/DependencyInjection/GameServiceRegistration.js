import { AssetManager } from "../../Managers/AssetManager/AssetManager.js";
import { AsteroidObserver } from "../../Observers/AsteroidObserver.js";
import { CometObserver } from "../../Observers/CometObserver.js";
import { GameObserver } from "../../Observers/GameObserver.js";
import { MaterialConfigurationProvider } from "../Providers/MaterialConfigurationProvider.js";
import { PlanetObserver } from "../../Observers/PlanetObserver.js";
import { ServiceScopes } from "../../../shared/DependencyInjectionServices/ServiceContainer.js";

function RegisterGameServices(container) {
    // Managers
    container.RegisterService(AssetManager, {}, ServiceScopes.Singleton);

    // Providers
    container.RegisterService(MaterialConfigurationProvider);

    // Observers
    container.RegisterService(AsteroidObserver, {}, ServiceScopes.Singleton);
    container.RegisterService(CometObserver, {}, ServiceScopes.Singleton);
    container.RegisterService(PlanetObserver, {}, ServiceScopes.Singleton);
    container.RegisterService(GameObserver, {}, ServiceScopes.Singleton);
}

export { RegisterGameServices };
