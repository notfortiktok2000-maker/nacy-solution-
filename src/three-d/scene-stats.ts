import * as THREE from "three";
import { ThreeManager } from "./three-manager";
import { getGyroState } from "../utils/gyroscope";
import { checkIsLowEnd } from "../utils/performance";

export function initStatsScene(canvas: HTMLCanvasElement) {
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
  camera.position.z = 3.2;

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0x0071e3, 1.4);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x00ffd1, 1.1);
  fillLight.position.set(-5, -5, 5);
  scene.add(fillLight);

  const pinkLight = new THREE.PointLight(0x8200ff, 1.5, 10);
  pinkLight.position.set(0, 3, 2);
  scene.add(pinkLight);

  // Geometry: Lower segment count on mobile to preserve 60fps budget
  const segs = isLow ? 14 : 32;
  const geometry = new THREE.SphereGeometry(1.0, segs, segs);
  
  // Custom Vertex Colors for gorgeous gradient simulation
  const positionAttr = geometry.attributes.position;
  const colors: number[] = [];
  const colorObj = new THREE.Color();
  
  for (let i = 0; i < positionAttr.count; i++) {
    const x = positionAttr.getX(i);
    const y = positionAttr.getY(i);
    const z = positionAttr.getZ(i);

    // Color gradient based on vertex height and distance
    colorObj.setHSL(0.55 + y * 0.1, 0.95, 0.5 + z * 0.1);
    colors.push(colorObj.r, colorObj.g, colorObj.b);
  }
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.15,
    metalness: 0.85,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.95
  });

  const blobMesh = new THREE.Mesh(geometry, material);
  scene.add(blobMesh);

  // Store original vert positions
  const originalPositions = new Float32Array(positionAttr.array);

  // Animation metrics
  let animationFrameId: number;
  let time = 0;
  let frameCount = 0;

  let gyroX = 0;
  let gyroY = 0;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    time += isLow ? 0.009 : 0.015;
    frameCount++;

    // Smooth gyro inputs
    const gyro = getGyroState();
    gyroX += (gyro.tiltX - gyroX) * 0.05;
    gyroY += (gyro.tiltY - gyroY) * 0.05;

    blobMesh.rotation.y += 0.004 + gyroY * 0.1;
    blobMesh.rotation.x += 0.002 + gyroX * 0.1;

    // Update noise deform and buffer
    // Mobile optimization: only update vert deforms every 2 frames on low end devices
    if (!isLow || frameCount % 2 === 0) {
      const pos = geometry.attributes.position;
      const count = pos.count;
      
      for (let i = 0; i < count; i++) {
        // Read original coordinates
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        const z = originalPositions[i * 3 + 2];

        // Three-dimensional harmonic trigonometric wave deformer
        const wave1 = Math.sin(x * 2.5 + time) * 0.15;
        const wave2 = Math.cos(y * 3.0 + time * 1.2) * 0.12;
        const wave3 = Math.sin(z * 2.0 + time * 0.8) * 0.10;

        const factor = 1.0 + wave1 + wave2 + wave3;

        pos.setX(i, x * factor);
        pos.setY(i, y * factor);
        pos.setZ(i, z * factor);
      }
      
      pos.needsUpdate = true;
      geometry.computeVertexNormals();
    }

    renderer.render(scene, camera);
  }

  animate();

  const handleVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  };
  document.addEventListener("visibilitychange", handleVisibility);

  const handleResize = () => {
    if (!canvas.clientWidth || !canvas.clientHeight) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  };
  window.addEventListener("resize", handleResize);

  return () => {
    cancelAnimationFrame(animationFrameId);
    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("resize", handleResize);
    ThreeManager.disposeScene(scene);
    renderer.dispose();
  };
}
