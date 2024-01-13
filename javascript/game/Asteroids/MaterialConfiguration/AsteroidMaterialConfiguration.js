import * as THREE from "three";
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
