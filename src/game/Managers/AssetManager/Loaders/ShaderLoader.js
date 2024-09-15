import * as THREE from "three";
import { ObjectValidator } from "../../../../utils/ObjectValidator.js";
import { ShaderResource } from "../ShaderResource.js";

class ShaderLoader {
    async LoadMaterialShader(materialConfiguration) {
        const shaderConfiguration = materialConfiguration.shaderConfiguration;
        if (ObjectValidator.IsValid(shaderConfiguration) &&
            ObjectValidator.IsValid(shaderConfiguration.fragmentShaderUrl) &&
            ObjectValidator.IsValid(shaderConfiguration.vertexShaderUrl)) {
            // Provided shader URL path is relative to the AssetManager class file.
            return await this.GenerateShaderAsset(
                materialConfiguration.key,
                shaderConfiguration.fragmentShaderUrl,
                shaderConfiguration.vertexShaderUrl
            );
        }
    }

    async GenerateShaderAsset(key, fragmentUrl, vertexUrl) {
        try {
            const fragmentShader = await this.LoadShaderFile(fragmentUrl);
            const vertexShader = await this.LoadShaderFile(vertexUrl);
            const shaderResource = new ShaderResource(key, fragmentShader, vertexShader);

            return shaderResource;
        } catch (e) {
            console.error(e);
        }
    }

    async LoadShaderFile(url) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.FileLoader();
            loader.load(url, data => resolve(data), null, error => reject(error));
        });
    }
}

export { ShaderLoader };
