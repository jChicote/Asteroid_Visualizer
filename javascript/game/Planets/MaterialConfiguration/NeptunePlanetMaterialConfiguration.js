import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration } from "../../Base/MaterialConfiguration.js";

class NeptunePlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "899";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Neptune });
    }
}

export { NeptunePlanetMaterialConfiguration };
