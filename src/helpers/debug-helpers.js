import * as THREE from "three";

export function CreateBoxHelper(targetObject, color, scene) {
    scene.add(new THREE.BoxHelper(targetObject, color));
}

export function CreatePolarGridHelper(radius, sectors, rings, divisions, scene) {
    scene.add(new THREE.PolarGridHelper(radius, sectors, rings, divisions));
}
