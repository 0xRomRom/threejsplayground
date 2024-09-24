import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enebleDamping = true;
controls.dampingFactor = 0.033;
//////////////////////////////////

const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load("./Earth.jpg"),
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight(0x0099fff, 0x0099fff);
scene.add(hemiLight);

///////////////////////

// Render to DOM
function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001;
  controls.update();
  renderer.render(scene, camera);
}
animate();
