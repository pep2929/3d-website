// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

// Create the renderer with anti-aliasing enabled
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for sharpness
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

// Load the car model and apply textures
loader.load('evo_rally_car.glb', function(gltf) {
    const carModel = gltf.scene;

    // Load the textures
    const textureLoader = new THREE.TextureLoader();
    const brakesTexture = textureLoader.load('textures/brakes.png');
    const fireTexture = textureLoader.load('textures/fire.png');
    const lightEmissionTexture = textureLoader.load('textures/light_emission.png');
    const lightTexture = textureLoader.load('textures/light.png');
    const mitsubishiEmissionTexture = textureLoader.load('textures/mitsubishi_emission.png');
    const mitsubishiGlossyTexture = textureLoader.load('textures/mitsubishi_glossy.png');
    const mitsubishiTexture = textureLoader.load('textures/mitsubishi.png');
    const wheelTexture = textureLoader.load('textures/wheel.png');
    const wheelBumpTexture = textureLoader.load('textures/wheel bump.png');
    const wheelRightTexture = textureLoader.load('textures/wheelright.png');

    // Apply texture filtering for sharpness
    [brakesTexture, fireTexture, lightEmissionTexture, lightTexture,
     mitsubishiEmissionTexture, mitsubishiGlossyTexture, mitsubishiTexture,
     wheelTexture, wheelBumpTexture, wheelRightTexture].forEach(texture => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });

    // Apply textures to the corresponding parts of the model
    carModel.traverse(function(node) {
        if (node.isMesh) {
            switch (node.name) {
                case 'Brakes':
                    node.material.map = brakesTexture;
                    break;
                case 'Fire':
                    node.material.map = fireTexture;
                    break;
                case 'LightEmission':
                    node.material.map = lightEmissionTexture;
                    break;
                case 'Light':
                    node.material.map = lightTexture;
                    break;
                case 'MitsubishiEmission':
                    node.material.map = mitsubishiEmissionTexture;
                    break;
                case 'MitsubishiGlossy':
                    node.material.map = mitsubishiGlossyTexture;
                    break;
                case 'Mitsubishi':
                    node.material.map = mitsubishiTexture;
                    break;
                case 'Wheel':
                    node.material.map = wheelTexture;
                    node.material.bumpMap = wheelBumpTexture;
                    break;
                case 'WheelRight':
                    node.material.map = wheelRightTexture;
                    break;
            }
        }
    });

    carModel.position.set(-2, 0, 0); // Position the car
    carModel.scale.set(0.5, 0.5, 0.5); // Scale the car
    scene.add(carModel);
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
