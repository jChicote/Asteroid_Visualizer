import * as THREE from "../../../../../node_modules/three/build/three.module.js";
import { TextureResource } from "../../../Entities/TextureResource.js";
import { ObjectValidator } from "../../../../utils/ObjectValidator.js";

class TextureLoader {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
    }

    async LoadTextures(materialConfiguration) {
        const textureSource = materialConfiguration.textureSource;

        if (ObjectValidator.IsValid(textureSource)) {
            const textureResource = new TextureResource(
                materialConfiguration.key,
                await this.LoadTextureFromPath(textureSource.albedoPath),
                await this.LoadTextureFromPath(textureSource.normalPath),
                await this.LoadTextureFromPath(textureSource.specularPath)
            );

            return textureResource;
        }
    }

    async LoadTextureFromPath(path) {
        if (!ObjectValidator.IsValid(path)) {
            return;
        }

        try {
            return this.textureLoader.load(path);
        } catch (error) {
            console.error("Cannot load textrue asset with ID: " + materialConfiguration.key);
        }
    }
}

export { TextureLoader };
