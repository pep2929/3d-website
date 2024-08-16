// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Create the GLTF loader
const loader = new THREE.GLTFLoader();

// Load the GLB model
loader.load('eco_rally_car.glb', function(gltf) {
    const carModel = gltf.scene;
    carModel.position.set(-2, 0, 0); // Position the car on the left side
    carModel.scale.set(0.5, 0.5, 0.5); // Scale the car to fit the scene
    scene.add(carModel);
}, undefined, function(error) {
    console.error(error);
});

// Load the second car model (you can duplicate the first if you want the same car)
loader.load('eco_rally_car.glb', function(gltf) {
    const carModel2 = gltf.scene;
    carModel2.position.set(2, 0, 0); // Position the car on the right side
    carModel2.scale.set(0.5, 0.5, 0.5); // Scale the car to fit the scene
    scene.add(carModel2);
}, undefined, function(error) {
    console.error(error);
});

// Create a vault (using placeholder geometry for simplicity)
const vaultGeometry = new THREE.CylinderGeometry(3, 3, 1, 32);
const vaultMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
const vault = new THREE.Mesh(vaultGeometry, vaultMaterial);
vault.position.set(0, 1, -5);
vault.rotation.x = Math.PI / 2;
scene.add(vault);

// Create a city background (using placeholder geometry for simplicity)
const cityGeometry = new THREE.BoxGeometry(50, 50, 1);
const cityMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const city = new THREE.Mesh(cityGeometry, cityMaterial);
city.position.set(0, -25, -20);
scene.add(city);

// Animation variables
let zoomedIn = false;
let vaultOpened = false;

// Handle screen click to zoom in and open the vault
document.addEventListener('click', () => {
    if (!zoomedIn) {
        zoomedIn = true;
        camera.position.z = 10;
    } else if (!vaultOpened) {
        vaultOpened = true;
        openVault();
    }
});

// Function to animate the vault opening
function openVault() {
    const door = new THREE.BoxGeometry(2, 3, 0.2);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const vaultDoor = new THREE.Mesh(door, doorMaterial);
    vaultDoor.position.set(0, 1, -4.9);
    scene.add(vaultDoor);

    const link = document.createElement('a');
    link.href = 'https://your-website-link.com'; // Replace with your website link
    link.textContent = 'Enter the Website';
    link.style.color = 'white';
    link.style.position = 'absolute';
    link.style.top = '50%';
    link.style.left = '50%';
    link.style.transform = 'translate(-50%, -50%)';
    link.style.fontSize = '24px';
    link.style.textDecoration = 'none';
    document.body.appendChild(link);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
