import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import jupiterAlbedo from "../../../../public/images/Planets/Jupiter/jupiter-albedo.jpg";

class JupiterPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "599";
        this.defaultColor = DefaultPlanetColor.Jupiter.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Jupiter });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: jupiterAlbedo
            })
        };
    }
}

export { JupiterPlanetMaterialConfiguration };
