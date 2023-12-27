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

    async MaterialShaderLoader(materialConfiguration) {
        if (materialConfiguration.fragmentShaderUrl != null && materialConfiguration.vertexShaderUrl != null) {
            this.shaderAssets.push(await this.LoadShaderAsset(
                materialConfiguration.key,
                materialConfiguration.fragmentShaderUrl,
                materialConfiguration.vertexShaderUrl
            ));
        }
    }

    async LoadShaderAsset(key, fragmentUrl, vertexUrl) {
        try {
            const fragmentShaderLoader = new THREE.FileLoader(THREE.DefaultLoadingManager);
            const vertexShaderLoader = new THREE.FileLoader(THREE.DefaultLoadingManager);

            let shaderResource = {};

            fragmentShaderLoader.load(fragmentUrl, (fragmentShader) => {
                vertexShaderLoader.load(vertexUrl, (vertexShader) => {
                    shaderResource = new ShaderResource(key, fragmentShader, vertexShader);
                });
            });

            return shaderResource;
        } catch (e) {
            console.warning(e);
        }
    }

    GetResources() {
        return {
            shaders: this.shaderAssets
        };
    }
}

export { AssetManager };
