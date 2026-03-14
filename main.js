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
const baseCircleMaterial = new THREE.MeshStandardMaterial({color: 0xffff00});
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

// Adding Basic Outline Circle
const baseOutlineGeometry = new THREE.RingGeometry(radius, radius+1, 64);
const baseOutlineMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});
const baseOutline = new THREE.Mesh(baseOutlineGeometry, baseOutlineMaterial);
baseOutline.rotation.x = -Math.PI / 2;
scene.add(baseOutline);

// Adding a sphere
const sphereGeometry = new THREE.SphereGeometry(radius/4, 128);
const sphereMaterial = new THREE.MeshPhongMaterial({color: 0x00ffff});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-radius, radius/4, 0);
scene.add(sphere);

// Adding ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Adding directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(50, 50, 50);
scene.add(directionalLight);

// Adding a textured ground
const groundGeometry = new THREE.PlaneGeometry(500,500);
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('resources/images/stone-pavement.jpg', (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    const groundMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10, 10);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);
})

function animate( time ) {
    const speed = 1.5;

    sphere.position.x = Math.cos(time / 1000 * speed) * radius;
    sphere.position.z = Math.sin(time / 1000 * speed) * radius;

    sphere.rotation.x = time/ 1000 * speed * (radius / sphere.geometry.parameters.radius);

    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );