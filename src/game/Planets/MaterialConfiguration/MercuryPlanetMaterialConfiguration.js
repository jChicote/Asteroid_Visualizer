import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import mercuryAlbedo from "../../../../public/images/Planets/Mercury/mercury-albedo.jpg";

class MercuryPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "199";
        this.defaultColor = DefaultPlanetColor.Mercury.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Mercury });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: mercuryAlbedo
            })
        };
    }
}

export { MercuryPlanetMaterialConfiguration };
