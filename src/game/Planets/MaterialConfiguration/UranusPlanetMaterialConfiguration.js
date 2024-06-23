import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import uranusAlbedo from "../../../../public/images/Planets/Uranus/uranus-albedo.jpg";

class UranusPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "799";
        this.defaultColor = DefaultPlanetColor.Uranus.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Uranus });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: uranusAlbedo
            })
        };
    }
}

export { UranusPlanetMaterialConfiguration };
