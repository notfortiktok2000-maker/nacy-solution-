/**
 * Transition mapper determining the entering/leaving animation rules per section transition
 */
export type TransitionType = 
  | "slice-up" 
  | "depth-push" 
  | "liquid-wipe" 
  | "fold-down" 
  | "glitch-flash" 
  | "smooth-fade";

export interface SectionMetadata {
  id: string;
  name: string;
  nameFr: string;
  transition: TransitionType;
}

export const CINEMATIC_SECTIONS: SectionMetadata[] = [
  { id: "hero", name: "Hero Overview", nameFr: "Aperçu de l'Héro", transition: "slice-up" },
  { id: "services", name: "3D Custom Services", nameFr: "Services Personnalisés 3D", transition: "depth-push" },
  { id: "about", name: "Apple Core Values", nameFr: "Valeurs Fondamentales Apple", transition: "liquid-wipe" },
  { id: "stats", name: "Realtime Telemetry Stats", nameFr: "Télémetrie en Temps Réel", transition: "fold-down" },
  { id: "pricing", name: "Bespoke Pricing Plan", nameFr: "Grille Tarifaire Sur-Mesure", transition: "glitch-flash" },
  { id: "faq", name: "Frictionless FAQ Support", nameFr: "Questions Fréquentes", transition: "smooth-fade" },
  { id: "contact", name: "Instant WhatsApp Contact", nameFr: "Contact WhatsApp Instantané", transition: "smooth-fade" }
];

export function getTransitionForSections(fromIndex: number, toIndex: number): TransitionType {
  // Use the transition declared on the starting section
  const section = CINEMATIC_SECTIONS[fromIndex];
  return section ? section.transition : "smooth-fade";
}
