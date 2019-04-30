
const THREE = require('THREE')

/**
 *  
 * 
 */

const vertex = `

uniform float amplitude;
// attribute float a_position;

attribute float a_size;
attribute vec3 customColor;

varying vec3 vColor;

void main() {
  vColor = customColor;

  vec4 mvPosition = modelViewMatrix * vec4(position , 1.0);

  gl_PointSize = a_size;

  gl_Position = projectionMatrix * mvPosition;

}

`


const fragment = `

// precision mediump float;

uniform vec3 color;
uniform sampler2D u_texture;

varying vec3 vColor;

void main() {

  // vec3 light  = vec3(0.5, 0.2, 1.0);

  // light = normalize(light);

  // float dProd = dot( vNormal, light) * 0.5 + 0.5;

  // vec4 tcolor = texture2D( u_texture, vUv);
  // vec4 gray = vec4( vec3( tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11), 1.0);

  gl_FragColor = vec4( color * vColor, 1.0 );

  // gl_FragColor = gl_FragColor * texture2D(u_texture, gl_PointCoord);

}

`

const u_texture = new THREE.TextureLoader().load( "texture/water.jpg" );
u_texture.wrapS = u_texture.wrapT = THREE.RepeatWrapping;

const shaderParam = {
  uniforms:   {
    color: { value: new THREE.Color( 0x23244 ) },
    // u_time: {value: 1.0},

    amplitude: { value: 1.0 },

    u_texture: { value: u_texture }
  },
  vertexShader: vertex,
  fragmentShader: fragment,
  side: THREE.DoubleSide,
  // wireframe: true
  // blending: THREE.AdditiveBlending,
  // depthTest: false,
  // transparent: true,
  // vertexColors: true
  // extensions: {
  //   derivatives: true
  // }
}



THREE.Shader6 = () => {
  return new THREE.ShaderMaterial(shaderParam)
}








