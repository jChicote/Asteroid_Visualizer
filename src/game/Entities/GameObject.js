import * as THREE from "three";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { Transform } from "../Components/Transformation/Transform.js";

class GameObject extends Transform {
    // Subclassed objects should initialise through the 'InitialiseFields' method.
    constructor(parameters) {
        super();

        this.InitialiseFields(parameters);

        // Subscribe Update event and sequentially invoke initialisation methods.
        const gameObjectManager = SolarSystemVisualizer.gameManager.gameObjectManager;
        gameObjectManager.AddGameObject(this);
    }

    InitialiseFields(parameters) {
        this.enabled = false;
        this.identifier = Math.floor(Math.random() * 1000);
    }

    Awake() {
        this.enabled = true;
    }

    Start() { /* Empty awake intended to be overriden */ }

    Update() { /* Empty awake intended to be overriden */ }
}

class DefaultMaterialConfiguration {
    constructor() {
        this.key = "Default"; // Knowing that there will be one instance of the object a simpler key is used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xF300FF });
        this.shaderConfiguration = null;
    }
}

export { GameObject, DefaultMaterialConfiguration };
