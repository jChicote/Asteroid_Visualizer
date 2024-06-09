import { GameObject } from "../Entities/GameObject.js";
import * as THREE from "three";
import { GameManager } from "../GameManager.js";

class PlanetRings extends GameObject {
    constructor(objectCode, renderedPlanet, materialConfigurationProvider) {
        super({ objectCode, renderedPlanet, materialConfigurationProvider });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.materialConfiguration = parameters.materialConfigurationProvider.GetMaterialConfiguration(parameters.objectCode);
        this.renderedPlanet = parameters.renderedPlanet;

        // Components
        this.materialRenderer = {};
    }

    Start() {
        const ringGeometry = new THREE.RingGeometry(
            1.5 * 5,
            2.5 * 5,
            42);
        const ringMaterial = new THREE.MeshStandardMaterial(
            { color: 0x473e2e, side: THREE.DoubleSide });

        this.ring = new THREE.Mesh(ringGeometry, ringMaterial);
        this.ring.rotation.x = 90 * (Math.PI / 180); // Rotate ring by 90 degrees

        this.renderedPlanet.add(this.ring);
        GameManager.scene.add(this.ring);

        this.ring.position.copy(this.renderedPlanet.position);
    }

    Update() {
        this.ring.position.copy(this.renderedPlanet.position);
    }
}

export { PlanetRings };
