import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class EarthPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "399";
        this.defaultColor = DefaultPlanetColor.Earth.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Earth });
        this.shaderConfiguration = null;
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Earth/earth-albedo.jpg",
                specularPath: "../../../../../images/Planets/Earth/earth-specular.tif"
            }),
            metalness: 0.5,
            roughness: 0.7
        };
    }
}

export { EarthPlanetMaterialConfiguration };
