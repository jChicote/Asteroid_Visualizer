import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { MaterialConfiguration } from "../../Base/MaterialConfiguration.js";

class AsteroidMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "GeneralAsteroid"; // Until there is variations, a general material will be used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xd4d4d4 });
        this.shaderConfiguration = null;
    }
}

export { AsteroidMaterialConfiguration };
