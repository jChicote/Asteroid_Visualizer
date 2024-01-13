import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class MercuryPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "199";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Mercury });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Mercury/mercury-albedo.jpg"
            })
        };
    }
}

export { MercuryPlanetMaterialConfiguration };
