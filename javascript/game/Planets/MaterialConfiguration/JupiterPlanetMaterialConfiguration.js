import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class JupiterPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "599";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Jupiter });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Jupiter/jupiter-albedo.jpg"
            })
        };
    }
}

export { JupiterPlanetMaterialConfiguration };
