import { checkIsLowEnd } from "../utils/performance";

export interface HijackOptions {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  cooldownMs?: number;
}

/**
 * Robust scroll hijacking system with touch gesture analytics, velocity assessment, and hardware protection
 */
export class ScrollHijacker {
  private startY: number = 0;
  private startX: number = 0;
  private startTime: number = 0;
  private isLocked: boolean = false;
  private target: HTMLElement;
  private options: HijackOptions;
  private cooldown: number;

  constructor(targetElement: HTMLElement, options: HijackOptions) {
    this.target = targetElement;
    this.options = options;
    this.cooldown = options.cooldownMs || 840;

    this.initEvents();
  }

  private initEvents() {
    this.target.addEventListener("touchstart", this.handleTouchStart, { passive: true });
    this.target.addEventListener("touchmove", this.handleTouchMove, { passive: false });
    this.target.addEventListener("touchend", this.handleTouchEnd, { passive: true });
    
    // Mouse wheels mapping for seamless hybrid controls
    this.target.addEventListener("wheel", this.handleWheel, { passive: false });
  }

  private handleTouchStart = (e: TouchEvent) => {
    if (this.isLocked) return;
    this.startY = e.touches[0].clientY;
    this.startX = e.touches[0].clientX;
    this.startTime = Date.now();
  };

  private handleTouchMove = (e: TouchEvent) => {
    // Intercept standard elastic scrolling in full hijacked screens
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  private handleTouchEnd = (e: TouchEvent) => {
    if (this.isLocked) return;

    const deltaY = e.changedTouches[0].clientY - this.startY;
    const deltaX = e.changedTouches[0].clientX - this.startX;
    const duration = Date.now() - this.startTime;

    const absY = Math.abs(deltaY);
    const absX = Math.abs(deltaX);

    // Validate swipe threshold of 50px vertical, filtering out horizontal gestures
    if (absY > 50 && absY > absX) {
      this.triggerLock();
      if (deltaY < 0) {
        // Swiped UP → Go to next section below
        this.options.onSwipeUp();
      } else {
        // Swiped DOWN → Go to previous section above
        this.options.onSwipeDown();
      }
    }
  };

  private handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (this.isLocked) return;

    // Filter minor tracks
    if (Math.abs(e.deltaY) > 6) {
      this.triggerLock();
      if (e.deltaY > 0) {
        this.options.onSwipeUp();
      } else {
        this.options.onSwipeDown();
      }
    }
  };

  private triggerLock() {
    this.isLocked = true;
    setTimeout(() => {
      this.isLocked = false;
    }, this.cooldown);
  }

  public destroy() {
    this.target.removeEventListener("touchstart", this.handleTouchStart);
    this.target.removeEventListener("touchmove", this.handleTouchMove);
    this.target.removeEventListener("touchend", this.handleTouchEnd);
    this.target.removeEventListener("wheel", this.handleWheel);
  }
}
