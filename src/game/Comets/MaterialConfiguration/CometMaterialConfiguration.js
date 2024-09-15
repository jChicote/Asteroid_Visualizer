import * as THREE from "three";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import comet1Albedo from "../../../textures/Asteroids/asteroid_texture_1.jpg";
import comet2Albedo from "../../../textures/Asteroids/asteroid_texture_2.jpg";

class CometMaterialConfiguration1 extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "Comet_Variant1"; // Until there is variations, a general material will be used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xf5f5f5 });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: comet1Albedo
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
                albedoPath: comet2Albedo
            })
        };
    }
}

export {
    CometMaterialConfiguration1,
    CometMaterialConfiguration2
};
