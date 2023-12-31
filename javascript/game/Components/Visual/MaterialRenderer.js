import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { VisualiserManager } from "../../../../main.js";
import { ObjectValidator } from "../../../utils/ObjectValidator.js";

export class MaterialRenderer {
    constructor(materialConfiguration) {
        this.material = this.LoadMaterial(materialConfiguration);
    }

    LoadMaterial(materialConfiguration) {
        if (ObjectValidator.IsValid(materialConfiguration.shaderConfiguration) &&
            ObjectValidator.IsValid(materialConfiguration.shaderConfiguration.fragmentShaderUrl) &&
            ObjectValidator.IsValid(materialConfiguration.shaderConfiguration.vertexShaderUrl)) {
            return this.GetShaderMaterial(materialConfiguration);
        }

        // Get standard material from textures.
        if (ObjectValidator.IsValid(materialConfiguration.textureSource)) {
            return this.GetStandardMaterial(materialConfiguration);
        }

        return materialConfiguration.defaultMaterial;
    }

    GetShaderMaterial(materialConfiguration) {
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

    GetStandardMaterial(materialConfiguration) {
        const textureAsset = VisualiserManager().textureManager.GetTextureAsset(materialConfiguration.key);

        if (ObjectValidator.IsValid(textureAsset)) {
            const standardMaterial = new THREE.MeshStandardMaterial({
                map: ObjectValidator.IsValid(textureAsset.albedo) ? textureAsset.albedo : null,
                normalMap: ObjectValidator.IsValid(textureAsset.normal) ? textureAsset.normal : null,
                metalnessMap: ObjectValidator.IsValid(textureAsset.specular) ? textureAsset.specular : null,
                metalness: materialConfiguration.textureConfiguration.metalness,
                roughness: materialConfiguration.textureConfiguration.roughness
            });
            return standardMaterial;
        }
    }

    GetMaterial() {
        return this.material;
    }
}
