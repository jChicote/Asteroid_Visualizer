import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import marsAlbedo from "../../../textures/Planets/Mars/mars-albedo.jpg";

class MarsPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "499";
        this.defaultColor = DefaultPlanetColor.Mars.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Mars });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: marsAlbedo
            })
        };
    }
}

export { MarsPlanetMaterialConfiguration };
