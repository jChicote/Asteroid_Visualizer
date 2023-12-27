import { AssetManager } from "../AssetManager/AssetManager.js";

class ShaderManager {
    constructor(serviceProvider) {
        // Fields
        this.shaderAssets = [];

        const assetManager = serviceProvider.GetService(AssetManager);
        this.shaderAssets = assetManager.GetResources().shaders;
    }

    GetShader(key) {
        const shader = this.shaderAssets.find(x => x.key === key);
        if (shader === null) {
            console.error(`Shader with key ${key} not found.`);
        }

        return shader;
    }
}

export { ShaderManager };
