uniform sampler2D texture;
uniform float brightness;

varying vec2 vUv;

void main() {
    // vec4 texel = texture2D(texture, vUv);
    // gl_FragColor = vec4(texel.rgb * brightness, texel.a);
    gl_FragColor = gl_FragColor * vec4(1.0, 0.0, 1.0, 1.0);
}