import * as THREE from "three";
import { ThreeManager } from "./three-manager";
import { getGyroState } from "../utils/gyroscope";
import { checkIsLowEnd } from "../utils/performance";

export function initHeroScene(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  const renderer = ThreeManager.getRenderer(canvas);
  const isLow = checkIsLowEnd();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.z = 3.5;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directLight1 = new THREE.DirectionalLight(0x0071e3, 1.2);
  directLight1.position.set(5, 5, 5);
  scene.add(directLight1);

  const directLight2 = new THREE.DirectionalLight(0x00ffd1, 0.8);
  directLight2.position.set(-5, -5, 5);
  scene.add(directLight2);

  const sphereGroup = new THREE.Group();
  scene.add(sphereGroup);

  // Main Geometry: Icosahedron Sphere with low poly
  // Low-poly on mobile (1, 2) vs high-poly on desktop (1, 4)
  const detail = isLow ? 2 : 4;
  const geometry = new THREE.IcosahedronGeometry(1.2, detail);
  
  const material = new THREE.MeshStandardMaterial({
    color: 0x0071e3,
    wireframe: true,
    emissive: 0x000000,
    roughness: 0.5,
    metalness: 0.5,
    transparent: true,
    opacity: 0.18
  });

  const mesh = new THREE.Mesh(geometry, material);
  sphereGroup.add(mesh);

  // Particle halo around sphere
  const particleCount = isLow ? 180 : 500;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const initialPositions: number[] = [];

  for (let i = 0; i < particleCount; i++) {
    // Distribute particles in a spherical shell
    const r = 1.6 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    initialPositions.push(x, y, z);
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x0071e3,
    size: isLow ? 0.035 : 0.025,
    transparent: true,
    opacity: 0.22,
    blending: THREE.NormalBlending
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Animation handling
  let animationFrameId: number;
  let time = 0;
  
  let currentTiltX = 0;
  let currentTiltY = 0;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    time += 0.004;

    // Self Rotation
    mesh.rotation.y += 0.003;
    mesh.rotation.x += 0.001;

    // Gyroscope action / fallbacks
    const gyro = getGyroState();
    
    // Smooth Lerp filters
    currentTiltX += (gyro.tiltX - currentTiltX) * 0.05;
    currentTiltY += (gyro.tiltY - currentTiltY) * 0.05;

    // Apply tilt rotations smoothly to the core group
    sphereGroup.rotation.x = currentTiltX;
    sphereGroup.rotation.y = currentTiltY;

    // Floating animation of particles
    const positionsAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const x0 = initialPositions[idx];
      const y0 = initialPositions[idx + 1];
      const z0 = initialPositions[idx + 2];

      const offset = i * 0.1;
      // Staggered sine oscillation
      positionsAttr.setX(idx, x0 + Math.sin(time + offset) * 0.1);
      positionsAttr.setY(idx, y0 + Math.cos(time + offset) * 0.1);
      positionsAttr.setZ(idx, z0 + Math.sin(time * 0.5 + offset) * 0.1);
    }
    positionsAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // Visibility page tracking to stop processing offscreen
  const handleVisibilityChange = () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Resize listener
  const handleResize = () => {
    if (!canvas.clientWidth || !canvas.clientHeight) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  };
  window.addEventListener("resize", handleResize);

  // Return teardown callback
  return () => {
    cancelAnimationFrame(animationFrameId);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("resize", handleResize);
    ThreeManager.disposeScene(scene);
    renderer.dispose();
  };
}
