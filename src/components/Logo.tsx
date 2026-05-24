import React from "react";

interface LogoProps {
  className?: string;
  isLight?: boolean; // If true, force white styling. If false/undefined, use adaptive currentColor.
}

export default function Logo({ className = "h-8 w-auto", isLight }: LogoProps) {
  // We can use a professional royal blue accent for the top light branches like in the user's image,
  // or use clean adaptive classes for the ultimate Apple monochrome + blue balance!
  const upperColor = isLight ? "rgba(255, 255, 255, 0.45)" : "#0071E3"; // Apple Royal Blue or soft white
  const solidColor = isLight ? "#FFFFFF" : "#1D1D1F"; // Sleek white or rich coal

  return (
    <svg
      viewBox="0 0 120 36"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nacy Logo"
    >
      {/* Text "Nacy" in elegant heavy Apple sans-serif */}
      <text
        x="0"
        y="26"
        fill={solidColor}
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.035em"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
          fontWeight: 900
        }}
      >
        Nacy
      </text>

      {/* Beautiful High-Fidelity Custom SVG Emblem next to the text */}
      <g transform="translate(68, 0)">
        {/* Upper Left Diagonal Line */}
        <line
          x1="18"
          y1="18"
          x2="8"
          y2="12"
          stroke={upperColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Top Vertical Line */}
        <line
          x1="18"
          y1="18"
          x2="18"
          y2="4"
          stroke={upperColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Upper Right Diagonal Line */}
        <line
          x1="18"
          y1="18"
          x2="28"
          y2="12"
          stroke={upperColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Upward pointing Chevron (solid primary) */}
        <path
          d="M 8 24 L 18 18 L 28 24"
          stroke={solidColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Solid bottom support dot/line block */}
        <line
          x1="18"
          y1="27"
          x2="18"
          y2="33"
          stroke={solidColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
