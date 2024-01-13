import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class MarsPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "499";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Mars });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Mars/mars-albedo.jpg"
            })
        };
    }
}

export { MarsPlanetMaterialConfiguration };
