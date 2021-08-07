#define NUM_OCTAVES 3

precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 inputSize;


uniform float t;
uniform float end;
uniform float start;

vec2 random(vec2 point) {
  return fract(sin(vec2(
    dot(point, vec2(127.1,311.7)),
    dot(point, vec2(269.5,183.3)))
  ) * 43758.5453);
}

float random_f(vec2 point) {
  return fract(sin(dot(point, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 hex2rgb(float color) {
  float r = mod(color / 256.0 / 256.0, 256.0);
  float g = mod(color / 256.0, 256.0);
  float b = mod(color, 256.0);
  return vec3(r / 255.0, g / 255.0, b / 255.0);
}

float smoke(vec2 st) {
  st *= 3.0;
  st.y *= inputSize.y / inputSize.x;

  vec2 i_st = floor(st);
  vec2 f_st = fract(st);

  float m_dist = .15;  // minimun distance

  for (int j= -1; j <= 1; j++ ) {
    for (int i= -1; i <= 1; i++ ) {
      // Neighbor place in the grid
      vec2 neighbor = vec2(float(i), float(j));

      // Random position from current + neighbor place in the grid
      vec2 offset = random(i_st + neighbor);

      // Animate the offset
      offset = 0.5 + 0.5 * sin(t + 6.2831 * offset);

      // Position of the cell
      vec2 pos = neighbor + offset - f_st;

      // Cell distance
      float dist = length(pos);

      // Metaball it!
      m_dist = min(m_dist, m_dist * dist);
    }
  }

  return m_dist;
}

void main() {
  vec2 st = vTextureCoord;
  vec3 bg = mix(hex2rgb(start), hex2rgb(end), st.y);
  vec4 fg = texture2D(uSampler, vTextureCoord);

  bg = mix(bg, vec3(.0), smoke(st));
  // bg.a *= .5;
  bg.r *= .5;
  bg.g *= .5;
  bg.b *= .5;

  if (true) gl_FragColor = mix(vec4(bg, 1.0), fg, fg.a);
}
