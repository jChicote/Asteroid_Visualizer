import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration } from "../../Base/MaterialConfiguration.js";

class MercuryPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "199";
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: DefaultPlanetColor.Mercury });
    }
}

export { MercuryPlanetMaterialConfiguration };
