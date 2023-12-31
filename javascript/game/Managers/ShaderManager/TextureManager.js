import { AssetManager } from "../AssetManager/AssetManager.js";

class TextureManager {
    constructor(serviceProvider) {
        // Fields
        this.textureAssets = [];

        const assetManager = serviceProvider.GetService(AssetManager);
        this.textureAssets = assetManager.GetResources().textures;
    }

    GetTextureAsset(key) {
        const texture = this.textureAssets.find(x => x.key === key);
        if (texture === null) {
            console.error(`Texture asset with key ${key} not found.`);
        }

        return texture;
    }
}

export { TextureManager };
