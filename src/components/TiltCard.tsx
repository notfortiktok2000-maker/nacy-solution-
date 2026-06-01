import React, { useState, useRef } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "", ...props }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Check media query to disable on mobile touch devices
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates centered at zero (-0.5 to 0.5)
    const px = x / width;
    const py = y / height;

    // Convert to degrees (max tilt: 8 degrees as requested by vertomediaglobal audit)
    const tiltX = (0.5 - py) * 16;  // py=0 -> tilt=8deg, py=1 -> tilt=-8deg
    const tiltY = (px - 0.5) * 16;  // px=0 -> tilt=-8deg, px=1 -> tilt=8deg

    // Glare coordinates in percentages
    const gx = px * 100;
    const gy = py * 100;

    setCoords({
      rotateX: tiltX,
      rotateY: tiltY,
      glareX: gx,
      glareY: gy,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setCoords({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false
    });
  };

  const style: React.CSSProperties = {
    transform: `perspective(800px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg)`,
    transition: coords.isHovered ? "none" : "transform 0.5s ease",
    transformStyle: "preserve-3d",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative rounded-3xl ${className}`}
      {...props}
    >
      {/* 3D Content wrapper */}
      <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>

      {/* Moving glare overlay */}
      {coords.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay z-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${coords.glareX}% ${coords.glareY}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}
