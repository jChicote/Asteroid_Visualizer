import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { Transform } from "../Components/Transformation/Transform.js";

class GameObject extends Transform {
    Start() { }

    Update() { }
}

class DefaultMaterialConfiguration {
    constructor() {
        this.key = "Default"; // Knowing that there will be one instance of the object a simpler key is used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xF300FF });
        this.shaderConfiguration = null;
    }
}

export { GameObject, DefaultMaterialConfiguration };
