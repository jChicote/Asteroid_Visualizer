class MaterialConfiguration {
    constructor() {
        this.key = "";
        this.defaultMaterial = null;
        this.shaderConfiguration = null;
        this.textureSource = null;
    }
}

class MaterialTextures {
    constructor(parameters) {
        this.albedoPath = parameters.albedoPath;
        this.normalPath = parameters.normalPath;
        this.specularPath = parameters.specularPath;
    }
}

export { MaterialConfiguration, MaterialTextures };
