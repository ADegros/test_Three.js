import * as THREE from 'three';

const canvaWidth = 900;
const canvaHeight = 800;

// Creation of scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, canvaWidth / canvaHeight, 0.1, 1000);

// Creation of renderer and adding to the document body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvaWidth,canvaHeight);
document.body.appendChild(renderer.domElement);