import * as THREE from 'three';
import { OrbitControls } from 'controls';
import * as DAT from 'datgui';

function main() {
  console.log('test')

  window.scene = new THREE.Scene();
  window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  window.camera.position.set(30, 40, 50);
  window.camera.lookAt(0, 0, 0);

  window.renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0x7559C5);
  document.getElementById('3d_content').appendChild(window.renderer.domElement);
  const axesHelper = new THREE.AxesHelper(20);
  window.scene.add(axesHelper);

  // Controls
  window.controls = new OrbitControls(window.camera, window.renderer.domElement);
  controls.update();

  // Geometry
  const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100,100,10,10),
      new THREE.MeshStandardMaterial({
        color: 0x555555
      })
  )
  plane.rotation.x = -Math.PI / 2;
  window.scene.add(plane);

  const cube = new THREE.Mesh(
      new THREE.BoxGeometry(5,5,5),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      })
  )
  cube.position.set(0,3,0);
  window.scene.add(cube);

  window.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 16, 8),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      })
  )
  window.sphere.position.set(10,3,0);
  window.scene.add(window.sphere);

  // Lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(20,100,10);
  directionalLight.target.position.set(0,0,0);
  window.scene.add(directionalLight);

  window.renderer.render(window.scene, window.camera);
  window.counter = 0;

  // DATGUI
  const gui = new DAT.GUI();
  gui.add(cube.position, 'y', -20, 20);
  gui.add(window, 'counter', 0, 360);
  update();
}

function update() {
  window.counter = (window.counter + 1) % 3145926;
  const counter = window.counter / 60;
  window.sphere.position.set(Math.cos(counter) * 10, 6 + (Math.sin(counter * 5) * 3), Math.sin(counter) * 10);

  requestAnimationFrame(() => {
    window.camera.aspect = window.innerWidth / window.innerHeight;
    window.camera.updateProjectionMatrix();
    window.renderer.setSize(window.innerWidth, window.innerHeight);
    window.renderer.render(window.scene, window.camera);
    update();
  })
}

window.onload = main;