import { GameObject } from "../Entities/GameObject.js";
import * as THREE from "three";
import { GameManager } from "../GameManager.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";

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
        this.materialRenderer = new MaterialRenderer(this.materialConfiguration);
    }

    Start() {
        this.RenderPlanetRings();
        GameManager.scene.add(this.ring);

        this.ring.position.copy(this.renderedPlanet.position);
    }

    Update() {
        this.ring.position.copy(this.renderedPlanet.position);
    }

    RenderPlanetRings() {
        // Generate geometry
        const segments = 96;
        const innerRadius = 1.5 * 5;
        const outerRadius = 2.5 * 5;

        const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, segments);

        // Re-calculate UVs for ring texture
        const pos = ringGeometry.attributes.position;
        const uvs = [];

        for (let i = 0; i < pos.count; i++) {
            const vect3 = new THREE.Vector3();
            vect3.fromBufferAttribute(pos, i);

            // Calculate the angle around the Z-axis for the U coordinate
            const u = Math.atan2(vect3.y, vect3.x) / (2 * Math.PI) + 0.5;

            // Normalize the distance from the center for the V coordinate
            const v = (vect3.length() - innerRadius) / (outerRadius - innerRadius);

            uvs.push(u, v);
        }

        // Update the geometry with the new UVs
        ringGeometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));

        const ringMaterial = this.materialRenderer.GetMaterial();
        ringMaterial.side = THREE.DoubleSide;

        this.ring = new THREE.Mesh(ringGeometry, ringMaterial);
        this.ring.rotation.x = 90 * (Math.PI / 180); // Rotate ring by 90 degrees

        this.renderedPlanet.add(this.ring);
    }
}

export { PlanetRings };
