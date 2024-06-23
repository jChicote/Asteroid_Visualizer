import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import earthAlbedo from "../../../textures/Planets/Earth/earth-albedo.jpg";

class EarthPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "399";
        this.defaultColor = DefaultPlanetColor.Earth.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Earth });
        this.shaderConfiguration = null;
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: earthAlbedo
            }),
            metalness: 0.5,
            roughness: 0.7
        };
    }
}

export { EarthPlanetMaterialConfiguration };
