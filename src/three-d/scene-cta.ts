import * as THREE from "three";
import { ThreeManager } from "./three-manager";
import { lerp } from "../utils/lerp";
import { checkIsLowEnd } from "../utils/performance";

export function initCtaScene(canvas: HTMLCanvasElement) {
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
  camera.position.z = 4.0;

  // Group
  const particleGroup = new THREE.Group();
  scene.add(particleGroup);

  const particleCount = isLow ? 350 : 800;
  const geometry = new THREE.BufferGeometry();
  
  const currentPositions = new Float32Array(particleCount * 3);
  const targetPositions = new Float32Array(particleCount * 3);
  const explodedPositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0x0071e3); // Blue
  const color2 = new THREE.Color(0x00ffd1); // Cyan
  const color3 = new THREE.Color(0x8200ff); // Purple

  // Sample discrete mathematical points to form an elegant 3D Monogram letter "N"
  const generateNPoint = (t: number): THREE.Vector3 => {
    const p = new THREE.Vector3();
    const strand = t % 3;
    const progress = Math.floor(t / 3) / (particleCount / 3);

    if (strand === 0) {
      // Left vertical post: x = -0.8
      p.x = -0.8;
      p.y = progress * 2.2 - 1.1;
      p.z = (Math.random() - 0.5) * 0.3;
    } else if (strand === 1) {
      // Diagonal cross member: x from -0.8 to 0.8
      p.x = -0.8 + progress * 1.6;
      p.y = 1.1 - progress * 2.2;
      p.z = (Math.random() - 0.5) * 0.3;
    } else {
      // Right vertical post: x = 0.8
      p.x = 0.8;
      p.y = progress * 2.2 - 1.1;
      p.z = (Math.random() - 0.5) * 0.3;
    }
    
    // Slight random organic distortion
    p.x += (Math.random() - 0.5) * 0.08;
    p.y += (Math.random() - 0.5) * 0.08;
    p.z += (Math.random() - 0.5) * 0.08;

    return p;
  };

  for (let i = 0; i < particleCount; i++) {
    // Monogram N Target coordinates
    const targetPoint = generateNPoint(i);
    targetPositions[i * 3] = targetPoint.x;
    targetPositions[i * 3 + 1] = targetPoint.y;
    targetPositions[i * 3 + 2] = targetPoint.z;

    // Dispersed / Random Explosion coordinate states
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 3.0 + Math.random() * 5.0;

    explodedPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    explodedPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    explodedPositions[i * 3 + 2] = radius * Math.cos(phi);

    // Initial state: exploded random outer stars
    currentPositions[i * 3] = explodedPositions[i * 3];
    currentPositions[i * 3 + 1] = explodedPositions[i * 3 + 1];
    currentPositions[i * 3 + 2] = explodedPositions[i * 3 + 2];

    // Colors mapping
    let activeColor = color1;
    if (i % 3 === 1) activeColor = color2;
    if (i % 3 === 2) activeColor = color3;

    colors[i * 3] = activeColor.r;
    colors[i * 3 + 1] = activeColor.g;
    colors[i * 3 + 2] = activeColor.b;
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(currentPositions, 3)
  );
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Circular glow particle sprite
  const material = new THREE.PointsMaterial({
    size: isLow ? 0.05 : 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particlePoints = new THREE.Points(geometry, material);
  particleGroup.add(particlePoints);

  // Transition controller
  let transitionProgress = 0; // 0 = Exploded, 1 = Assembled N
  let targetProgress = 0.4; // Starts semi-dispersed

  let animationFrameId: number;
  let time = 0;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    time += 0.005;

    // Self Rotate
    particleGroup.rotation.y = Math.sin(time * 0.4) * 0.45;
    particleGroup.rotation.x = Math.cos(time * 0.3) * 0.2;

    // Smoothen assembly transition with speed control
    transitionProgress = lerp(transitionProgress, targetProgress, 0.06);

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const array = pos.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      const tx = targetPositions[idx];
      const ty = targetPositions[idx + 1];
      const tz = targetPositions[idx + 2];

      const ex = explodedPositions[idx];
      const ey = explodedPositions[idx + 1];
      const ez = explodedPositions[idx + 2];

      // Dynamic Lerp transition coordinates
      const currentX = lerp(ex, tx, transitionProgress);
      const currentY = lerp(ey, ty, transitionProgress);
      const currentZ = lerp(ez, tz, transitionProgress);

      // Micro flotation floating waves
      const floatFactor = Math.sin(time * 2.5 + i * 0.2) * 0.015;

      array[idx] = currentX + floatFactor;
      array[idx + 1] = currentY + floatFactor;
      array[idx + 2] = currentZ;
    }

    pos.needsUpdate = true;
    renderer.render(scene, camera);
  }

  animate();

  // Control APIs
  const assemble = () => {
    targetProgress = 1.0;
  };

  const explode = () => {
    targetProgress = 0.0;
  };

  const setProgress = (val: number) => {
    targetProgress = Math.min(Math.max(val, 0), 1);
  };

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

  return {
    assemble,
    explode,
    setProgress,
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      ThreeManager.disposeScene(scene);
      renderer.dispose();
    }
  };
}
