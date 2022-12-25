import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .01, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),  
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(-100);

renderer.render( scene, camera );

const geometry = new THREE.SphereGeometry(10, 20, 20);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const sphere = new THREE.Mesh(geometry, material);

scene.add( sphere );

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(15,15,12); 

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight );

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add( lightHelper, gridHelper );

// DEBUG FEATURE, comment out on live
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('spacebg.jpg');
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame( animate );

  //sphere.rotation.x = -10;
  sphere.rotation.y -= 0.005;
   
  // Debug feature
  controls.update();

  renderer.render( scene, camera );
}

animate();

