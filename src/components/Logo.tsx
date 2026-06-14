import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 36"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nacy Logo"
    >
      {/* Glitch Effect Text */}
      <text
        x="-1"
        y="26"
        fill="#00F0FF" /* Cyan shadow */
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.035em"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontWeight: 900 }}
      >
        Nacy
      </text>
      <text
        x="1.5"
        y="26"
        fill="#FF003C" /* Red/Orange shadow */
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.035em"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontWeight: 900 }}
      >
        Nacy
      </text>
      <text
        x="0"
        y="26"
        fill="#FFFFFF"
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.035em"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontWeight: 900 }}
      >
        Nacy
      </text>

      {/* Asterisk Emblem */}
      <g transform="translate(68, 6)">
        {/* Top line (grey) */}
        <line x1="12" y1="0" x2="12" y2="7" stroke="#A1A1A6" strokeWidth="3.5" strokeLinecap="round" />
        {/* Top right line (grey) */}
        <line x1="12" y1="9" x2="18" y2="4" stroke="#A1A1A6" strokeWidth="3.5" strokeLinecap="round" />
        {/* Top left line (grey) */}
        <line x1="12" y1="9" x2="6" y2="4" stroke="#A1A1A6" strokeWidth="3.5" strokeLinecap="round" />
        
        {/* Bottom vertical line (white) */}
        <line x1="12" y1="12" x2="12" y2="20" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        {/* Bottom right line (white) */}
        <line x1="12" y1="10" x2="19" y2="15" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        {/* Bottom left line (white) */}
        <line x1="12" y1="10" x2="5" y2="15" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
