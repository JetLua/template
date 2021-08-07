precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 inputSize;

uniform float end;
uniform float start;

vec3 hex2rgb(float color) {
  float r = mod(color / 256.0 / 256.0, 256.0);
  float g = mod(color / 256.0, 256.0);
  float b = mod(color, 256.0);
  return vec3(r / 255.0, g / 255.0, b / 255.0);
}

void main() {
  vec4 fg = texture2D(uSampler, vTextureCoord);
  float mixValue = distance(vTextureCoord, vec2(0, 0));
  vec3 color = mix(hex2rgb(start), hex2rgb(end), mixValue);
  // vec4 color1 = vec4(color, mixValue);

  gl_FragColor = mix(vec4(color, 1.0), fg, (1.0 - fg.a));
}
