
/* Shader uniforms */
uniform vec3 color;
uniform float fresnelBias;
uniform float fresnelScale;
uniform float fresnelPower;
uniform int octaves;
uniform float lacunarity;
uniform float persistence;
uniform float gridSize;
uniform float time;
uniform bool isDetailed;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vView;


// smoothens out the noise
float smoothValue(float x) {
    x = clamp(x, 0.0, 1.0);
    return x * x * (3.0 - 2.0 * x);
}

// Threshold function with smoothing.
float smoothStep(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return smoothValue(t);
}

// Generates a 1-Dimensional random value based on a 3-Dimensional input.
float rand3dTo1d(vec3 value) {
    float random = fract(sin(dot(value.xyz, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
    return random;
}

// Hash functions to generate random values based on a 3D input.
float hash13(vec3 p3) {
    p3  = fract(p3 * 0.1031);
    p3 += dot(p3, p3.zyx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

// Custom hash function to generate random 3D vectors based on a 3D input.
vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
}

float invert(float value) {
    return 1.0 - value;
}

// Calculation based on the Voronoir / Worley noise pattern.
//    - Noise pattern prefers vertices position over uv coordinates. Aids in reducing the tiling effect.
// Sources:
//      - https://www.shadertoy.com/view/4fX3D8
//      - https://github.com/ronja-tutorials/ShaderTutorials/blob/master/Assets/024_White_Noise/WhiteNoise.cginc
//      - https://www.ronja-tutorials.com/post/028-voronoi-noise/
float voronoiNoise3D(vec3 position, float gridsize, vec3 seed) {
    vec3 scaledPosition = position * gridsize;
    vec3 baseCell = floor(scaledPosition);
    vec3 grid = scaledPosition - baseCell;

    float minDistToCell = 10.0;
    float density1;
    float density2;

    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            for (int z = -1; z <= 1; z++) {
                vec3 cell = baseCell + vec3(x, y, z);
                cell += seed + 1.0;

                vec3 cellPosition = cell + rand3dTo1d(cell);
                vec3 center = hash33(cell) + vec3(x, y, z);
                float distToCell = distance(grid, center);
                float density = hash13(cell) * smoothValue(1.0 - distToCell);

                if (density > density1) {
                    density2 = density1;
                    density1 = density;
                } else if (density > density2) {
                    density2 = density;
                }
            }
        }
    }

    return density1 - density2;
}

// Parent function to generate noise pattern with controls, to noise parameters.
float solarGranuleNoise(vec3 position, float gridSize, int octaves, float lacunarity, float persistence) {
    float amplitude = 1.0;
    float amplitudeSum = 0.0;
    float result = 0.0;
    float seed = 694201.0; // This can be set to any value.

    for (int i = 0; i < octaves; i++) {
        float canScale = i > 0 ? 1.0 : 0.0;
        result += voronoiNoise3D(position, gridSize * canScale, vec3(seed)) * amplitude;

        amplitudeSum += amplitude;
        gridSize *= lacunarity;
        amplitude *= persistence;
        seed += gridSize;
    }

    result /= amplitudeSum;

    return result;
}

// TODO: Need to optimise shader by implementing a distance check to disable noise shading.
void main() {
    // Base color
    vec3 finalColor = vec3(0.0, 0.0, 0.0);

    if (isDetailed) {
        // Calculate offset
        float scaledTime = time * 0.03;
        vec3 offset = vec3(scaledTime, scaledTime, scaledTime);

        // Layer 1: Calculate noise
        float noise = solarGranuleNoise((vPos + offset), gridSize, octaves, lacunarity, persistence);
        noise = clamp(noise * 1.5, 0.0, 0.3);
        noise = pow(noise, 0.9);
        noise = invert(noise);
        finalColor += noise;

        // Layer 2: Generate the fresnel effect
        // source: https://kylehalladay.com/blog/tutorial/2014/02/18/Fresnel-Shaders-From-The-Ground-Up.html
        float fresnel = fresnelBias + fresnelScale * pow(1.0 + dot(vView, vNormal), fresnelPower);
        finalColor += fresnel;
    }
    else {
        finalColor = vec3(1.0, 1.0, 1.0);
    }

    // TODO: Layer 3: Overlay will perlin noise to randomise the surface shading.

    // TODO: Layer 4: Add the sun spots.

    // TODO: Layer 5: Color the sun.

    gl_FragColor = vec4(finalColor, 1.0);
}
