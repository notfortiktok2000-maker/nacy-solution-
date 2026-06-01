/**
 * Dynamic performance evaluation for animations and WebGL
 */
export function checkIsLowEnd(): boolean {
  if (typeof window === "undefined") return true;

  // Check hardware specs if available
  const concurrency = navigator.hardwareConcurrency || 4;
  
  // @ts-ignore
  const memory = navigator.deviceMemory || 4;

  if (concurrency <= 2 || memory <= 2) {
    return true;
  }

  // Check WebGL availability
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return true;
  } catch (e) {
    return true;
  }

  return false;
}
