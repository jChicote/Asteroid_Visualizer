import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class VenusPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "299";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Venus });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Venus/venus-atmosphere-albedo.jpg"
            })
        };
    }
}

export { VenusPlanetMaterialConfiguration };
