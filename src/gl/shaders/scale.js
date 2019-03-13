
const THREE = require('THREE')

const vertex = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

`


const fragment = `

uniform float u_time;

vec3 colorA = vec3(0.949,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

void main() {

  vec3 color = vec3(0.0);
  float pct = abs(sin(u_time));

  color = mix(colorA, colorB, pct);

  gl_FragColor = vec4( color, 1.0 );
}


`


/**
 * gl_FragColor： 片元着色器内建变量，设置像素的颜色
 */

const shaderParam = {
  uniforms:   {
    color: { value: new THREE.Color( 0x23244 ) },
    u_time: {value: 0},
    u_texture: { value: new THREE.TextureLoader().load( "texture/tex.jpg" ) }
  },
  vertexShader: vertex,
  fragmentShader: fragment,
  // blending: THREE.AdditiveBlending,
  // depthTest: false,
  // transparent: true,
  // vertexColors: true
  // extensions: {
  //   derivatives: true
  // }
}



THREE.ScaleMaterial = () => {
  return new THREE.ShaderMaterial(shaderParam)
}








