import * as THREE from "three";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration, TextureMaps } from "../../Base/MaterialConfiguration.js";
import plutoAlbedo from "../../../textures/Planets/Pluto/pluto-albedo.jpg";

class PlutoPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "999";
        this.defaultColor = DefaultPlanetColor.Pluto.hexCode;
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Pluto });
        this.textureConfiguration = {
            textureMaps: new TextureMaps({
                albedoPath: plutoAlbedo
            })
        };
    }
}

export { PlutoPlanetMaterialConfiguration };
