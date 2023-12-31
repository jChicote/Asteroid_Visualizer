class MaterialConfiguration {
    constructor() {
        this.key = "";
        this.defaultMaterial = null;
        this.shaderConfiguration = null;
        this.textureConfiguration = null;
    }
}

class TextureMaps {
    constructor(parameters) {
        this.albedoPath = parameters.albedoPath;
        this.normalPath = parameters.normalPath;
        this.specularPath = parameters.specularPath;
    }
}

export { MaterialConfiguration, TextureMaps };
