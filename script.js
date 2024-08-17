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

// Function to create a shiny material
function createShinyMaterial() {
    return new THREE.MeshStandardMaterial({
        color: 0x888888, // Base color, can be adjusted or set dynamically
        metalness: 1.0,  // Full metalness for a shiny appearance
        roughness: 0.3,  // Lower roughness for a polished look
    });
}

// Load the first car model (eco_rally_car.glb)
loader.load('eco_rally_car.glb', function(gltf) {
    const carModel1 = gltf.scene;

    // Apply shiny material and change color to the first car
    carModel1.traverse((node) => {
        if (node.isMesh) {
            node.material = createShinyMaterial();
            node.material.color.setHex(0xff0000); // Change color to red
        }
    });

    carModel1.position.set(2, 0, 0); // Position the first car on the left
    carModel1.scale.set(0.5, 0.5, 0.5); // Scale the car
    scene.add(carModel1);
}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

// Load the second car model (free_porsche_911_carrera_4s.glb)
loader.load('free_porsche_911_carrera_4s.glb', function(gltf) {
    const carModel2 = gltf.scene;

    // Apply shiny material and change color to the second car
    carModel2.traverse((node) => {
        if (node.isMesh) {
            node.material = createShinyMaterial();
            node.material.color.setHex(0x0000ff); // Change color to blue
        }
    });

    carModel2.position.set(-2, 0, 0); // Position the second car on the right
    carModel2.scale.set(0.5, 0.5, 0.5); // Scale the car
    scene.add(carModel2);
}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

// Load the skyline background (low_poly_night_city_building_skyline.glb)
loader.load('low_poly_night_city_building_skyline.glb', function(gltf) {
    const skyline = gltf.scene;

    // Apply realistic textures and properties
    const textureLoader = new THREE.TextureLoader();
    const buildingTexture = textureLoader.load('path_to_your_texture_image.jpg');

    skyline.traverse((node) => {
        if (node.isMesh) {
            node.material = new THREE.MeshStandardMaterial({
                map: buildingTexture,
                roughness: 0.5,
                metalness: 0.3
            });
        }
    });

    skyline.position.set(0, -5, -20); // Position the skyline behind the cars
    skyline.scale.set(5, 5, 5); // Scale the skyline to make it large in the background
    scene.add(skyline);
}, undefined, function(error) {
    console.error('An error occurred loading the GLB file:', error);
});

// Change the color of the cars
loader.load('eco_rally_car.glb', function(gltf) {
    const car = gltf.scene;

    car.traverse((node) => {
        if (node.isMesh) {
            node.material.color.setHex(0xff0000); // Sets the car color to red
        }
    });

    car.position.set(0, 2, 0); // Adjust car position if needed
    scene.add(car);
}, undefined, function(error) {
    console.error('An error occurred loading the car GLB file:', error);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate(); // Start the animation loop

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
