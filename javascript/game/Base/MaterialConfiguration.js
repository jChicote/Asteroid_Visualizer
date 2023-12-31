class MaterialConfiguration {
    constructor() {
        this.key = "";
        this.defaultMaterial = null;
        this.shaderConfiguration = null;
        this.textures = null;
    }
}

class MaterialTextures {
    constructor(albedoPath, normalPath) {
        this.albedoPath = albedoPath;
        this.normalPath = normalPath;
    }
}

export { MaterialConfiguration, MaterialTextures };
