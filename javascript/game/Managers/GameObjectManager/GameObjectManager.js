import { GameManager } from "../../GameManager.js";

class GameObjectManager {
    AddGameObject(gameObject) {
        GameManager.gameObserver.Subscribe("Update", gameObject.Update.bind(gameObject));

        gameObject.Awake();
        gameObject.Start();
    }

    UpdateGameObjects() {
        GameManager.gameObserver.Dispatch("Update", {});
    }
}

export { GameObjectManager };
