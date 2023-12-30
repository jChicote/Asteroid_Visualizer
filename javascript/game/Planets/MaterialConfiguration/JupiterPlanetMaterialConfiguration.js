import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration } from "../../Base/MaterialConfiguration.js";

class JupiterPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "599";
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: DefaultPlanetColor.Jupiter });
    }
}

export { JupiterPlanetMaterialConfiguration };
