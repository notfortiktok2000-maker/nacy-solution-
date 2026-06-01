# Nacy Solutions — Mobile 3D Cinematic Scroll System

A high-performance, mobile-optimized, cinematic "Section Hijack" scroll system and interactive WebGL 3D shapes built seamlessly in TypeScript, Three.js, and Tailwind CSS.

---

## 📂 File Architecture Delivered

Your requested cinematic files have been fully integrated into your React workspace:

```bash
/src/
├── animations/
│   ├── scroll-hijack.ts      # Tactile touch gesture tracker, lock timer, and swipes
│   ├── transitions.ts        # Section definitions, transitions (Slice, Wipe, Glitch)
│   ├── scroll-indicator.ts   # Progress navigation dot rails and tooltips
│   └── transitions.css       # Hardware-accelerated transformation CSS keyframes
├── three-d/
│   ├── scene-hero.ts         # Hero rotating Sphere and 500 space-halo particles
│   ├── scene-services.ts     # Glass-morphic floating crystals (transmission refraction)
│   ├── scene-stats.ts        # Dynamic multi-frequency harmonic deformation Blob
│   ├── scene-cta.ts          # Magnetic logo particle assembly & disperse monogram "N"
│   └── three-manager.ts      # WebGL renderer instantiator, mobile optimizer, and scrap disposer
└── utils/
    ├── performance.ts        # Concurrency & WebGL fallback degradation
    ├── gyroscope.ts          # Device tilt orientation events handler for iOS & Android
    └── lerp.ts               # Linear interpolation math utility
```

---

## 🛠️ Developer Customization Guide

### 1. How to Add a New Section with a New Transition
1. Open `/src/animations/transitions.ts`.
2. Insert your new section metadata into the `CINEMATIC_SECTIONS` list:
   ```typescript
   {
     id: "my-custom-section",
     name: "My Custom Title",
     nameFr: "Mon Titre Personnalisé",
     transition: "smooth-fade" // Assign your transition type
   }
   ```
3. To declare a completely new transition (e.g., `elastic-scale`), register it inside the `TransitionType` in `/src/animations/transitions.ts`:
   ```typescript
   export type TransitionType = "slice-up" | "depth-push" | "liquid-wipe" | "fold-down" | "glitch-flash" | "smooth-fade" | "elastic-scale";
   ```
4. Define the animations inside `/src/animations/transitions.css`:
   ```css
   .snap-section.entering-elastic-scale {
     transform: scale(0);
   }
   .snap-section.entering-elastic-scale.active {
     transform: scale(1);
     transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
   }
   ```

### 2. How to Change 3D Shape Colors of the WebGL Scenes
Open the respective scene files under `/src/three-d/*` and substitute the hex numbers as follows:

* **Hero Rotating Sphere** (`/src/three-d/scene-hero.ts`):
  Modify the light colors or material settings:
  ```typescript
  // Change primary color
  const material = new THREE.MeshStandardMaterial({
    color: 0x0071E3, // Brand Primary Hex
    emissive: 0x011D3D, // Brand dark glow base
  });
  // Change particle colors
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00FFD1, // Brand Accent Hex
  });
  ```

* **Floating Crystals** (`/src/three-d/scene-services.ts`):
  Change the glass color settings:
  ```typescript
  const glassMaterialA = new THREE.MeshPhysicalMaterial({ color: 0x0071E3 });
  const glassMaterialB = new THREE.MeshPhysicalMaterial({ color: 0x00FFD1 });
  ```

* **Morphing Blob** (`/src/three-d/scene-stats.ts`):
  Customize the color heights of the simplex-simulated gradient:
  ```typescript
  // Shift HSL offsets to alter color schemes (e.g., violet, crimson, cyan)
  colorObj.setHSL(0.55 + y * 0.1, 0.95, 0.5 + z * 0.1);
  ```

* **Exploding Particle Monogram "N"** (`/src/three-d/scene-cta.ts`):
  Change particle color layers:
  ```typescript
  const color1 = new THREE.Color(0x0071E3); // Color A
  const color2 = new THREE.Color(0x00FFD1); // Color B
  ```

### 3. How to Disable Specific Effects/Animations per Section
To run a section with standard cross-dissolving transitions on lower devices or entirely disable its specific WebGL canvas:
* In `/src/animations/transitions.ts`, simply toggle its transitional setting to `"smooth-fade"`.
* To completely turn off 3D background rendering for a fast loading frame, omit the `<canvas>` instance or do not mount its corresponding WebGL loader in `/src/pages/CinematicExperience.tsx`.

---

## ⚡ Mobile Performance Budgets & Rules

* **Antialiasing Off**: When low-end devices (`navigator.hardwareConcurrency <= 2`) are detected, antialiasing is set to `false` and sphere subdivisions are automatically reduced by half.
* **Canvas Disposal**: Canvases are initialized only when the specific section becomes live, and are fully released with garbage collection once hidden, preserving mobile battery life.
* **Coalesced Updates**: Vertices in the Morphing Blob are computed every 2 frames rather than 1 on lower-end CPUs to maintain a steady 60fps refresh rate.
