uniform vec3 color;
uniform float time;

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

float smoothStep(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return smoothValue(t);
}

float rand3dTo1d(vec3 value) {
    float random = fract(sin(dot(value.xyz, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
    return random;
}

float voronoiNoise3D(vec3 value, vec3 offset) {
    vec3 baseCell = floor(value);
    float minDistToCell = 10.0;

    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            for (int z = -1; z <= 1; z++) {
                vec3 cell = baseCell + vec3(x, y, z);
                vec3 cellPosition = cell + rand3dTo1d(cell + offset);
                vec3 toCell = cellPosition - value;
                float distToCell = length(toCell);
                if (distToCell < minDistToCell) {
                    minDistToCell = distToCell;
                }
            }
        }
    }

    return minDistToCell;
}

vec2 sphericalMapping(vec3 position) {
    float u = 0.5 + atan(position.z, position.x) / (2.0 * 3.14159265359);
    float v = 0.5 - asin(position.y / length(position)) / 3.14159265359;
    return vec2(u, v);
}

float invert(float value) {
    return 1.0 - value;
}

void main() {
    // Calculate offset
    float scaledTime = time;
    vec3 offset = vec3(sin(scaledTime), cos(scaledTime), sin(scaledTime));

    // Calculate noise
    float noise = voronoiNoise3D((vPos + offset) / 0.5, vec3(0.0, 0.0, 0.0));
    vec3 noiseColor = vec3(1.0, 1.0, 1.0) * invert(noise);

    gl_FragColor = vec4(noiseColor, 1.0);
}