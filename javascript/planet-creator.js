import * as THREE from "../node_modules/three/build/three.module.js";
import { SetVector } from "./utils/math-library.js";

export class PlanetCreator {
    constructor(scene) {
        this.scene = scene;
    }

    CreatePlanet(radius, hexColor, position) {
        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 32, 16),
            new THREE.MeshBasicMaterial({ color: hexColor }));
        SetVector(planet, position);
        this.scene.add(planet);

        return planet;
    }
}
