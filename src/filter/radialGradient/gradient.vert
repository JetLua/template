precision highp float;

attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform vec4 inputSize;
uniform vec4 outputFrame;

varying vec2 vTextureCoord;
varying vec2 vPosition;

void main(void) {
  vPosition = aVertexPosition * max(outputFrame.zw, vec2(.0)) + outputFrame.xy;
  gl_Position = vec4((projectionMatrix * vec3(vPosition, 1.0)).xy, .0, 1.0);
  vTextureCoord = aVertexPosition * (outputFrame.zw * inputSize.zw);
}