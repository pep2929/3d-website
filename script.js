// Create the scene
const scene = new THREE.Scene();

// Create the camera, positioned closer to the cars
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 10); // Move the camera closer

// Create the renderer with anti-aliasing enabled
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for sharpness
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Use sRGB encoding for better color accuracy
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Use ACES tone mapping for a more realistic look
renderer.toneMappingExposure = 1.0; // Adjust exposure if needed
document.getElementById('3d-container').appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Adjust intensity for clarity
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Create the GLTF loader
const loader = new THREE.GLTFLoader();

// Load the first car model (eco_rally_car.glb)
loader.load('evo_rally_car.glb', function(gltf) {
    const carModel1 = gltf.scene;

    carModel1.position.set(-2, 0, 0); // Position the first car on the left
    carModel1.scale.set(0.5, 0.5, 0.5); // Scale the car
    scene.add(carModel1);
}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

// Load the second car model (free_porsche_911_carrera_4s.glb)
loader.load('free_porsche_911_carrera_4s.glb', function(gltf) {
    const carModel2 = gltf.scene;

    carModel2.position.set(2, 0, 0); // Position the second car on the right
    carModel2.scale.set(0.5, 0.5, 0.5); // Scale the car
    scene.add(carModel2);
}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

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
