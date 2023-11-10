import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";

export class MaterialRenderer {
    constructor(planetCode) {
        this.material = new THREE.MeshBasicMaterial({ color: DefaultPlanetColor.GetColorByIdentifier(planetCode) });
    }

    GetMaterial() {
        return this.material;
    }
}
