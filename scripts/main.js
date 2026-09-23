import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { World } from './world';
import { createUI } from './ui.js';
import { Player } from './player.js';
import { Physics } from './physics.js';

const stats = new Stats();
document.body.appendChild(stats.dom);

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// camera setup
const orbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
orbitCamera.position.set(-20, 20, -20);


const controls = new OrbitControls(orbitCamera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();
//scene setup
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);
const player = new Player(scene);

const physics = new Physics(scene);

// setup lights
function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.position.set(50, 50, 50);
    sun.castShadow = true;
    // Set the size of the sun's shadow box
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40;
    sun.shadow.camera.bottom = -40;
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 200;
    sun.shadow.bias = -0.0001;
    sun.shadow.mapSize = new THREE.Vector2(2048, 2048);
    scene.add(sun);
    scene.add(sun.target);

    // const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
    // scene.add(shadowHelper);

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.1;
    scene.add(ambient);
}



// render loop
let previousTime = performance.now();
function animate() {
    let currentTime = performance.now();
    let dt = (currentTime-previousTime)/1000;
    requestAnimationFrame(animate);
    player.applyInputs(dt);
    player.updateBoundsHelper();
    physics.update(dt, player, world);
    renderer.render(scene, player.controls.isLocked ? player.camera: orbitCamera);
    stats.update();
    previousTime = currentTime;
}
window.addEventListener('resize', () => {
    orbitCamera.aspect = window.innerWidth / window.innerHeight;
    orbitCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
setupLights();
createUI(world, player);
animate();