// Three.js 3D Bear Setup
let scene, camera, renderer, bear;

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfff5f7);
    scene.fog = new THREE.Fog(0xfff5f7, 100, 500);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff69b4, 0.5);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Create cute 3D bear
    createCute3DBear();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Mouse move effect
    document.addEventListener('mousemove', onMouseMove);

    // Start animation loop
    animate();
}

function createCute3DBear() {
    bear = new THREE.Group();

    // Material
    const brownMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B6F47,
        roughness: 0.7,
        metalness: 0.1
    });

    const innerMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4A574,
        roughness: 0.8
    });

    // Body (main)
    const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const body = new THREE.Mesh(bodyGeometry, brownMaterial);
    body.scale.set(1, 1.3, 0.8);
    body.position.y = -0.3;
    body.castShadow = true;
    bear.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.9, 32, 32);
    const head = new THREE.Mesh(headGeometry, brownMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    bear.add(head);

    // Left Ear
    const earGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const leftEar = new THREE.Mesh(earGeometry, brownMaterial);
    leftEar.position.set(-0.6, 2.4, 0.2);
    leftEar.castShadow = true;
    bear.add(leftEar);

    // Right Ear
    const rightEar = new THREE.Mesh(earGeometry, brownMaterial);
    rightEar.position.set(0.6, 2.4, 0.2);
    rightEar.castShadow = true;
    bear.add(rightEar);

    // Left Eye
    const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const leftEye = new THREE.Mesh(eyeGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
    leftEye.position.set(-0.35, 1.85, 0.85);
    leftEye.castShadow = true;
    bear.add(leftEye);

    // Right Eye
    const rightEye = new THREE.Mesh(eyeGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
    rightEye.position.set(0.35, 1.85, 0.85);
    rightEye.castShadow = true;
    bear.add(rightEye);

    // Nose
    const noseGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const nose = new THREE.Mesh(noseGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
    nose.position.set(0, 1.4, 0.95);
    nose.castShadow = true;
    bear.add(nose);

    // Left Arm
    const armGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    armGeometry.scale(0.7, 1.2, 0.7);
    const leftArm = new THREE.Mesh(armGeometry, brownMaterial);
    leftArm.position.set(-1.1, 0.3, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    bear.add(leftArm);

    // Right Arm
    const rightArm = new THREE.Mesh(armGeometry, brownMaterial);
    rightArm.position.set(1.1, 0.3, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    bear.add(rightArm);

    // Left Foot
    const footGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    footGeometry.scale(0.8, 0.6, 1);
    const leftFoot = new THREE.Mesh(footGeometry, brownMaterial);
    leftFoot.position.set(-0.5, -1.4, 0.3);
    leftFoot.castShadow = true;
    bear.add(leftFoot);

    // Right Foot
    const rightFoot = new THREE.Mesh(footGeometry, brownMaterial);
    rightFoot.position.set(0.5, -1.4, 0.3);
    rightFoot.castShadow = true;
    bear.add(rightFoot);

    // Belly/Heart Area
    const bellyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const belly = new THREE.Mesh(bellyGeometry, innerMaterial);
    belly.position.y = -0.2;
    belly.position.z = 0.7;
    belly.scale.set(0.6, 0.8, 0.3);
    belly.castShadow = true;
    bear.add(belly);

    // Heart on chest
    const heartGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const heart = new THREE.Mesh(heartGeometry, new THREE.MeshStandardMaterial({ color: 0xff69b4 }));
    heart.position.set(0, 0.2, 1.2);
    heart.castShadow = true;
    bear.add(heart);

    scene.add(bear);
}

function animate() {
    requestAnimationFrame(animate);

    // Cute floating animation
    if (bear) {
        bear.position.y = Math.sin(Date.now() * 0.001) * 0.5;
        bear.rotation.y += 0.005;
        
        // Gentle bobbing
        bear.scale.set(
            1 + Math.sin(Date.now() * 0.002) * 0.05,
            1 + Math.cos(Date.now() * 0.002) * 0.05,
            1
        );
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function onMouseMove(event) {
    if (!bear) return;

    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    bear.rotation.x = y * 0.3;
    bear.rotation.z = x * 0.2;
}

// Get elements
const ahBtn = document.getElementById('ahBtn');
const laBtn = document.getElementById('laBtn');
const message = document.querySelector('.message');
const mainText = document.querySelector('.main-text');

let isGrowing = false;
let growthInterval = null;
let currentScale = 1;
let laClicked = false;

// AH Button - Show message and create hearts
ahBtn.addEventListener('click', () => {
    // Stop growing
    if (growthInterval) {
        clearInterval(growthInterval);
        isGrowing = false;
        growthInterval = null;
    }

    // Reset to normal size
    currentScale = 1;
    ahBtn.style.transform = 'scale(1)';

    // Change question text
    mainText.textContent = 'ta ana kenbghik a lhbila dyali ❤️';

    // Show message
    message.textContent = 'waxh mtéakda waxh mtéahda ghadi nskhaf';
    message.classList.add('show');

    // Bounce bear
    if (bear) {
        bear.scale.set(1.1, 0.9, 1);
        setTimeout(() => {
            bear.scale.set(1, 1, 1);
        }, 200);
    }

    // Create heart particles (more hearts!)
    for (let i = 0; i < 12; i++) {
        createHeartParticle();
    }

    // Hide message after 3 seconds
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);

    // Disable LA button permanently
    laBtn.disabled = true;
    laBtn.style.opacity = '0.5';
    laBtn.style.cursor = 'not-allowed';
    laBtn.removeEventListener('mouseenter', escapeButton);
    laBtn.removeEventListener('touchstart', escapeButton);
});

// Create heart particle
function createHeartParticle() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.textContent = '💕';

    const rect = ahBtn.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + 'px';
    heart.style.top = rect.top + 'px';

    const angle = (Math.random() * Math.PI * 2);
    const distance = 80 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    heart.style.setProperty('--x', x + 'px');
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
}

// LA Button - Escape on hover with messages
let isEscaping = false;

laBtn.addEventListener('mouseenter', escapeButton);
laBtn.addEventListener('touchstart', escapeButton);

function escapeButton(e) {
    if (isEscaping || laBtn.disabled) return;
    isEscaping = true;

    // Show first message
    message.textContent = 'wax mt2akda';
    message.classList.add('show');

    // Start growing AH button
    startAhGrowth();

    // Random position on screen
    const randomX = Math.random() * (window.innerWidth - laBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - laBtn.offsetHeight);

    laBtn.style.position = 'fixed';
    laBtn.style.left = randomX + 'px';
    laBtn.style.top = randomY + 'px';
    laBtn.style.transition = 'all 0.3s ease';
    laBtn.style.zIndex = '1000';

    // After 1.5 seconds, show second message
    setTimeout(() => {
        message.textContent = 'wax mt2akda ghadi nskhaf';
    }, 1500);

    // Reset after button moves away
    setTimeout(() => {
        isEscaping = false;
    }, 400);

    // Return to original position after 3 seconds
    setTimeout(() => {
        laBtn.style.position = 'relative';
        laBtn.style.left = 'auto';
        laBtn.style.top = 'auto';
        laBtn.style.zIndex = 'auto';
        message.classList.remove('show');
    }, 3000);
}

// Start AH button growth
function startAhGrowth() {
    if (isGrowing) return;
    isGrowing = true;
    currentScale = 1;

    growthInterval = setInterval(() => {
        currentScale += 0.08;
        ahBtn.style.transform = `scale(${currentScale})`;
        ahBtn.style.boxShadow = `0 8px 30px rgba(255, 105, 180, ${0.4 + currentScale * 0.2})`;
    }, 100);
}

// Initialize Three.js when page loads
window.addEventListener('load', initThreeJS);
