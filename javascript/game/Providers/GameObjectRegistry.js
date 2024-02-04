// The purpose is to collect and provide services for all registered game objects.
// Registered objects should include persistent objects within the scene.
class GameObjectRegistry {
    constructor() {
        this.gameObjects = new Map();
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    // Object registered to the locator should be a contract of the game object.
    RegisterGameObject(objectName, gameObject) {
        if (!this.gameObjects.has(objectName)) {
            this.gameObjects.set(objectName, {
                gameObject
            });
        } else {
            console.warn(`The game object ${objectName} has already been registered.`);
        }
    }

    GetGameObject(objectName) {
        return this.gameObjects.get(objectName).gameObject;
    }
}

export { GameObjectRegistry };
