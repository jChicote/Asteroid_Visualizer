import { VisualiserConfiguration } from "../../../../main.js";
import { ObjectValidator } from "../../../utils/ObjectValidator.js";
import { ShaderLoader } from "./Loaders/ShaderLoader.js";

class AssetManager {
    constructor() {
        // Fields
        this.gameConfiguration = VisualiserConfiguration();

        // Components
        this.shaderLoader = new ShaderLoader();

        // Resources
        this.shaderAssets = [];
    }

    async PreLoadAssets() {
        const materialConfigurations = this.gameConfiguration.materialConfigurations;
        for (const configuration of materialConfigurations) {
            await this.shaderLoader.LoadMaterialShader(configuration).then((shaderAsset) => {
                if (ObjectValidator.IsValid(shaderAsset)) {
                    this.shaderAssets.push(shaderAsset);
                }
            });
        }
    }

    GetResources() {
        return {
            shaders: this.shaderAssets
        };
    }
}

export { AssetManager };
