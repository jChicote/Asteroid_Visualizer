import * as THREE from "three";
import { MaterialConfiguration } from "../../Base/MaterialConfiguration.js";

class CometMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "GeneralComet"; // Until there is variations, a general material will be used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5f5 });
        this.shaderConfiguration = null;
    }
}

export { CometMaterialConfiguration };
