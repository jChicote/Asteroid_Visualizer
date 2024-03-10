import * as THREE from "three";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { SunMaterialConfiguration } from "./SunMaterialConfiguration.js";
import { GameManager } from "../GameManager.js";

class Sun extends GameObject {
    InitialiseFields(paramters) {
        super.InitialiseFields(paramters);

        // Fields
        this.pointLight = this.CreateLightSource();
        this.renderedObject = "";
        this.objectType = "Star";
        this.classification = "Yellow-Giant";

        // Components
        this.materialRenderer = new MaterialRenderer(new SunMaterialConfiguration());
        this.renderedObject = this.CreateRenderedObject(this.GetRadius(), 0xFFFFFF, new THREE.Vector3(0, 0, 0));

        // Debug
        // this.DrawDebug();

        this.currentTime = performance.now() / 1000;
        this.lastTime = performance.now();
        this.deltaTime = 0.01;
    }

    Update() {
        this.currentTime += this.deltaTime;
        this.materialRenderer.material.uniforms.time.value = this.currentTime;
    }

    CreateRenderedObject(radius, hexColor, position) {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 48, 16),
            this.materialRenderer.GetMaterial()
        );

        mesh.gameObject = this;
        this.SetVector(mesh, position);
        GameManager.scene.add(mesh);

        return mesh;
    }

    GetRadius() {
        return 5;
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
