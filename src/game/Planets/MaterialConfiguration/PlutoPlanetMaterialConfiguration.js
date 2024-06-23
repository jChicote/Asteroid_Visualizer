import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";

class PlutoPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "999";
        this.defaultColor = DefaultPlanetColor.Pluto.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Pluto });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: "../../../../../images/Planets/Pluto/pluto-albedo.jpg"
            })
        };
    }
}

export { PlutoPlanetMaterialConfiguration };