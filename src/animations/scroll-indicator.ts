import { SectionMetadata, CINEMATIC_SECTIONS } from "./transitions";

/**
 * Scroll Indicator manager which tracks active sections and triggers dot node changes
 */
export interface IndicatorDot {
  index: number;
  section: SectionMetadata;
  active: boolean;
}

export function generateIndicatorDots(currentIndex: number): IndicatorDot[] {
  return CINEMATIC_SECTIONS.map((section, idx) => ({
    index: idx,
    section,
    active: idx === currentIndex
  }));
}

export function getProgressPercentage(currentIndex: number): number {
  if (CINEMATIC_SECTIONS.length <= 1) return 0;
  return (currentIndex / (CINEMATIC_SECTIONS.length - 1)) * 100;
}
