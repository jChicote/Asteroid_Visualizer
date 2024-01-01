import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { SunMaterialConfiguration } from "./SunMaterialConfiguration.js";
import { GameManager } from "../GameManager.js";

class Sun extends GameObject {
    constructor() {
        super();

        // Fields
        this.pointLight = this.CreateLightSource();
        this.renderedObject = "";

        // Components
        this.materialRenderer = new MaterialRenderer(new SunMaterialConfiguration());
        this.renderedObject = this.CreateRenderedObject(5, 0xFFFFFF, new THREE.Vector3(0, 0, 0));

        // Debug
        this.DrawDebug();

        this.currentTime = performance.now() / 1000;
        this.lastTime = performance.now();
        this.deltaTime = 0.01;
    }

    Update() {
        // const elapsedTime = performance.now() / 1000; // TODO: Each component should subscribe to a an Update and Start event. Coupling components to the GameObject is not ideal.
        this.currentTime += this.deltaTime;
        this.materialRenderer.material.uniforms.time.value = this.currentTime;
    }

    CreateRenderedObject(radius, hexColor, position) {
        const star = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 48, 16),
            this.materialRenderer.GetMaterial()
        );
        this.SetVector(star, position);

        GameManager.scene.add(star);

        return star;
    }

    CreateLightSource() {
        const pointLight = new THREE.PointLight(0xFFFFFF, 50000, 0);
        this.SetVector(pointLight, new THREE.Vector3(0, 0, 0));

        GameManager.scene.add(pointLight);

        return pointLight;
    }

    DrawDebug() {
        // Create light helper
        const pointLightHelper = new THREE.PointLightHelper(this.pointLight, 10);
        GameManager.scene.add(pointLightHelper);
    }
}

export { Sun };
