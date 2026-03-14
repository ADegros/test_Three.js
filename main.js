import * as THREE from 'three';

const canvaWidth = 900;
const canvaHeight = 800;
const radius = 40;

// Creation of scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, canvaWidth / canvaHeight, 0.1, 1000);
camera.position.set(0, 50, -100);
camera.lookAt(0, 0, 0);

// Creation of renderer and adding to the document body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvaWidth,canvaHeight);
document.body.appendChild(renderer.domElement);

const baseCircleGeometry = new THREE.CircleGeometry(radius, 32);
const baseCircleMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const baseCircle = new THREE.Mesh(baseCircleGeometry, baseCircleMaterial);
baseCircle.position.set(0,0,0);
baseCircle.rotation.x = -Math.PI / 2;
scene.add(baseCircle);

renderer.render(scene, camera);