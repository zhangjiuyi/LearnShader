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

    // const count = 10000;

    this.geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    
    console.log(this.geometry)

    const amount = this.geometry.attributes.position.count 
    console.log('数量：' + amount)


    this.a_size   = new Float32Array( amount );
    this.customColor  = new Float32Array( amount * 3 );
    console.log(this.customColor)

    var color = new THREE.Color( 0xffffff );
    console.log(this.geometry.attributes.position.array.length)

    for ( var i = 0; i < amount; i ++ ) {
      if (this.geometry.attributes.position.array[i*3] > 0) {
        color.setHSL( 0.5 + 0.1 * ( i / amount ), 0.7, 0.5 );
      } else {
        color.setHSL( 0.5 - 0.3 * ( i / amount ), 0.7, 0.5 );
      }

      this.a_size[i] = 10

      color.toArray( this.customColor, i * 3 );
    }
    console.log(this.customColor)

    this.geometry.addAttribute( 'a_size', new THREE.BufferAttribute( this.a_size, 1 ) );
    this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( this.customColor, 3 ) );

    /**
     *  材质列表 
     */
    // var material = new THREE.Shader1()  
    // var material = new THREE.Shader2()  
    // var material = new THREE.Shader3()  
    // var material = new THREE.Shader4()  
    // var material = new THREE.Shader5()  
    var material = new THREE.Shader6()  


    this.plane = new THREE.Points( this.geometry, material );
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
    var time = Date.now() * 0.005;

    this.renderer.render(this.scene,this.camera);
    this.controls.update();

    var attributes = this.geometry.attributes;

    console.log(attributes)
    for ( var i = 0; i < attributes.a_size.array.length; i ++ ) {
      attributes.a_size.array[ i ] = 14 + 13 * Math.sin( 0.1 * i + time );
    }

    attributes.a_size.needsUpdate = true;


    // for ( var i = 0; i < this.displacement.length; i ++ ) {
    //   // console.log(this.displacement[ 0])
    //   this.displacement[ i ] = Math.sin( 0.1 * i + time );

    // }
    // this.geometry.attributes.displacement.needsUpdate = true;

    if (this.plane) {
      // this.plane.material.uniforms.color.value.offsetHSL( 0.0001, 0.0001, 0 );
    }
    // console.log(Math.sqrt(idx))
  }
}



export default GL