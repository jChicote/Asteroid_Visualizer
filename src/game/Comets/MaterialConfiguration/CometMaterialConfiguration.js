import * as THREE from "three";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class CometMaterialConfiguration1 extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "Comet_Variant1"; // Until there is variations, a general material will be used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5f5 });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Asteroids/asteroid_texture_1.jpg"
            })
        };
    }
}

class CometMaterialConfiguration2 extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "Comet_Variant2"; // Until there is variations, a general material will be used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5f5 });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Asteroids/asteroid_texture_2.jpg"
            })
        };
    }
}

export {
    CometMaterialConfiguration1,
    CometMaterialConfiguration2
};
