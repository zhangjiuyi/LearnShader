
const THREE = require('THREE')

/**
 *  使用 uv 变量实现简单的渐变闪烁
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
  // vec2 position =  -100.0 + 200.0 * vUv;
  vec2 position =  -1.0 + 2.0 * vUv;

  float red = abs( sin(position.x * position.y + u_time / 5.0) );
  float green = abs( sin(position.x * position.y + u_time / 4.0) );
  float blue = abs( sin(position.x * position.y + u_time / 3.0) );

  gl_FragColor = vec4(red, green, blue, 1.0);
}


`


/**
 * gl_FragColor： 片元着色器内建变量，设置像素的颜色
 */

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



THREE.Shader2 = () => {
  return new THREE.ShaderMaterial(shaderParam)
}








