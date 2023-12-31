import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, MaterialTextures } from "../../Base/MaterialConfiguration.js";

class EarthPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "399";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Earth });
        this.shaderConfiguration = null;
        this.textureSource = new MaterialTextures({
            albedoPath: "../../../../../images/Planets/Earth/earth-albedo.jpg", // TODO: Create custom shader for clouds.
            specularPath: "../../../../../images/Planets/Earth/earth-specular.tif"
        });
        this.textureConfiguration = {
            metalness: 0.5,
            roughness: 0.7
        };
    }
}

export { EarthPlanetMaterialConfiguration };
