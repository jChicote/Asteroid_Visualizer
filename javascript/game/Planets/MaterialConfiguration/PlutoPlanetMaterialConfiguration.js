import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class PlutoPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "999";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Pluto });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Pluto/pluto-albedo.jpg"
            })
        };
    }
}

export { PlutoPlanetMaterialConfiguration };
