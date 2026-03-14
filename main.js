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

// Adding Basic Circle
const baseCircleGeometry = new THREE.CircleGeometry(radius, 32);
const baseCircleMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const baseCircle = new THREE.Mesh(baseCircleGeometry, baseCircleMaterial);
baseCircle.rotation.x = -Math.PI / 2;
scene.add(baseCircle);

/*
There is 2 methods to create an outline for the circle :
- manually defining each points with a function and creating a line with BufferGeometry().setFromPoints
- using RingGeometry() with (radius, radius+1) parameters to get a line of width=1

// Creating a circle line based on center, radius & number of points wished
function create_circle(x, y, z, r, n) {
    let newPoints = [];
    let unitAngle = (Math.PI * 2 / n);
    for (let i = 0; i <= n; i++) {
        newPoints.push(new THREE.Vector3(
            x + Math.cos(unitAngle * i) * r,
            y,
            z + Math.sin(unitAngle * i) * r
        ))
    }
    return newPoints;
}

// Adding circle outline

const baseOutlineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
let points = create_circle( 0, 0, 0, radius, 64);
const baseOutlineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const baseOutline = new THREE.Line(baseOutlineGeometry, baseOutlineMaterial);
// No rotation needed because function create_circle is based on (x,z) and not (x,y)
scene.add(baseOutline);
*/

const baseOutlineGeometry = new THREE.RingGeometry(radius, radius+1, 64);
const baseOutlineMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
const baseOutline = new THREE.Mesh(baseOutlineGeometry, baseOutlineMaterial);
baseOutline.rotation.x = -Math.PI / 2;
scene.add(baseOutline);

renderer.render(scene, camera);