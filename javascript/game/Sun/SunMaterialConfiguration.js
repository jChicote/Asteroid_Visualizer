import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { ShaderConfiguration } from "../Base/ShaderConfiguration.js";

class SunMaterialConfiguration {
    constructor() {
        this.key = "Sun"; // Knowing that there will be one instance of the object a simpler key is used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.shaderConfiguration = new ShaderConfiguration(
            this.key,
            "../../../Shaders/Sun/Sun.fragment.glsl",
            "../../../Shaders/Sun/Sun.vertex.glsl",
            {
                color: { value: new THREE.Color(0xff0000) }
            }
        );
    }
}

export { SunMaterialConfiguration };
