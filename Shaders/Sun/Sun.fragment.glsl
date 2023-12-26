uniform vec3 color;
varying vec2 vUv;

void main() {
    gl_FragColor.rgba = vec4(color, 1.0);
}