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

// Add ambient light for general illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Add directional light to simulate sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Add lights to the cars
const headlight1 = new THREE.PointLight(0xffffff, 1, 10);
const headlight2 = new THREE.PointLight(0xffffff, 1, 10);
const taillight1 = new THREE.PointLight(0xff0000, 1, 10);
const taillight2 = new THREE.PointLight(0xff0000, 1, 10);

// Create the GLTF loader
const loader = new THREE.GLTFLoader();

// Function to create a shiny material
function createShinyMaterial() {
    return new THREE.MeshStandardMaterial({
        color: 0x888888, // Base color, can be adjusted or set dynamically
        metalness: 1.0,  // Full metalness for a shiny appearance
        roughness: 0.3,  // Lower roughness for a polished look
    });
}

// Load the first car model (eco_rally_car.glb)
loader.load('evo_rally_car.glb', function(gltf) {
    const carModel1 = gltf.scene;

    // Apply shiny material to all parts of the first car
    carModel1.traverse((node) => {
        if (node.isMesh) {
            node.material = createShinyMaterial();
        }
    });

    carModel1.position.set(-2, 0, 0); // Position the first car on the left, Y-axis set to 0
    carModel1.scale.set(0.5, 0.5, 0.5); // Scale the car

    // Add headlights and taillights
    headlight1.position.set(-1.5, 0.5, 1.5); // Adjust position relative to the car
    headlight2.position.set(-1.5, 0.5, -1.5);
    taillight1.position.set(-2.5, 0.5, 1.5);
    taillight2.position.set(-2.5, 0.5, -1.5);

    scene.add(carModel1);
    scene.add(headlight1, headlight2, taillight1, taillight2);
}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

// Load the second car model (free_porsche_911_carrera_4s.glb)
loader.load('free_porsche_911_carrera_4s.glb', function(gltf) {
    const carModel2 = gltf.scene;

    // Apply shiny material to all parts of the second car
    carModel2.traverse((node) => {
        if (node.isMesh) {
            node.material = createShinyMaterial();
        }
    });

    carModel2.position.set(2, 0, 0); // Position the second car on the right, Y-axis set to 0
    carModel2.scale.set(0.5, 0.5, 0.5); // Scale the car

    scene.add(carModel2);
}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

// Load the skyline background (low_poly_night_city_building_skyline.glb)
loader.load('low_poly_night_city_building_skyline.glb', function(gltf) {
    const skyline = gltf.scene;

    skyline.position.set(0, -5, -50); // Position the skyline further back to zoom it out
    skyline.scale.set(30, 30, 30); // Scale the skyline for a larger background

    // Apply a basic texture to make the buildings more realistic
    skyline.traverse((node) => {
        if (node.isMesh) {
            node.material = new THREE.MeshStandardMaterial({
                color: 0xaaaaaa, // Light gray for buildings
                roughness: 0.6, // Slight roughness for realism
                metalness: 0.2, // A bit of metalness for reflective windows
            });
        }
    });

    scene.add(skyline);
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
