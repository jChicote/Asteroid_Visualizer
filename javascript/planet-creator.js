import { SetVector } from './utils/math-library.js';
import * as THREE from '/node_modules/three/build/three.module.js';

export class PlanetCreator {

    constructor(scene) {
        this.scene = scene;
    }

    CreatePlanet(radius, hexColor, position) {
        var planet = new THREE.Mesh(
             new THREE.SphereGeometry( radius, 32, 16 ),
             new THREE.MeshStandardMaterial( { color: hexColor  } ) );
        SetVector(planet, position);
        this.scene.add( planet );

        return planet
    }

}