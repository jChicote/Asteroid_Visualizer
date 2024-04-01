import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class NeptunePlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "899";
        this.defaultColor = DefaultPlanetColor.Neptune.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Neptune });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Neptune/neptune-albedo.jpg"
            })
        };
    }
}

export { NeptunePlanetMaterialConfiguration };
