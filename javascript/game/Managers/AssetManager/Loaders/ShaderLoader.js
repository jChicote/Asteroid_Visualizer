import * as THREE from "../../../../../node_modules/three/build/three.module.js";
import { ShaderResource } from "../ShaderResource.js";

class ShaderLoader {
    async LoadMaterialShader(materialConfiguration) {
        const shaderConfiguration = materialConfiguration.shaderConfiguration;
        if (shaderConfiguration != null && shaderConfiguration.fragmentShaderUrl != null && shaderConfiguration.vertexShaderUrl != null) {
            // Provided shader URL path is relative to the AssetManager class file.
            await this.GenerateShaderAsset(
                materialConfiguration.key,
                shaderConfiguration.fragmentShaderUrl,
                shaderConfiguration.vertexShaderUrl
            ).then((shaderAsset) => {
                return shaderAsset;
            });
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
