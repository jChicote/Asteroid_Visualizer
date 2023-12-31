import * as THREE from "../../../../../node_modules/three/build/three.module.js";
import { TextureResource } from "../../../Entities/TextureResource.js";

class TextureLoader {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
    }

    async LoadTextures(materialConfiguration) {
        const textures = materialConfiguration.textures;

        if (ObjectValidator.IsValid(textures)) {
            const textureResource = new TextureResource(
                this.materialConfiguration.key,
                this.textureLoader.load(textures.albedo),
                this.textureLoader.load(textures.normal)
            );

            return textureResource;
        }
    }
}

export { TextureLoader };
