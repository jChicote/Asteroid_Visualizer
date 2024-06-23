import * as THREE from "three";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class AsteroidMaterialConfiguration1 extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "Asteroid_Variant1";
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xd4d4d4 });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Asteroids/asteroid_texture_1.jpg"
            })
        };
    }
}

class AsteroidMaterialConfiguration2 extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "Asteroid_Variant2";
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xd4d4d4 });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Asteroids/asteroid_texture_2.jpg"
            })
        };
    }
}

export {
    AsteroidMaterialConfiguration1,
    AsteroidMaterialConfiguration2
};
