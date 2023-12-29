uniform vec3 color;

/* Shader uniforms */
uniform float octaves;
uniform float lacunarity;
uniform float persistence;
uniform float gridsize;
uniform float tiling;

varying vec2 vUv;
varying vec3 vPos;

// out vec4 fragColor;

/* smoothens out the noise */
float smoothValue(float x) {
    x = clamp(x, 0.0, 1.0);
    return x * x * (3.0 - 2.0 * x);
}

vec2 rand2dTo2d(vec2 value) {
    float random = fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453);
    return vec2(random, random);
}

float vornoiNoise(vec2 value) {
    vec2 cell = floor(value);
    vec2 cellPosition = cell + rand2dTo2d(cell);
    vec2 toCell = cellPosition - value;
    float distToCell = length(toCell);
    return distToCell;
}

vec2 sphericalMapping(vec3 position) {
    float u = 0.5 + atan(position.z, position.x) / (2.0 * 3.14159265359);
    float v = 0.5 - asin(position.y / length(position)) / 3.14159265359;
    return vec2(u, v);
}

void main() {
    vec2 texCoord = sphericalMapping(vPos);
    vec3 uvColor = vec3(1.0, 1.0, 1.0) * vornoiNoise(texCoord / 0.005);
    gl_FragColor = vec4(uvColor, 1.0);
}