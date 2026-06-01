import * as THREE from "three";
import { ThreeManager } from "./three-manager";
import { getGyroState } from "../utils/gyroscope";
import { lerp } from "../utils/lerp";

export function initServicesScene(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  const renderer = ThreeManager.getRenderer(canvas);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.z = 4.0;

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambient);

  const light1 = new THREE.DirectionalLight(0x0071e3, 1.3);
  light1.position.set(4, 5, 3);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0x00ffd1, 1.0);
  light2.position.set(-4, -2, 2);
  scene.add(light2);

  // Group to contain crystals
  const crystalGroup = new THREE.Group();
  scene.add(crystalGroup);

  // Glass materials using physical material capabilities of ThreeJS
  const glassMaterialA = new THREE.MeshPhysicalMaterial({
    color: 0x0071e3,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.6,
    thickness: 1.0,
    transparent: true,
    opacity: 0.9,
    clearcoat: 1.0
  });

  const glassMaterialB = new THREE.MeshPhysicalMaterial({
    color: 0x00ffd1,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.5,
    thickness: 0.8,
    transparent: true,
    opacity: 0.85,
    clearcoat: 1.0
  });

  const glassMaterialC = new THREE.MeshPhysicalMaterial({
    color: 0x8200ff,
    metalness: 0.8,
    roughness: 0.15,
    transmission: 0.7,
    thickness: 1.2,
    transparent: true,
    opacity: 0.9,
    clearcoat: 1.0
  });

  // Create crystals
  const geomA = new THREE.OctahedronGeometry(0.65);
  const crystalA = new THREE.Mesh(geomA, glassMaterialA);
  crystalA.position.set(-1.8, 0, 0);

  const geomB = new THREE.TetrahedronGeometry(0.55);
  const crystalB = new THREE.Mesh(geomB, glassMaterialB);
  crystalB.position.set(0, 0.5, -0.5);

  const geomC = new THREE.DodecahedronGeometry(0.45);
  const crystalC = new THREE.Mesh(geomC, glassMaterialC);
  crystalC.position.set(1.8, -0.2, 0);

  crystalGroup.add(crystalA);
  crystalGroup.add(crystalB);
  crystalGroup.add(crystalC);

  // Animation specs
  let animationFrameId: number;
  let time = 0;
  
  // Interactive scroll drift coordinates
  let scrollProgress = 0;
  let targetProgress = 0;

  let gyroX = 0;
  let gyroY = 0;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    time += 0.008;

    // Smoothen inputs
    scrollProgress = lerp(scrollProgress, targetProgress, 0.05);
    
    const gyro = getGyroState();
    gyroX += (gyro.tiltX - gyroX) * 0.05;
    gyroY += (gyro.tiltY - gyroY) * 0.05;

    // Apply gyro tilt to the group holding objects
    crystalGroup.rotation.x = gyroX * 0.5;
    crystalGroup.rotation.y = gyroY * 0.5;

    // Crystal A anim
    crystalA.position.y = Math.sin(time * 0.8) * 0.35;
    crystalA.rotation.x += 0.006;
    crystalA.rotation.y += 0.004;

    // Crystal B anim
    crystalB.position.y = Math.cos(time * 1.0 + 1.2) * 0.3 + 0.5;
    crystalB.rotation.y += 0.008;
    crystalB.rotation.z += 0.003;

    // Crystal C anim
    crystalC.position.y = Math.sin(time * 0.6 + 2.5) * 0.25 - 0.2;
    crystalC.rotation.x += 0.004;
    crystalC.rotation.z += 0.006;

    // Scroll dynamics: drift crystals outwards as scroll progress evolves
    crystalA.position.x = -1.8 - scrollProgress * 1.5;
    crystalC.position.x = 1.8 + scrollProgress * 1.5;
    crystalB.position.z = -0.5 - scrollProgress * 2.0;

    renderer.render(scene, camera);
  }

  animate();

  // Track global touch/scroll triggers
  const updateScrollProgress = (val: number) => {
    targetProgress = val;
  };

  const handleVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  };
  document.addEventListener("visibilitychange", handleVisibility);

  // Window resize handler
  const handleResize = () => {
    if (!canvas.clientWidth || !canvas.clientHeight) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  };
  window.addEventListener("resize", handleResize);

  return {
    updateScrollProgress,
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      ThreeManager.disposeScene(scene);
      renderer.dispose();
    }
  };
}
