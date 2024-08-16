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

// Function to create a shiny material
function createShinyMaterial() {
    return new THREE.MeshStandardMaterial({
        color: 0x888888, // Base color, can be adjusted or set dynamically
        metalness: 1.0,  // Full metalness for a shiny appearance
        roughness: 0.3,  // Lower roughness for a polished look
    });
}

// Function to add headlights to a car
function addHeadlights(carModel) {
    const headlightGeometry = new THREE.SphereGeometry(0.1, 16, 8);
    const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const headlight1 = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlight1.position.set(0.5, 0.2, 2); // Adjust positions as needed
    carModel.add(headlight1);

    const headlight2 = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlight2.position.set(-0.5, 0.2, 2); // Adjust positions as needed
    carModel.add(headlight2);
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

    carModel1.position.set(-2, 2, 0); // Position the first car at Y-axis 2
    carModel1.scale.set(0.5, 0.5, 0.5); // Scale the car
    addHeadlights(carModel1); // Add headlights to the car
    scene.add(carModel1);
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

    carModel2.position.set(2, 2, 0); // Position the second car at Y-axis 2
    carModel2.scale.set(0.5, 0.5, 0.5); // Scale the car
    addHeadlights(carModel2); // Add headlights to the car
    scene.add(carModel2);
}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

// Load the skyline background (low_poly_night_city_building_skyline.glb)
loader.load('low_poly_night_city_building_skyline.glb', function(gltf) {
    const skyline = gltf.scene;

    skyline.position.set(0, -5, -50); // Position the skyline further back and adjust Y-axis
    skyline.scale.set(20, 20, 20); // Scale the skyline for a larger background
    skyline.traverse((node) => {
        if (node.isMesh) {
            node.material = new THREE.MeshStandardMaterial({
                color: 0x555555,  // Darker color for a night-time effect
                metalness: 0.7,
                roughness: 0.4,
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
