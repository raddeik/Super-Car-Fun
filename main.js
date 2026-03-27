// main.js corregido

// Escena y renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // cielo azul
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // luz suave
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10,20,10);
scene.add(directionalLight);

// Suelo
const floorGeo = new THREE.PlaneGeometry(50,50);
const floorMat = new THREE.MeshPhongMaterial({color:0x888888});
const floor = new THREE.Mesh(floorGeo,floorMat);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Obstáculos
const obstacles = [];
function addObstacle(x,z,w,d,h){
    const geo = new THREE.BoxGeometry(w,h,d);
    const mat = new THREE.MeshPhongMaterial({color:0x444444});
    const box = new THREE.Mesh(geo, mat);
    box.position.set(x,h/2,z);
    scene.add(box);
    obstacles.push(box);
}
addObstacle(5,0,2,2,2);
addObstacle(-5,-5,3,2,2);

// Coche
const carGeo = new THREE.BoxGeometry(1,0.5,2);
const carMat = new THREE.MeshPhongMaterial({color:0xff0000});
const car = new THREE.Mesh(carGeo,carMat);
car.position.set(0,0.25,0);
scene.add(car);

// Cámara detrás y arriba
camera.position.set(0,5,10);
camera.lookAt(car.position);

// Controles de teclado
const keys = {};
document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

let carSpeed = 0;
function animate(){
    requestAnimationFrame(animate);

    // Movimiento del coche
    if(keys['w']) carSpeed += 0.05;
    else if(keys['s']) carSpeed -= 0.05;
    else carSpeed *= 0.9; // fricción

    if(keys['a']) car.rotation.y += 0.04;
    if(keys['d']) car.rotation.y -= 0.04;

    car.position.x += Math.sin(car.rotation.y) * carSpeed;
    car.position.z += Math.cos(car.rotation.y) * carSpeed;

    // Cámara sigue al coche
    camera.position.x = car.position.x - Math.sin(car.rotation.y)*8;
    camera.position.z = car.position.z - Math.cos(car.rotation.y)*8;
    camera.position.y = car.position.y + 5;
    camera.lookAt(car.position);

    renderer.render(scene, camera);
}

animate();