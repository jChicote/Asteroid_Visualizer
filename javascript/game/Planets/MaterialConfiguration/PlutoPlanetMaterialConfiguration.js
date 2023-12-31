import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { MaterialConfiguration } from "../../Base/MaterialConfiguration.js";

class PlutoPlanetMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        this.key = "999";
        this.defaultMaterial = new THREE.MeshStandardMaterial({ color: DefaultPlanetColor.Pluto });
    }
}

export { PlutoPlanetMaterialConfiguration };
