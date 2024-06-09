import * as THREE from "three";
import { ShaderConfiguration } from "../Base/ShaderConfiguration.js";

class SunMaterialConfiguration {
    constructor() {
        this.key = "Sun"; // Knowing that there will be one instance of the object a simpler key is used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.shaderConfiguration = new ShaderConfiguration(
            this.key,
            "../../../../Shaders/Sun/Sun.fragment.glsl",
            "../../../../Shaders/Sun/Sun.vertex.glsl",
            {
                color: { value: new THREE.Color(0xff0000) },
                fresnelBias: { value: 0.1 },
                fresnelPower: { value: 2.0 },
                fresnelScale: { value: 1.0 },
                gridSize: { value: 12.0 },
                lacunarity: { value: 2.0 },
                octaves: { value: 6 },
                persistence: { value: 0.8 },
                time: { value: 0.0 },
                isDetailed: { value: true }
            }
        );
    }
}

export { SunMaterialConfiguration };
