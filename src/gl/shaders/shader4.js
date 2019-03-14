
const THREE = require('THREE')

/**
 *  使用贴图实现的无线内循环不知道怎么形容的效果
 *  来源于 threejs example
 */

const vertex = `

varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}

`


const fragment = `

uniform float u_time;
uniform sampler2D u_texture;
varying vec2 vUv;

void main(void) {

  vec2 position = -1.0 + 2.0 * vUv ;

  float a = atan( position.y , position.x );
  float r = sqrt(dot(position, position));


  vec2 uv;

  uv.x = cos( a ) / r;
  uv.y = sin( a ) / r;
  uv /= 10.0;
  uv += u_time * 0.05;

  vec3 color = texture2D( u_texture, uv ).rgb;

  gl_FragColor = vec4( color * r * 1.5, 1.0 );
  
}

`

const u_texture = new THREE.TextureLoader().load( "texture/disturb.jpg" );
u_texture.wrapS = u_texture.wrapT = THREE.RepeatWrapping;

const shaderParam = {
  uniforms:   {
    // color: { value: new THREE.Color( 0x23244 ) },
    u_time: {value: 1.0},
    u_texture: { value: u_texture }
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



THREE.Shader4 = () => {
  return new THREE.ShaderMaterial(shaderParam)
}








