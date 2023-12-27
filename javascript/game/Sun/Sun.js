import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { GameObject } from "../Entities/GameObject.js";
import { VisualiserManager } from "../../../main.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";

class Sun extends GameObject {
    constructor() {
        super();

        // Fields
        this.pointLight = this.CreateLightSource();
        this.renderedObject = "";

        // Components
        this.materialRenderer = new MaterialRenderer();
        this.renderedObject = this.CreateRenderedObject(5, 0xFFFFFF, new THREE.Vector3(0, 0, 0));

        // Debug
        this.DrawDebug();
    }

    Update() {
    }

    CreateRenderedObject(radius, hexColor, position) {
        const star = "";

        this.materialRenderer.LoadMaterialFromShader(
            "../../../Shaders/Sun/Sun.fragment.glsl",
            "../../../Shaders/Sun/Sun.vertex.glsl",
            {
                color: { value: new THREE.Color(0xff0000) }
            },
            (material) => {
                const star = new THREE.Mesh(
                    new THREE.SphereGeometry(radius, 48, 16),
                    material
                );
                this.SetVector(star, position);

                VisualiserManager().scene.add(star);

                return star;
            },
            (error) => {
                console.log(error);
            }
        );

        return star;
    }

    CreateLightSource() {
        const pointLight = new THREE.PointLight(0xFFFFFF, 100000, 0);
        this.SetVector(pointLight, new THREE.Vector3(0, 0, 0));

        VisualiserManager().scene.add(pointLight);

        return pointLight;
    }

    DrawDebug() {
        // Create light helper
        const pointLightHelper = new THREE.PointLightHelper(this.pointLight, 10);
        VisualiserManager().scene.add(pointLightHelper);
    }
}

export { Sun };
