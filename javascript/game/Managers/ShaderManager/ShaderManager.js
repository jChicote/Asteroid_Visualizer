import { AssetManager } from "../AssetManager/AssetManager.js";

class ShaderManager {
    constructor(serviceProvider) {
        // Fields
        this.shaderAssets = [];

        const assetManager = serviceProvider.GetService(AssetManager);
        this.shaderAssets = assetManager.GetResources().shaders;
    }
}

export { ShaderManager };
