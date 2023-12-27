import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { ShaderResource } from "./ShaderResource.js";
import { VisualiserConfiguration } from "../../../../main.js";

class AssetManager {
    constructor() {
        this.gameConfiguration = VisualiserConfiguration();

        // Resources
        this.shaderAssets = [];
    }

    async PreLoadAssets() {
        const materialConfigurations = this.gameConfiguration.materialConfigurations;
        for (const configuration of materialConfigurations) {
            await this.MaterialShaderLoader(configuration);
        }
    }

    // TODO: Refactor this to a specific loader for material shaders.
    async MaterialShaderLoader(materialConfiguration) {
        const shaderConfiguration = materialConfiguration.shaderConfiguration;
        if (shaderConfiguration != null && shaderConfiguration.fragmentShaderUrl != null && shaderConfiguration.vertexShaderUrl != null) {
            // Provided shader URL path is relative to the AssetManager class file.
            await this.LoadShaderAsset(
                materialConfiguration.key,
                shaderConfiguration.fragmentShaderUrl,
                shaderConfiguration.vertexShaderUrl
            ).then((shaderAsset) => {
                this.shaderAssets.push(shaderAsset);
            });
        }
    }

    async LoadShaderAsset(key, fragmentUrl, vertexUrl) {
        try {
            const fragmentShader = await this.LoadShader(fragmentUrl);
            const vertexShader = await this.LoadShader(vertexUrl);
            const shaderResource = new ShaderResource(key, fragmentShader, vertexShader);

            return shaderResource;
        } catch (e) {
            console.error(e);
        }
    }

    async LoadShader(url) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.FileLoader();
            loader.load(url, data => resolve(data), null, error => reject(error));
        });
    }

    GetResources() {
        return {
            shaders: this.shaderAssets
        };
    }
}

export { AssetManager };
