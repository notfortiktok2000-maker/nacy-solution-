/**
 * Gyroscope and Device Tilt interaction utility
 */
export interface Gyrostate {
  tiltX: number; // For RotateX (beta)
  tiltY: number; // For RotateY (gamma)
}

let currentTilt = { tiltX: 0, tiltY: 0 };
let isActive = false;
let hasActiveGyro = false;

if (typeof window !== "undefined") {
  // Add mouse move listener as fallback for standard desktops!
  window.addEventListener("mousemove", (e: MouseEvent) => {
    if (!hasActiveGyro) {
      // Normalize around center screen (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      
      // Let's set tilt parameters (with a comfortable scaling factor)
      // clientY motion tilts around X axis, clientX tilts around Y axis
      currentTilt.tiltX = y * 0.5; // vertical tilt
      currentTilt.tiltY = x * 0.5; // horizontal tilt
    }
  });
}

export async function requestGyroPermission(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const DeviceOrientation = (window as any).DeviceOrientationEvent;

  if (DeviceOrientation && typeof DeviceOrientation.requestPermission === "function") {
    try {
      const permissionState = await DeviceOrientation.requestPermission();
      if (permissionState === "granted") {
        enableGyroscope();
        return true;
      }
    } catch (e) {
      console.warn("DeviceOrientation permission requesting failed:", e);
    }
    return false;
  } else {
    // Android or other systems that do not lock the API
    enableGyroscope();
    return true;
  }
}

function enableGyroscope() {
  if (isActive) return;
  
  window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => {
    // If deviceorientation events are actually firing with values, mark gyro as active
    if (e.beta !== null || e.gamma !== null) {
      hasActiveGyro = true;
    }
    
    // beta: front/back tilt (usually -180 to 180, we target standard 45deg vertical holding neutral)
    // gamma: left/right tilt (usually -90 to 90)
    const beta = e.beta || 0;
    const gamma = e.gamma || 0;

    // Map to normalized range around neutral 45-deg incline for comfortable mobile holding
    const targetX = (beta - 45) * 0.01; 
    const targetY = gamma * 0.01;

    currentTilt.tiltX = targetX;
    currentTilt.tiltY = targetY;
  }, true);

  isActive = true;
}

export function getGyroState(): Gyrostate {
  return currentTilt;
}
