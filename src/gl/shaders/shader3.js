
const THREE = require('THREE')

/**
 *  使用 uv 和 time 实现随机的显示效果
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
varying vec2 vUv;

void main(void) {
  vec2 position = vUv;

  float color = 0.0;
  color += sin( position.x * cos(u_time / 15.0 ) * 80.0 ) + cos( position.y * cos( u_time / 15.0 ) * 10.0 );
  color += sin( position.x * sin(u_time / 10.0 ) * 40.0 ) + cos( position.y * sin( u_time / 25.0 ) * 40.0 );
  color += sin( position.x * sin(u_time / 5.0 ) * 10.0 ) + sin( position.y * sin( u_time / 35.0 ) * 80.0 );
  color *= sin( u_time / 10.0 ) * 0.5;


  gl_FragColor = vec4(vec3( color, color * 0.5, sin( color + u_time / 3.0 ) * 0.75 ), 1.0);
}

`


const shaderParam = {
  uniforms:   {
    // color: { value: new THREE.Color( 0x23244 ) },
    u_time: {value: 1.0},
    // u_texture: { value: new THREE.TextureLoader().load( "texture/tex.jpg" ) }
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



THREE.Shader3 = () => {
  return new THREE.ShaderMaterial(shaderParam)
}








