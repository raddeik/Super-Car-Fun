// Escena y renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // cielo azul
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(10,20,10);
scene.add(dirLight);

// Suelo grande
const floorGeo = new THREE.PlaneGeometry(200,200);
const floorMat = new THREE.MeshPhongMaterial({color:0x228B22}); // verde césped
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Obstáculos visibles
const obstacles = [];
function addObstacle(x,z,w,d,h){
    const geo = new THREE.BoxGeometry(w,h,d);
    const mat = new THREE.MeshPhongMaterial({color:0x8B4513}); // marrón
    const box = new THREE.Mesh(geo,mat);
    box.position.set(x,h/2,z);
    scene.add(box);
    obstacles.push(box);
}
addObstacle(10,0,5,5,5);
addObstacle(-10,-10,5,5,5);

// Coche más grande
const carGeo = new THREE.BoxGeometry(2,1,4);
const carMat = new THREE.MeshPhongMaterial({color:0xff0000});
const car = new THREE.Mesh(carGeo,carMat);
car.position.set(0,0.5,0);
scene.add(car);

// Posición de cámara
camera.position.set(0,15,20);
camera.lookAt(car.position);

// Controles
const keys = {};
document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

let carSpeed = 0;
function animate(){
    requestAnimationFrame(animate);

    // Movimiento coche
    if(keys['w']) carSpeed += 0.1;
    else if(keys['s']) carSpeed -= 0.1;
    else carSpeed *= 0.9;
    if(keys['a']) car.rotation.y += 0.05;
    if(keys['d']) car.rotation.y -= 0.05;

    car.position.x += Math.sin(car.rotation.y) * carSpeed;
    car.position.z += Math.cos(car.rotation.y) * carSpeed;

    // Cámara sigue coche
    camera.position.x = car.position.x - Math.sin(car.rotation.y)*10;
    camera.position.z = car.position.z - Math.cos(car.rotation.y)*10;
    camera.position.y = car.position.y + 6;
    camera.lookAt(car.position);

    renderer.render(scene, camera);
}
animate();