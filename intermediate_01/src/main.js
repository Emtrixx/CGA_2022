import * as THREE from 'three';

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

  window.renderer.render(window.scene, window.camera);
  update();
}

function update() {
  window.cam
  requestAnimationFrame(() => {
    window.renderer.render(window.scene, window.camera);
    update();
  })
}

window.onload = main;