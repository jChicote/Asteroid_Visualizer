class ShaderConfiguration {
    constructor(key, fragment, vertex, uniforms) {
        this.key = key;
        this.fragmentShaderUrl = fragment;
        this.vertexShaderUrl = vertex;
        this.uniforms = uniforms;
    }
}

export { ShaderConfiguration };
