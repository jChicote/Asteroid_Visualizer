import { ObjectValidator } from "../../../utils/ObjectValidator.js";
import { ShaderLoader } from "./Loaders/ShaderLoader.js";
import { TextureLoader } from "./Loaders/TextureLoader.js";
import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";

class AssetManager {
    constructor() {
        // Components
        this.shaderLoader = new ShaderLoader();
        this.textureLoader = new TextureLoader();

        // Resources
        this.shaderAssets = [];
        this.textureAssets = [];
    }

    // --------------------------------------------------------------------------
    //                                 Methods
    // --------------------------------------------------------------------------

    async PreLoadAssets() {
        const materialConfigurations = SolarSystemVisualizer.gameConfiguration.materialConfigurations;
        for (const configuration of materialConfigurations) {
            await this.shaderLoader.LoadMaterialShader(configuration).then((shaderAsset) => {
                if (ObjectValidator.IsValid(shaderAsset)) {
                    this.shaderAssets.push(shaderAsset);
                }
            });

            await this.textureLoader.LoadTextureMaps(configuration).then((textureAsset) => {
                if (ObjectValidator.IsValid(textureAsset)) {
                    this.textureAssets.push(textureAsset);
                }
            });
        }
    }

    GetResources() {
        return {
            shaderAssets: this.shaderAssets,
            textureAssets: this.textureAssets
        };
    }
}

export { AssetManager };
