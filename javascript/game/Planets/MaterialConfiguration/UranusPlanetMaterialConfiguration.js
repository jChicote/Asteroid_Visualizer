import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class UranusPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "799";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Uranus });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Uranus/uranus-albedo.jpg"
            })
        };
    }
}

export { UranusPlanetMaterialConfiguration };
