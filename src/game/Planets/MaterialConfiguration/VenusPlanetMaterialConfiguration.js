import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import venusAlbedo from "../../../../public/images/Planets/Venus/venus-albedo.jpg";

class VenusPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "299";
        this.defaultColor = DefaultPlanetColor.Venus.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Venus });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: venusAlbedo
            })
        };
    }
}

export { VenusPlanetMaterialConfiguration };
