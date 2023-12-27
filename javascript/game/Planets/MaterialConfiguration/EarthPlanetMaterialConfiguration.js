import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration } from "../../Base/MaterialConfiguration.js";

class EarthPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "399";
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: DefaultPlanetColor.Earth });
        this.shaderConfiguration = null;
    }
}

export { EarthPlanetMaterialConfiguration };
