import { SetVector } from './math-library.js';
import * as THREE from '/node_modules/three/build/three.module.js';

export class StarCreator {

    constructor(scene) {
        this.scene = scene;
    }

    CreateStarLightSource(position) {
        var pointLight = new THREE.PointLight( 0xFFFFFF, 10000, 100 );
        SetVector(pointLight, position);
        this.scene.add( pointLight );

        return pointLight;
    }

    CreateStar(radius, hexColor, position) {
        var star = new THREE.Mesh(
            new THREE.SphereGeometry( radius, 48, 16 ),
            new THREE.MeshBasicMaterial( hexColor ) );
        SetVector(star, position);
        this.scene.add( star );

        // Create star light
        var lightSource = this.CreateStarLightSource(position);

        // Create light helper
        var pointLightHelper = new THREE.PointLightHelper( lightSource, radius * 2 );
        this.scene.add( pointLightHelper );

        return star;
    }
}
