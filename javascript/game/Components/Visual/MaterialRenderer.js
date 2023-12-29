import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { VisualiserManager } from "../../../../main.js";
import { ObjectValidator } from "../../../utils/ObjectValidator.js";

export class MaterialRenderer {
    constructor(materialConfiguration) {
        this.material = this.LoadMaterial(materialConfiguration);
    }

    LoadMaterial(materialConfiguration) {
        if (materialConfiguration.shaderConfiguration != null &&
            materialConfiguration.shaderConfiguration.fragmentShaderUrl != null &&
            materialConfiguration.shaderConfiguration.vertexShaderUrl != null) {
            const shaders = VisualiserManager().shaderManager.GetShader(materialConfiguration.shaderConfiguration.key);

            if (ObjectValidator.IsValid(shaders)) {
                const shaderMaterial = new THREE.ShaderMaterial({
                    uniforms: materialConfiguration.shaderConfiguration.uniforms,
                    vertexShader: shaders.vertexShader,
                    fragmentShader: shaders.fragmentShader
                });

                return shaderMaterial;
            }
        }

        return materialConfiguration.defaultMaterial;
    }

    GetMaterial() {
        return this.material;
    }
}
