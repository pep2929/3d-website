// Create the scene
const scene = new THREE.Scene();

// Create the camera, positioned closer to the cars
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 15); // Adjust the camera position to ensure visibility of the scene

// Create the renderer with anti-aliasing enabled
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for sharpness
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Use sRGB encoding for better color accuracy
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Use ACES tone mapping for a more realistic look
renderer.toneMappingExposure = 1.0; // Adjust exposure if needed
document.body.style.backgroundColor = '#FFB74D'; // Sunset vibe background color
document.getElementById('3d-container').appendChild(renderer.domElement);

// Add ambient and directional lights for overall scene lighting
const ambientLight = new THREE.AmbientLight(0xffc107, 0.8); // Warm sunset light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xff8f00, 0.5); // Directional sunset light
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

// Load the first car model (eco_rally_car.glb)
loader.load('evo_rally_car.glb', function(gltf) {
    const carModel1 = gltf.scene;

    // Apply shiny material to all parts of the first car
    carModel1.traverse((node) => {
        if (node.isMesh) {
            node.material = createShinyMaterial();
        }
    });

    carModel1.position.set(-2, 0, 0); // Position the first car on the same level
    carModel1.scale.set(0.5, 0.5, 0.5); // Scale the car
    scene.add(carModel1);

    // Add lights to the car (headlights)
    const headlight1 = new THREE.PointLight(0xffffff, 1, 10);
    headlight1.position.set(-1.5, 0.5, 1.5); // Adjust position for the car's headlights
    scene.add(headlight1);

    const headlight2 = new THREE.PointLight(0xffffff, 1, 10);
    headlight2.position.set(-1.5, 0.5, -1.5);
    scene.add(headlight2);

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

    carModel2.position.set(2, 0, 0); // Position the second car on the same level
    carModel2.scale.set(0.5, 0.5, 0.5); // Scale the car
    scene.add(carModel2);

    // Add lights to the car (headlights)
    const headlight1 = new THREE.PointLight(0xffffff, 1, 10);
    headlight1.position.set(1.5, 0.5, 1.5); // Adjust position for the car's headlights
    scene.add(headlight1);

    const headlight2 = new THREE.PointLight(0xffffff, 1, 10);
    headlight2.position.set(1.5, 0.5, -1.5);
    scene.add(headlight2);

}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

// Load the skyline background (low_poly_night_city_building_skyline.glb)
loader.load('low_poly_night_city_building_skyline.glb', function(gltf) {
    const skyline = gltf.scene;

    skyline.position.set(0, -5, -100); // Zoom out the skyline background even more
    skyline.scale.set(50, 50, 50); // Further scale the skyline to ensure it's in the background
    scene.add(skyline);
    
    // Add realistic textures to the buildings (example with a basic texture)
    skyline.traverse(function(node) {
        if (node.isMesh) {
            node.material = new THREE.MeshStandardMaterial({
                color: 0x555555,
                metalness: 0.8,
                roughness: 0.4,
            });
        }
    });

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
