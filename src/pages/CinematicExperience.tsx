import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, 
  Compass, 
  RotateCcw, 
  Volume2, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Plus, 
  Maximize2,
  ChevronDown
} from "lucide-react";

import { useTranslation } from "../context/LanguageContext";
import { ScrollHijacker } from "../animations/scroll-hijack";
import { CINEMATIC_SECTIONS, getTransitionForSections, TransitionType } from "../animations/transitions";
import { generateIndicatorDots, getProgressPercentage } from "../animations/scroll-indicator";
import { requestGyroPermission } from "../utils/gyroscope";
import { checkIsLowEnd } from "../utils/performance";

// Import Three.js Scene initializers
import { initHeroScene } from "../three-d/scene-hero";
import { initServicesScene } from "../three-d/scene-services";
import { initStatsScene } from "../three-d/scene-stats";
import { initCtaScene } from "../three-d/scene-cta";

// CSS file
import "../animations/transitions.css";

export default function CinematicExperience() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [activeTransition, setActiveTransition] = useState<TransitionType | null>(null);
  const [isGlitchActive, setIsGlitchActive] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [hasGyroPermission, setHasGyroPermission] = useState(false);
  
  // Pricing state
  const [currency, setCurrency] = useState<"MAD" | "EUR" | "USD">("MAD");

  // Elements refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Canvas refs
  const canvasHeroRef = useRef<HTMLCanvasElement>(null);
  const canvasServicesRef = useRef<HTMLCanvasElement>(null);
  const canvasStatsRef = useRef<HTMLCanvasElement>(null);
  const canvasCtaRef = useRef<HTMLCanvasElement>(null);

  // References to active ThreeJS destroy handlers/API
  const serviceSceneApiRef = useRef<{ updateScrollProgress: (val: number) => void; destroy: () => void } | null>(null);
  const ctaSceneApiRef = useRef<{ assemble: () => void; explode: () => void; setProgress: (val: number) => void; destroy: () => void } | null>(null);

  // Detect hardware on mount
  useEffect(() => {
    setIsLowEnd(checkIsLowEnd());
  }, []);

  // Request gyroscope setup
  const handleEnableGyro = async () => {
    const granted = await requestGyroPermission();
    setHasGyroPermission(granted);
  };

  // Section Change Handler with Transition mapping
  const changeSection = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= CINEMATIC_SECTIONS.length) return;
    
    const transition = getTransitionForSections(currentIndex, nextIndex);
    setPreviousIndex(currentIndex);
    setActiveTransition(transition);
    setCurrentIndex(nextIndex);

    // Specific triggers for glitch animations
    if (transition === "glitch-flash") {
      setIsGlitchActive(true);
      setTimeout(() => setIsGlitchActive(false), 380);
    }
  };

  // Setup scroll hijacking
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const hijacker = new ScrollHijacker(el, {
      onSwipeUp: () => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= CINEMATIC_SECTIONS.length) return prev;
          changeSection(next);
          return next;
        });
      },
      onSwipeDown: () => {
        setCurrentIndex((prev) => {
          const next = prev - 1;
          if (next < 0) return prev;
          changeSection(next);
          return next;
        });
      },
      cooldownMs: isLowEnd ? 900 : 800
    });

    return () => {
      hijacker.destroy();
    };
  }, [currentIndex, isLowEnd]);

  // Keyboard controls helper
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (currentIndex < CINEMATIC_SECTIONS.length - 1) {
          changeSection(currentIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (currentIndex > 0) {
          changeSection(currentIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Mount/Dismount WebGL contexts based on active sections to save mobile memory/CPU budget
  useEffect(() => {
    // 1. Hero 3D Sphere Scene
    let destroyHero: (() => void) | null = null;
    if (currentIndex === 0 && canvasHeroRef.current) {
      destroyHero = initHeroScene(canvasHeroRef.current);
    }

    // 2. Services 3D Crystals Scene
    if (currentIndex === 1 && canvasServicesRef.current && !serviceSceneApiRef.current) {
      serviceSceneApiRef.current = initServicesScene(canvasServicesRef.current);
    } else if (currentIndex !== 1 && serviceSceneApiRef.current) {
      serviceSceneApiRef.current.destroy();
      serviceSceneApiRef.current = null;
    }

    // 3. Stats 3D Morphing Blob
    let destroyStats: (() => void) | null = null;
    if (currentIndex === 3 && canvasStatsRef.current) {
      destroyStats = initStatsScene(canvasStatsRef.current);
    }

    // 4. CTA 3D Particles assembly
    if (currentIndex === 6 && canvasCtaRef.current && !ctaSceneApiRef.current) {
      ctaSceneApiRef.current = initCtaScene(canvasCtaRef.current);
      ctaSceneApiRef.current.assemble();
    } else if (currentIndex !== 6 && ctaSceneApiRef.current) {
      ctaSceneApiRef.current.destroy();
      ctaSceneApiRef.current = null;
    }

    return () => {
      if (destroyHero) destroyHero();
      if (destroyStats) destroyStats();
    };
  }, [currentIndex]);

  // Custom Currency Pricings Helper
  const getProductPrice = (type: "web" | "photo" | "video") => {
    const prices = {
      MAD: { web: "4 900 DH", photo: "1 900 DH", video: "490 DH/u" },
      EUR: { web: "490 €", photo: "190 €", video: "49 €/u" },
      USD: { web: "540 $", photo: "210 $", video: "54 $/u" }
    };
    return prices[currency][type];
  };

  const getActiveLanguageLabel = (secNameEn: string, secNameFr: string) => {
    return language === "FR" ? secNameFr : secNameEn;
  };

  // General trigger WhatsApp Link
  const handleOpenWhatsApp = (customMsg: string) => {
    const formattedMsg = encodeURIComponent(customMsg);
    window.open(`https://wa.me/212710900502?text=${formattedMsg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-black text-[#F5F5F7] min-h-screen relative font-inter overflow-hidden">
      <Helmet>
        <title>NACY SOLUTIONS — Immersive 3D Cinematic Showcase</title>
        <meta name="description" content="Experience high-performance digital solutions with interactive Three.js 3D mobile components and smooth transition animations in Tangier, Morocco." />
      </Helmet>

      {/* FIXED GLASS HEADER STAT PANEL */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 py-3 px-6 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-white hover:text-[#0071E3] transition-colors flex items-center gap-1.5 text-xs font-semibold tracking-wide">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Standard App</span>
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-[10px] font-mono text-[#00ffd1] bg-[#00ffd1]/10 px-2 py-0.5 rounded tracking-widest uppercase font-bold">
            CINEMATIC MODE
          </span>
        </div>

        {/* Gyro controller if available */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={handleEnableGyro}
            className={`text-[10px] font-mono font-bold py-1 px-3 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow ${
              hasGyroPermission 
                ? "bg-[#0071E3]/20 text-[#00ffd1] border border-[#00ffd1]/20" 
                : "bg-white/10 text-white border border-white/5 hover:bg-white/15"
            }`}
          >
            <Compass className={`w-3 h-3 ${hasGyroPermission ? "animate-spin" : ""}`} />
            <span>{hasGyroPermission ? "Tilt Gyro Active" : "Enable Gyro Tilt"}</span>
          </button>
        </div>
      </header>

      {/* MAIN CINEMATIC SWIPE CONTAINER */}
      <div 
        id="scroll-container" 
        ref={containerRef}
        className={`relative w-full h-screen overflow-hidden ${isGlitchActive ? "glitch-flash-active" : ""}`}
      >
        {/* PROGRESS RAIL DOTS ON THE RIGHT */}
        <div id="scroll-progress">
          <div className="progress-line-bg" />
          <div 
            className="progress-line-fill" 
            style={{ height: `${getProgressPercentage(currentIndex)}%` }}
          />
          {generateIndicatorDots(currentIndex).map((dot) => (
            <button
              key={dot.index}
              type="button"
              onClick={() => changeSection(dot.index)}
              className={`progress-dot ${dot.active ? "active" : ""}`}
              aria-label={`Jump to ${dot.section.name}`}
            >
              <span className="progress-dot-tooltip">
                {getActiveLanguageLabel(dot.section.name, dot.section.nameFr)}
              </span>
            </button>
          ))}
        </div>

        {/* SECTION 1: HERO OVERVIEW */}
        <section 
          className={`snap-section ${currentIndex === 0 ? "active" : "inactive"}`}
          style={{ backgroundColor: "#020205" }}
        >
          {/* Canvas placeholder */}
          <canvas ref={canvasHeroRef} className="three-canvas" id="canvas-hero" />

          {/* Core Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 text-center text-white select-none">
            <div className="max-w-2xl space-y-6 pt-12">
              <span className="text-[10px] font-poppins font-semibold text-[#00ffd1] tracking-[0.25em] bg-[#00ffd1]/10 border border-[#00ffd1]/20 px-4 py-1.5 rounded-full uppercase inline-block animate-pulse">
                {t("home.badge")}
              </span>
              
              <h1 className="font-poppins font-extrabold text-4xl sm:text-6xl tracking-tight leading-[1.05] text-[#F8FAFC] drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
                NACY SOLUTIONS
              </h1>
              
              <p className="text-[#CBD5E1] font-inter text-sm md:text-md max-w-lg mx-auto leading-relaxed font-semibold">
                {language === "FR" 
                  ? "Atelier d'excellence numérique. Nous programmons des systèmes haut de gamme et des univers visuels entièrement sur-mesure."
                  : "We craft elite handcoded systems, photorealistic artificial intelligence models, and viral video assets with extreme structural speed."
                }
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
                <button
                  type="button"
                  onClick={() => changeSection(1)}
                  className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white font-semibold text-xs py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-[#0071E3]/25 cursor-pointer active:scale-95 duration-200"
                >
                  <span>{language === "FR" ? "Suivant : Services 3D" : "Next: 3D Services"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Hint mouse / swipe */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-45 animate-bounce">
              <span className="text-[9px] uppercase tracking-[0.15em] font-mono">Swipe Up</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </section>

        {/* SECTION 2: SERVICES SECTION */}
        <section 
          className={`snap-section ${currentIndex === 1 ? "active" : "inactive"}`}
          style={{ backgroundColor: "#05050A" }}
        >
          <canvas ref={canvasServicesRef} className="three-canvas" id="canvas-services" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 max-w-4xl mx-auto select-none">
            <div className="space-y-6 md:space-y-8 pt-12">
              <div className="text-center space-y-1">
                <span className="text-xs font-poppins font-bold text-[#00ffd1] tracking-widest block">SERVICE BATCH MENU</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] font-poppins drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {language === "FR" ? "Ce que nous créons" : "Our Specialized Production Stack"}
                </h2>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Custom Web (index 0) */}
                <div className="bg-[#121226]/85 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4 hover:border-[#0071E3]/55 transition-all duration-300 shadow-xl shadow-black/35">
                  <span className="text-[10px] text-[#0071E3] font-bold font-poppins tracking-wider block">01 / DEV CUSTOM</span>
                  <h3 className="text-lg font-bold text-[#F8FAFC] font-poppins">{language === "FR" ? "Création Site Web" : "Website Creation"}</h3>
                  <p className="text-xs text-[#CBD5E1] font-medium leading-relaxed">{t("services.webDesc")}</p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#CBD5E1]/70 font-semibold">{t("services.startingFrom")}</span>
                    <span className="font-poppins font-bold text-[#00ffd1]">{getProductPrice("web")}</span>
                  </div>
                </div>

                {/* AI Photo (index 1) */}
                <div className="bg-[#121226]/85 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4 hover:border-[#00ffd1]/55 transition-all duration-300 shadow-xl shadow-black/35">
                  <span className="text-[10px] text-[#00ffd1] font-bold font-poppins tracking-wider block">02 / STUDIO IA</span>
                  <h3 className="text-lg font-bold text-[#F8FAFC] font-poppins">{language === "FR" ? "Séance Photo IA" : "AI Photo Shooting"}</h3>
                  <p className="text-xs text-[#CBD5E1] font-medium leading-relaxed">{t("services.photoDesc")}</p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#CBD5E1]/70 font-semibold">{t("services.totalPackage")}</span>
                    <span className="font-poppins font-bold text-[#00ffd1]">{getProductPrice("photo")}</span>
                  </div>
                </div>

                {/* Video prod (index 2) */}
                <div className="bg-[#121226]/85 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4 hover:border-[#8200ff]/55 transition-all duration-300 shadow-xl shadow-black/35">
                  <span className="text-[10px] text-[#c084fc] font-bold font-poppins tracking-wider block">03 / SOCIALS</span>
                  <h3 className="text-lg font-bold text-[#F8FAFC] font-poppins">{language === "FR" ? "Production Vidéo" : "Video Production"}</h3>
                  <p className="text-xs text-[#CBD5E1] font-medium leading-relaxed">{t("services.videoDesc")}</p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#CBD5E1]/70 font-semibold">{t("services.startingFrom")}</span>
                    <span className="font-poppins font-bold text-[#00ffd1]">{getProductPrice("video")}</span>
                  </div>
                </div>

              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => changeSection(2)}
                  className="bg-white/10 text-white font-medium text-xs px-5 py-2.5 rounded-full hover:bg-white/15 transition-all cursor-pointer inline-flex items-center gap-2 border border-white/5"
                >
                  <span>{language === "FR" ? "Continuer vers les Valeurs" : "Continue to Core Values"}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE VALUES SECTION (About) */}
        <section 
          className={`snap-section ${currentIndex === 2 ? "active" : "inactive"}`}
          style={{ backgroundColor: "#020202" }}
        >
          {/* Subtle design matrix background */}
          <div className="absolute inset-0 opacity-[0.03] hero-grid-overlay" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 max-w-4xl mx-auto select-none font-inter">
            <div className="space-y-6 pt-12">
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold text-[#00ffd1] font-poppins tracking-widest block">{t("home.valuesBadge")}</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] font-poppins drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{t("home.valuesHeading")}</h2>
              </div>

              {/* Values list layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                <div className="bg-[#131322]/85 p-6 rounded-2xl border border-white/10 space-y-2 shadow-lg hover:border-[#0071E3]/40 transition-colors duration-300">
                  <h3 className="font-bold text-sm text-[#00ffd1] font-poppins">{t("home.p1Title")}</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-semibold">{t("home.p1Desc")}</p>
                </div>

                <div className="bg-[#131322]/85 p-6 rounded-2xl border border-white/10 space-y-2 shadow-lg hover:border-[#0071E3]/40 transition-colors duration-300">
                  <h3 className="font-bold text-sm text-[#00ffd1] font-poppins">{t("home.p2Title")}</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-semibold">{t("home.p2Desc")}</p>
                </div>

                <div className="bg-[#131322]/85 p-6 rounded-2xl border border-white/10 space-y-2 shadow-lg hover:border-[#0071E3]/40 transition-colors duration-300">
                  <h3 className="font-bold text-sm text-[#00ffd1] font-poppins">{t("home.p3Title")}</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-semibold">{t("home.p3Desc")}</p>
                </div>

                <div className="bg-[#131322]/85 p-6 rounded-2xl border border-white/10 space-y-2 shadow-lg hover:border-[#0071E3]/40 transition-colors duration-300">
                  <h3 className="font-bold text-sm text-[#00ffd1] font-poppins">{t("home.p4Title")}</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-semibold">{t("home.p4Desc")}</p>
                </div>

              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => changeSection(3)}
                  className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white font-semibold text-xs py-2.5 px-6 rounded-full cursor-pointer transition-all shadow-md active:scale-95 duration-200"
                >
                  {language === "FR" ? "Suivant : Télémétrie en temps réel" : "Next: Real-time Telemetry"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: STATS TELEMETRY (Blob) */}
        <section 
          className={`snap-section ${currentIndex === 3 ? "active" : "inactive"}`}
          style={{ backgroundColor: "#060111" }}
        >
          <canvas ref={canvasStatsRef} className="three-canvas" id="canvas-stats" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 max-w-xl mx-auto select-none card-3d-wrapper animate-page-enter">
            <div className="bg-gradient-to-br from-[#121222]/95 via-[#0d0d18]/98 to-[#050510]/100 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 pt-8 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] transform transition-transform duration-500 hover:scale-[1.01]">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold font-poppins text-[#00ffd1] tracking-[0.2em] uppercase block">
                    SYSTEM METRICS CORE
                  </span>
                  <h3 className="font-poppins font-extrabold text-xl sm:text-2xl text-[#F8FAFC] leading-none">
                    {t("home.expertBadge")}
                  </h3>
                </div>
                <span className="bg-[#00ffd1]/10 text-[#00ffd1] border border-[#00ffd1]/20 py-1 px-2.5 rounded text-[10px] font-bold uppercase tracking-widest font-poppins animate-pulse">
                  ACTIVE
                </span>
              </div>

              {/* Bar stats */}
              <div className="space-y-5">
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#CBD5E1] font-poppins font-medium">{language === "FR" ? "Performance Application Web" : "Custom Web App Performance"}</span>
                    <span className="font-mono font-bold text-[#00ffd1] text-xs">98%</span>
                  </div>
                  <div className="h-4 bg-[#0a0a14] rounded-full overflow-hidden border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.85)] relative">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#004BB5] via-[#0071E3] to-[#00ffd1] shadow-[0_0_15px_rgba(0,113,227,0.7),inset_0_-3px_3px_rgba(0,0,0,0.4),inset_0_2px_2px_rgba(255,255,255,0.4)] transition-all duration-1000 ease-out" 
                      style={{ width: "98%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#CBD5E1] font-poppins font-medium">{language === "FR" ? "Précision de Retouche Photo IA" : "AI Retouch Photo Precision"}</span>
                    <span className="font-mono font-bold text-[#00ffd1] text-xs">96%</span>
                  </div>
                  <div className="h-4 bg-[#0a0a14] rounded-full overflow-hidden border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.85)] relative">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#004BB5] via-[#0071E3] to-[#00ffd1] shadow-[0_0_15px_rgba(0,113,227,0.7),inset_0_-3px_3px_rgba(0,0,0,0.4),inset_0_2px_2px_rgba(255,255,255,0.4)] transition-all duration-1000 ease-out" 
                      style={{ width: "96%" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#CBD5E1] font-poppins font-medium">{language === "FR" ? "Augmentation Vidéo CTR" : "Studio Video CTR Lift"}</span>
                    <span className="font-mono font-bold text-[#a855f7] text-xs">93%</span>
                  </div>
                  <div className="h-4 bg-[#0a0a14] rounded-full overflow-hidden border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.85)] relative">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#0071E3] via-[#00ffd1] to-[#8b5cf6] shadow-[0_0_15px_rgba(139,92,246,0.7),inset_0_-3px_3px_rgba(0,0,0,0.4),inset_0_2px_2px_rgba(255,255,255,0.4)] transition-all duration-1000 ease-out" 
                      style={{ width: "93%" }}
                    />
                  </div>
                </div>

              </div>

              <div className="flex justify-between items-center text-[10px] text-[#F8FAFC]/70 pt-2 border-t border-white/5 font-mono">
                <span>MAD / USD / EUR SUPPORT</span>
                <span>SECURED AES-256</span>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => changeSection(4)}
                  className="bg-white/10 hover:bg-white/15 text-white font-medium text-xs px-5 py-2.5 rounded-full cursor-pointer transition-all inline-flex items-center gap-2 border border-white/5"
                >
                  <span>{language === "FR" ? "Suivant : Grille Tarifaire" : "Next: Pricing Matrices"}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: PRICING PLANS */}
        <section 
          className={`snap-section ${currentIndex === 4 ? "active" : "inactive"}`}
          style={{ backgroundColor: "#02050f" }}
        >
          <div className="absolute inset-0 opacity-[0.03] hero-grid-overlay" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 max-w-4xl mx-auto select-none mt-4">
            <div className="space-y-6 pt-12">
              <div className="text-center space-y-1.5">
                <span className="text-xs font-poppins font-bold text-[#00ffd1] uppercase tracking-widest block">{t("price.badge")}</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] font-poppins drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">{t("price.heading")}</h2>
                
                {/* Currency select */}
                <div className="flex justify-center gap-1.5 pt-1">
                  {(["MAD", "EUR", "USD"] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`text-[10px] font-poppins font-bold py-1 px-3 rounded cursor-pointer transition-all ${
                        currency === curr ? "bg-[#0071E3] text-white" : "bg-white/5 text-[#CBD5E1]/60 hover:text-white"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Custom Web (index 0) */}
                <div className="bg-[#131322]/85 backdrop-blur-md rounded-2xl p-5 border border-white/10 relative flex flex-col justify-between shadow-xl">
                  <div className="space-y-3.5">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#CBD5E1]/50 block">{t("price.singleProject")}</span>
                    <h3 className="text-md font-bold text-[#F8FAFC] font-poppins">{language === "FR" ? "Création Site Web" : "Website Creation"}</h3>
                    <div className="py-1">
                      <span className="text-2xl font-bold font-mono text-[#00ffd1]">{getProductPrice("web")}</span>
                    </div>
                    <ul className="space-y-2 text-[11px] text-[#CBD5E1] font-inter font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00ffd1] shrink-0" />
                        <span>Responsive Prototype</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00ffd1] shrink-0" />
                        <span>SEO & Inst. Indexing</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsApp(`Bonjour, je suis intéressé par l'offre Création Site Web à ${getProductPrice("web")}.`)}
                    className="w-full bg-[#0071E3] hover:bg-[#0071E3]/90 text-white font-semibold text-xs py-2.5 px-4 rounded-full mt-4 cursor-pointer text-center transition-colors"
                  >
                    {t("services.orderNow")}
                  </button>
                </div>

                {/* AI Photo (index 1) - Best Popular Card */}
                <div className="bg-[#131322]/95 backdrop-blur-md rounded-2xl p-5 border-2 border-[#00ffd1] relative flex flex-col justify-between shadow-[0_0_25px_rgba(0,255,209,0.15)]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00ffd1] text-black font-extrabold text-[9px] uppercase px-3.5 py-0.5 rounded-full tracking-wider">
                    {t("price.mostPopular")}
                  </div>
                  <div className="space-y-3.5">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#CBD5E1]/50 block">{t("price.commercialAssets")}</span>
                    <h3 className="text-md font-bold text-[#F8FAFC] font-poppins">{language === "FR" ? "Séance Photo IA" : "AI Photo Shooting"}</h3>
                    <div className="py-1">
                      <span className="text-2xl font-bold font-mono text-[#00ffd1]">{getProductPrice("photo")}</span>
                    </div>
                    <ul className="space-y-2 text-[11px] text-[#CBD5E1] font-inter font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00ffd1] shrink-0" />
                        <span>45 HD Studio assets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00ffd1] shrink-0" />
                        <span>Full worldwide copyright</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsApp(`Bonjour, je souhaite commander l'offre Séance Photo IA à ${getProductPrice("photo")}.`)}
                    className="w-full bg-white text-black hover:bg-white/90 font-semibold text-xs py-2 px-4 rounded-full mt-4 cursor-pointer text-center"
                  >
                    {t("services.orderNow")}
                  </button>
                </div>

                {/* Video prod (index 2) */}
                <div className="bg-[#131322]/85 backdrop-blur-md rounded-2xl p-5 border border-white/10 relative flex flex-col justify-between shadow-xl">
                  <div className="space-y-3.5">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#CBD5E1]/50 block">{t("price.degressiveBilling")}</span>
                    <h3 className="text-md font-bold text-[#F8FAFC] font-poppins">{language === "FR" ? "Production Vidéo" : "Video Production"}</h3>
                    <div className="py-1">
                      <span className="text-2xl font-bold font-mono text-[#00ffd1]">{getProductPrice("video")}</span>
                    </div>
                    <ul className="space-y-2 text-[11px] text-[#CBD5E1] font-inter font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00ffd1] shrink-0" />
                        <span>Short-form vertical format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#00ffd1] shrink-0" />
                        <span>Dynamic captions setup</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsApp(`Bonjour, je souhaite réserver l'offre Production Vidéo à ${getProductPrice("video")}.`)}
                    className="w-full bg-[#0071E3] hover:bg-[#0071E3]/90 text-white font-semibold text-xs py-2 px-4 rounded-full mt-4 cursor-pointer text-center transition-colors"
                  >
                    {t("services.orderNow")}
                  </button>
                </div>

              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => changeSection(5)}
                  className="bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-5 py-2.5 rounded-full cursor-pointer transition-all inline-flex items-center gap-2 border border-white/5"
                >
                  <span>{language === "FR" ? "Suivant : FAQ Support" : "Next: FAQ Support"}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ SUPPORT (Accordion styles) */}
        <section 
          className={`snap-section ${currentIndex === 5 ? "active" : "inactive"}`}
          style={{ backgroundColor: "#020205" }}
        >
          <div className="absolute inset-0 opacity-[0.03] hero-grid-overlay" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 max-w-2xl mx-auto select-none">
            <div className="space-y-6 pt-12">
              <div className="text-center space-y-1">
                <span className="text-xs font-poppins font-bold text-[#00ffd1] tracking-widest uppercase block">FAQ QUESTIONS</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] font-poppins drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {language === "FR" ? "Questions Fréquentes" : "Frictionless Intelligence FAQ"}
                </h2>
              </div>

              <div className="space-y-4">
                
                <div className="bg-[#131322]/85 border border-white/10 rounded-2xl p-5 space-y-2 shadow-lg">
                  <h3 className="text-sm font-bold text-[#F8FAFC] font-poppins">
                    {language === "FR" ? "Pourquoi choisir le code sur-mesure (sans template) ?" : "Why custom-coding instead of normal templates (WordPress)?"}
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-semibold">
                    {language === "FR" 
                      ? "Les templates standards ralentissent votre indexation SEO et contiennent des codes inutiles. Nous écrivons des structures légères en TypeScript et React pour garantir 95%+ de performances."
                      : "Standard prebuilt templates are slow, heavy, and rank poorly on Google. We construct lightweight systems handcoded from scratch using modern react states."
                    }
                  </p>
                </div>

                <div className="bg-[#131322]/85 border border-white/10 rounded-2xl p-5 space-y-2 shadow-lg">
                  <h3 className="text-sm font-bold text-[#F8FAFC] font-poppins">
                    {language === "FR" ? "Comment s'organise l'intégration de la séance photo IA ?" : "How does the artificial intelligence photo pipeline work?"}
                  </h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-semibold">
                    {language === "FR" 
                      ? "Vous nous transmettez de simples clichés mobiles de vos produits. Nos algorithmes avancés de stable diffusion modélisent l'environnement 3D, l'éclairage et les décors requis."
                      : "You upload elementary snapshots of your assets. Our customized deep learning models re-engineer lightning, backdrops, and reflections to deliver breathtaking outcomes."
                    }
                  </p>
                </div>

              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => changeSection(6)}
                  className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white font-semibold text-xs py-2.5 px-6 rounded-full cursor-pointer transition-all shadow-md active:scale-95 duration-200"
                >
                  {language === "FR" ? "Suivant : Nous Contacter (Monogramme 3D)" : "Next: Secure Booking (3D Monogram)"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT SECURE BOOKING (Cta / Particles assemble) */}
        <section 
          className={`snap-section ${currentIndex === 6 ? "active" : "inactive"}`}
          style={{ backgroundColor: "#020108" }}
        >
          <canvas ref={canvasCtaRef} className="three-canvas" id="canvas-cta" />

          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 max-w-xl mx-auto select-none">
            <div className="bg-black/75 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center space-y-6 pt-8 shadow-2xl shadow-black/80">
              <span className="text-[10px] font-poppins font-bold text-[#00ffd1] bg-[#00ffd1]/10 border border-[#00ffd1]/20 px-4 py-1.5 rounded-full tracking-widest uppercase inline-block animate-pulse">
                WHATSAPP LIVE BRIEFING
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] leading-tight font-poppins drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                {language === "FR" ? "Démarrons votre projet" : "Request a Free Proposal"}
              </h2>

              <p className="text-xs text-[#CBD5E1] font-semibold max-w-sm mx-auto leading-relaxed">
                {language === "FR"
                  ? "Nous analysons votre cahier des charges et formulons une proposition technique chiffrée sous 24h via discussion directe."
                  : "Say goodbye to complex contracts. Let's form an authentic WhatsApp thread to examine concepts and map deliverables in real-time."
                }
              </p>

              <button
                type="button"
                onClick={() => handleOpenWhatsApp("Bonjour Nacy Solutions, je souhaite obtenir un diagnostic technique gratuit et un devis sur l'expérience 3D !")}
                className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-extrabold text-xs py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#25D366]/20 active:scale-95 duration-200"
              >
                <span>{language === "FR" ? "Discuter sur WhatsApp" : "Discuss on WhatsApp (Open)"}</span>
              </button>

              <div className="flex justify-center items-center gap-2.5 text-[10px] text-[#F8FAFC]/55 pt-2 font-mono">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>DIRECT LINE: +212 7 10 90 05 02</span>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => changeSection(0)}
                  className="bg-white/10 hover:bg-white/15 text-white font-bold text-[10px] py-1.5 px-3.5 rounded-full cursor-pointer border border-white/5 uppercase tracking-widest inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === "FR" ? "Recommencer" : "Restart Overview"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
