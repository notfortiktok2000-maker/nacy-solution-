import * as THREE from "three";
import { checkIsLowEnd } from "../utils/performance";

/**
 * ThreeManager handles global settings, WebGL optimization, and asset disposal
 */
export class ThreeManager {
  static getRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const isLowEnd = checkIsLowEnd();
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isLowEnd, // Turn off antialias on low-end mobile to save performance
      alpha: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false
    });

    // Mobile viewport optimizations
    const maxPixelRatio = isLowEnd ? 1 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    
    return renderer;
  }

  /**
   * Safe clean-up of THREE.js objects, geometries, textures, materials to prevent memory leakage on mobile devices
   */
  static disposeScene(scene: THREE.Scene) {
    scene.traverse((object: any) => {
      if (!object.isMesh) return;

      // Dispose of geometry
      if (object.geometry) {
        object.geometry.dispose();
      }

      // Dispose of materials
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => this.disposeMaterial(material));
        } else {
          this.disposeMaterial(object.material);
        }
      }
    });
  }

  private static disposeMaterial(material: any) {
    material.dispose();
    
    // Dispose of textures if any exist inside materials
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === "object" && typeof value.dispose === "function") {
        value.dispose();
      }
    }
  }
}
