import { GameManager } from "../../GameManager.js";
import { SolarSystemVisualizer } from "../../../../main.js";

class GameObjectManager {
    AddGameObject(gameObject) {
        GameManager.gameObserver.Subscribe("Update", gameObject.Update.bind(gameObject));

        gameObject.Awake();
        gameObject.Start();
    }

    UpdateGameObjects() {
        if (!SolarSystemVisualizer.gameManager.gameState.canUpdate) {
            return;
        }

        GameManager.gameObserver.Dispatch("Update", {});
    }
}

export { GameObjectManager };
