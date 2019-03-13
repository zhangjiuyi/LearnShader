/**
 * @ Jiuyi
 */

import './libs/OrbitControls.js'
import './shaders'
const THREE = require('three')
const fileLoader = new THREE.FileLoader();
const textureLoader = new THREE.TextureLoader();


let idx = 0

class GL  {

  constructor(dom) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.controls = new THREE.OrbitControls( this.camera );
    this.scene.background = new THREE.Color(0xe4e3de);
    this.init(dom)
    this.showPlane()
  }

  showPlane () {
    var geometry = new THREE.PlaneBufferGeometry( 20, 20, 32 );

    // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

    // var material = new THREE.BlinkMaterial()  // 闪烁 shader
    var material = new THREE.ScaleMaterial()  // 闪烁 shader


    this.plane = new THREE.Mesh( geometry, material );

    this.scene.add(this.plane)

    // var sprite = new THREE.Sprite( material );
    // this.scene.add(sprite)
  }




  init (dom) {

    this.camera.aspect = dom.clientWidth / dom.clientHeight;
    this.camera.lookAt(this.camera.position);
    this.camera.position.set( 7, 1, 40 );
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( dom.clientWidth, dom.clientHeight );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    dom.appendChild(this.renderer.domElement)

    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  render () {
    this.renderer.render(this.scene,this.camera);
    this.controls.update();
    if (this.plane) {
      this.plane.material.uniforms.u_time.value = idx+=0.05
    }
  }
}

export default GL