uniform vec2 resolution;
uniform float time;

uniform vec3 colorA;
uniform vec3 colorB;

varying vec3 vUv;

void main() {
    float pct = abs(sin(time));

    gl_FragColor = vec4(mix(colorA, colorB, pct), 1.0);
}
