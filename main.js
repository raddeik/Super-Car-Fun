// Escena, cámara y renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,10,5);
scene.add(light);

// Suelo
const floorGeo = new THREE.PlaneGeometry(100,100);
const floorMat = new THREE.MeshPhongMaterial({color:0x444444});
const floor = new THREE.Mesh(floorGeo,floorMat);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// Obstáculos
const obstacles = [];
function addObstacle(x,z,w,d,h){
  const geo = new THREE.BoxGeometry(w,h,d);
  const mat = new THREE.MeshPhongMaterial({color:0x888888});
  const box = new THREE.Mesh(geo,mat);
  box.position.set(x,h/2,z);
  scene.add(box);
  obstacles.push(box);
}
addObstacle(5,0,2,5,2);
addObstacle(-5,-10,2,5,2);

// Coche
const carGeo = new THREE.BoxGeometry(1,0.5,2);
const carMat = new THREE.MeshPhongMaterial({color:0xff0000});
const car = new THREE.Mesh(carGeo,carMat);
car.position.set(0,0.25,0);
scene.add(car);

// Cámara detrás del coche
camera.position.set(0,5,10);
camera.lookAt(car.position);

// Controles
const keys = {};
document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

let carSpeed = 0;
function animate(){
  requestAnimationFrame(animate);

  // Movimiento
  if(keys['w']) carSpeed += 0.02;
  else if(keys['s']) carSpeed -= 0.02;
  else carSpeed *= 0.95;

  if(keys['a']) car.rotation.y += 0.03;
  if(keys['d']) car.rotation.y -= 0.03;

  car.position.x += Math.sin(car.rotation.y) * carSpeed;
  car.position.z += Math.cos(car.rotation.y) * carSpeed;

  // Cámara sigue al coche
  camera.position.x = car.position.x - Math.sin(car.rotation.y)*5;
  camera.position.z = car.position.z - Math.cos(car.rotation.y)*5;
  camera.position.y = car.position.y + 3;
  camera.lookAt(car.position);

  renderer.render(scene, camera);
}

animate();