import * as THREE from "three";
import { TextureResource } from "../../../Entities/TextureResource.js";
import { ObjectValidator } from "../../../../utils/ObjectValidator.js";

class TextureLoader {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
    }

    async LoadTextureMaps(materialConfiguration) {
        if (ObjectValidator.IsValid(materialConfiguration.textureConfiguration) &&
            ObjectValidator.IsValid(materialConfiguration.textureConfiguration.textureMaps)) {
            const textureMapSource = materialConfiguration.textureConfiguration.textureMaps;
            const textureResource = new TextureResource(
                materialConfiguration.key,
                await this.LoadTextureMapsFromPath(textureMapSource.albedoPath),
                await this.LoadTextureMapsFromPath(textureMapSource.normalPath),
                await this.LoadTextureMapsFromPath(textureMapSource.specularPath)
            );

            return textureResource;
        }
    }

    async LoadTextureMapsFromPath(path) {
        if (!ObjectValidator.IsValid(path)) {
            return;
        }

        try {
            return this.textureLoader.load(path);
        } catch (error) {
            console.error("Cannot load texture asset from path: '" + path + "'");
        }
    }
}

export { TextureLoader };
