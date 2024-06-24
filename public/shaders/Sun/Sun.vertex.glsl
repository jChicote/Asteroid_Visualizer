varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vView;

void main() {
    vUv = uv;
    vPos = position;
    vNormal = normalize(normalMatrix * normal); // Surface normal

    // Find the position of the vertex in view space.
    vec4 viewSpacePosition = modelViewMatrix * vec4(position, 1.0);

    // Find the direction to the camera.
    vView = normalize(viewSpacePosition.xyz - (viewMatrix * vec4(cameraPosition, 1.0)).xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}