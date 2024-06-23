import * as THREE from "three";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";

class SaturnRingsMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "699 Rings";
        this.defaultColor = DefaultPlanetColor.Saturn.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Saturn });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Saturn/saturn-ring-albedo.png"
            })
        };
    }
}

export { SaturnRingsMaterialConfiguration };
