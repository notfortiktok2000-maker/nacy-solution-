import React, { useState, useEffect, useRef } from "react";

interface ProgressBarProps {
  label: string;
  percentage: number;
  suffix?: string;
}

export default function AnimatedProgressBar({ label, percentage, suffix = "%" }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimStarted, setHasAnimStarted] = useState(false);

  useEffect(() => {
    // Media query to check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWidth(percentage);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimStarted) {
          setHasAnimStarted(true);
          // Wait slightly for a smooth roll in
          setTimeout(() => {
            setWidth(percentage);
          }, 200);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [percentage, hasAnimStarted]);

  return (
    <div ref={elementRef} className="space-y-2 w-full text-left">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-[#1D1D1F] uppercase tracking-wider">{label}</span>
        <span className="text-[#0071E3] font-mono">{width}{suffix}</span>
      </div>
      
      {/* Outer track */}
      <div className="relative w-full h-3 bg-black/[0.04] rounded-full overflow-hidden border border-black/[0.02]">
        {/* Inner fill */}
        <div
          style={{
            width: `${width}%`,
            transition: "width 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="h-full bg-[#0071E3] rounded-full relative overflow-hidden progress-bar-shine"
        />
      </div>
    </div>
  );
}
