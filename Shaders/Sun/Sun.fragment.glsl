uniform vec3 color;

/* Shader uniforms */
uniform float octaves;
uniform float lacunarity;
uniform float persistence;
uniform float gridsize;
uniform float tiling;


varying vec2 vUv;

/* smoothens out the noise */
float smoothValue(float x) {
    x = clamp(x, 0.0, 1.0);
    return x * x * (3.0 - 2.0 * x);
}



void main() {
    // Square UVs with (0,0) in the center

}