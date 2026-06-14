import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Star, ArrowUpRight, ShieldCheck, Mail, Zap, MessageSquare, Phone, MapPin, Compass } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";
import TiltCard from "../components/TiltCard";
import { initHeroScene } from "../three-d/scene-hero";
import { requestGyroPermission } from "../utils/gyroscope";

// Easing function: easeOutExpo for ultra-smooth count-up physics
function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

// CountUp component for statistical numbers on the landing page
function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progressRatio = Math.min((timestamp - startTime) / duration, 1);
      
      // Apply easeOutExpo
      const easedProgress = easeOutExpo(progressRatio);
      setCount(Math.floor(easedProgress * end));
      
      if (progressRatio < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
        setIsCompleted(true);
      }
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span 
      ref={elementRef} 
      className={`inline-block transition-all duration-500 ${isCompleted ? "animate-number-glow" : ""}`}
    >
      {count}{suffix}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Automatically trigger/enable gyroscope permissions & fallback listeners
    requestGyroPermission().catch((err) => {
      console.warn("Automatic gyro permission initialization warned/failed:", err);
    });

    let destroyScene: (() => void) | null = null;
    if (canvasRef.current) {
      destroyScene = initHeroScene(canvasRef.current);
    }

    return () => {
      if (destroyScene) {
        destroyScene();
      }
    };
  }, []);

  const renderStaggeredWords = (text: string, startDelay: number) => {
    return text.split(/\s+/).map((word, i) => (
      <span
        key={i}
        className="inline-block animate-word-up"
        style={{ animationDelay: `${startDelay + i * 95}ms` }}
      >
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <>
      <Helmet>
        <title>{t("home.metaTitle")}</title>
        <meta name="description" content={t("home.metaDesc")} />
        <meta property="og:title" content={t("home.metaOgTitle")} />
        <meta property="og:description" content={t("home.metaOgDesc")} />
        <meta property="og:url" content="https://nacyst.com" />
      </Helmet>

      {/* Hero Section Container */}
      <section id="hero" className="relative min-h-[90vh] bg-black overflow-hidden pt-36 pb-16 flex flex-col justify-between">
        {/* Animated Gradient Blobs behind hero container */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute inset-0 opacity-[0.03] hero-grid-overlay" />
          
          {/* Blob 1 - Accent Blue glow */}
          <div className="absolute w-[600px] h-[600px] rounded-full top-[-150px] left-[-200px] bg-gradient-to-tr from-[#0071E3]/15 to-[#00c6ff]/10 blur-[90px] animate-drift-blob-1" />
          
          {/* Blob 2 - Soft Teal/Cyan glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bottom-[-100px] right-[-150px] bg-gradient-to-br from-[#0071E3]/20 to-emerald-400/10 blur-[100px] animate-drift-blob-2" />
          
          {/* Blob 3 - Light Purple/Crimson blend */}
          <div className="absolute w-[450px] h-[450px] rounded-full top-[25%] right-[10%] bg-gradient-to-bl from-indigo-500/10 to-[#0071E3]/15 blur-[85px] animate-drift-blob-3" />
        </div>

        {/* Interactive 3D Sphere backdrop from Cinematic Mode with auto-gyro / fallback mouse tilt */}
        <div className="absolute inset-x-0 top-0 bottom-0 z-0 overflow-hidden opacity-[0.25] sm:opacity-[0.35] animate-fadeIn pointer-events-none select-none max-h-[85vh] flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </div>

        {/* Content Section (Centered) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center space-y-8">
          {/* Badge Line with REMOVED "Creative studio" (only Tangier Morocco remains) */}
          <div className="animate-fadeIn">
            <span className="font-poppins font-semibold text-xs text-[#0071E3] uppercase tracking-widest bg-[#121212] px-5 py-2 rounded-full border border-white/10 inline-block">
              {t("home.badge")}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 pt-2">
            <h1 className="font-poppins font-extrabold text-[#F5F5F7] tracking-tight leading-[1.1] text-4xl sm:text-6xl md:text-7xl overflow-hidden py-1">
              <span className="block mb-2 sm:mb-3">
                {renderStaggeredWords(t("home.titlePart1"), 220)}
              </span>
              <span className="text-[#0071E3] block mb-2 sm:mb-3">
                {renderStaggeredWords(t("home.titlePart2"), 580)}
              </span>
              <span className="block">
                {renderStaggeredWords(t("home.titlePart3"), 920)}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="font-inter text-base md:text-lg text-[#A1A1A6] max-w-xl mx-auto animate-fadeIn [animation-delay:1250ms] [animation-duration:0.8s] leading-relaxed">
            {t("home.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fadeIn [animation-delay:1350ms] [animation-duration:0.8s]">
            <Link to="/contact" className="btn-primary w-full sm:w-auto justify-center">
              <span>{t("home.btnStart")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-outline w-full sm:w-auto justify-center">
              <span>{t("home.btnServices")}</span>
            </Link>
          </div>

          {/* INTERACTIVE FLOATING 3D GLASSMORPHISM TRUST PANEL */}
          <div className="pt-12 max-w-2xl mx-auto animate-scaleIn [animation-delay:400ms]">
            <TiltCard className="glass-card bg-[#0A0A0A]/70 border border-white/10 rounded-3xl p-6 md:p-8 text-left select-none animate-float-dashboard">
              
              {/* Trust Certifications inside the beautiful panel */}
              <div className="grid grid-cols-3 gap-4 items-center justify-items-center text-center">
                
                {/* Google */}
                <div className="flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.78-2.4 3.65v3.02h3.87c2.26-2.08 3.58-5.15 3.58-8.52z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.73-2.47 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.27a11.95 11.95 0 0 0 0 10.76l4-3.11z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.62l4 3.11c.95-2.85 3.6-4.98 6.73-4.98z"/>
                    </svg>
                    <span className="font-bold text-[#F5F5F7] text-xs">Google</span>
                  </div>
                  <span className="text-[9px] text-[#86868B] tracking-tight">{t("home.gCertified")}</span>
                </div>

                {/* Coursera */}
                <div className="flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 fill-[#0056D2]" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.94 17.5c-4.32-.41-5.63-2.16-5.63-5.5 0-3.34 1.31-5.09 5.63-5.5.94 0 1.88.04 2.82.08v2.33c-.94-.04-1.88-.08-2.82-.08-2.33 0-2.89.84-2.89 3.17s.56 3.17 2.89 3.17c.94 0 1.88-.04 2.82-.08v2.33c-.94.04-1.88.08-2.82.08z"/>
                    </svg>
                    <span className="font-bold text-[#0056D2] text-xs">coursera</span>
                  </div>
                  <span className="text-[9px] text-[#86868B] tracking-tight">{t("home.eCertified")}</span>
                </div>

                {/* Trustpilot */}
                <div className="flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 fill-[#00B67A]" viewBox="0 0 24 24">
                      <path d="M23.95 9.2c-.08-.24-.26-.43-.5-.48l-7.34-.63-2.85-6.8a.5.5 0 0 0-.92 0L9.49 8.1 2.15 8.7a.5.5 0 0 0-.29.87l5.57 4.8-1.68 7.15c-.06.26.04.53.26.68.22.15.5.15.72 0l6.27-3.83 6.27 3.83a.47.47 0 0 0 .52 0c.2-.14.3-.42.25-.68l-1.68-7.15 5.57-4.8a.49.49 0 0 0 .15-.52z"/>
                    </svg>
                    <span className="font-bold text-[#F5F5F7] text-xs">Trustpilot</span>
                  </div>
                  <span className="text-[9px] text-[#86868B] tracking-tight">{t("home.vIntegration")}</span>
                </div>

              </div>
            </TiltCard>
          </div>
        </div>

        {/* Dynamic numerical stats block directly embedded inside the Hero bounds */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-12 pb-4 reveal-group">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-sm divide-y lg:divide-y-0 lg:divide-x divide-black/5">
            <div className="pt-2 lg:pt-0 stagger-item">
              <div className="font-bold text-3xl md:text-4xl text-[#F5F5F7]">
                <CountUp end={50} suffix="+" />
              </div>
              <p className="text-xs text-[#A1A1A6] mt-1 font-semibold uppercase tracking-wider">{t("home.statsProjects")}</p>
            </div>
            <div className="pt-4 lg:pt-0 stagger-item">
              <div className="font-bold text-3xl md:text-4xl text-[#F5F5F7]">
                <CountUp end={48} suffix="H" />
              </div>
              <p className="text-xs text-[#A1A1A6] mt-1 font-semibold uppercase tracking-wider">{t("home.statsConcept")}</p>
            </div>
            <div className="pt-4 lg:pt-0 stagger-item">
              <div className="font-bold text-3xl md:text-4xl text-[#F5F5F7]">
                <CountUp end={100} suffix="%" />
              </div>
              <p className="text-xs text-[#A1A1A6] mt-1 font-semibold uppercase tracking-wider">{t("home.statsSatisfaction")}</p>
            </div>
            <div className="pt-4 lg:pt-0 stagger-item">
              <div className="font-bold text-3xl md:text-4xl text-[#F5F5F7]">
                <CountUp end={3} />
              </div>
              <p className="text-xs text-[#A1A1A6] mt-1 font-semibold uppercase tracking-wider">{t("home.statsOfferings")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Band (Autoscroll Keywords) */}
      <section className="bg-[#121212] border-y border-white/10 py-4 overflow-hidden relative select-none">
        <div className="w-full flex items-center whitespace-nowrap">
          <div className="flex items-center gap-16 uppercase font-poppins font-bold text-xs tracking-[0.25em] text-[#86868B] animate-marquee" style={{ animationDuration: "25s" }}>
            <span>{t("marquee.website")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.photo")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.video")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.delivery")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.tangier")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.zeroTemplates")}</span>
            <span className="text-[#0071E3]">•</span>

            {/* Duplicate sequence for seamless loop */}
            <span>{t("marquee.website")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.photo")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.video")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.delivery")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.tangier")}</span>
            <span className="text-[#0071E3]">•</span>
            <span>{t("marquee.zeroTemplates")}</span>
            <span className="text-[#0071E3]">•</span>
          </div>
        </div>
      </section>

      {/* Testimonials in clean minimalist Apple cards */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-3 reveal-heading text-left">
            <h2 className="font-poppins text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
              {t("home.testimonialsHeadingTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 reveal-group">
            
            {/* Card 1 */}
            <div className="bg-[#121212] p-8 rounded-2xl flex flex-col justify-between stagger-item border border-white/10 shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.78-2.4 3.65v3.02h3.87c2.26-2.08 3.58-5.15 3.58-8.52z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.73-2.47 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.27a11.95 11.95 0 0 0 0 10.76l4-3.11z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.62l4 3.11c.95-2.85 3.6-4.98 6.73-4.98z"/>
                    </svg>
                    <span className="font-bold text-[#F5F5F7] text-xs">Google</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#F5F5F7] leading-relaxed">
                  "{t("home.t1Text")}"
                </p>
              </div>
              <div className="pt-6 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F7] text-[#0A0A0A] flex items-center justify-center text-xs font-bold shrink-0">AM</div>
                <div>
                  <h4 className="font-semibold text-sm text-[#F5F5F7] leading-none">{t("home.t1Author")}</h4>
                  <span className="text-[11px] text-[#86868B] block mt-1">{t("home.t1Role")}</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#121212] p-8 rounded-2xl flex flex-col justify-between stagger-item border border-white/10 shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 fill-[#00B67A]" viewBox="0 0 24 24">
                      <path d="M23.95 9.2c-.08-.24-.26-.43-.5-.48l-7.34-.63-2.85-6.8a.5.5 0 0 0-.92 0L9.49 8.1 2.15 8.7a.5.5 0 0 0-.29.87l5.57 4.8-1.68 7.15c-.06.26.04.53.26.68.22.15.5.15.72 0l6.27-3.83 6.27 3.83a.47.47 0 0 0 .52 0c.2-.14.3-.42.25-.68l-1.68-7.15 5.57-4.8a.49.49 0 0 0 .15-.52z"/>
                    </svg>
                    <span className="font-bold text-[#F5F5F7] text-xs">Trustpilot</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#F5F5F7] leading-relaxed">
                  "{t("home.t2Text")}"
                </p>
              </div>
              <div className="pt-6 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F7] text-[#0A0A0A] flex items-center justify-center text-xs font-bold shrink-0">SB</div>
                <div>
                  <h4 className="font-semibold text-sm text-[#F5F5F7] leading-none">{t("home.t2Author")}</h4>
                  <span className="text-[11px] text-[#86868B] block mt-1">{t("home.t2Role")}</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#121212] p-8 rounded-2xl flex flex-col justify-between stagger-item border border-white/10 shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0071E3]" />
                    <span className="font-bold text-[#F5F5F7] text-xs">Verified Client</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#F5F5F7] leading-relaxed">
                  "{t("home.t3Text")}"
                </p>
              </div>
              <div className="pt-6 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F7] text-[#0A0A0A] flex items-center justify-center text-xs font-bold shrink-0">KH</div>
                <div>
                  <h4 className="font-semibold text-sm text-[#F5F5F7] leading-none">{t("home.t3Author")}</h4>
                  <span className="text-[11px] text-[#86868B] block mt-1">
                    {t("home.t3Role")}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 px-6 md:px-12 bg-black border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-3 reveal-heading text-left">
            <h2 className="font-poppins text-3xl md:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
              {t("home.portfolioHeading")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-group h-auto md:h-[600px]">
            {/* Left Column - Tall Card */}
            <div className="group relative bg-[#121212] border border-white/10 rounded-2xl overflow-hidden h-[400px] md:h-full cursor-pointer stagger-item shadow-sm transition-transform duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/10 to-black/80 pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-white/10 backdrop-blur-md text-white border border-white/10 py-1.5 px-3 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                  {t("home.portfolioT1Badge")}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <h3 className="text-white font-bold text-2xl mb-1">{t("home.portfolioT1Title")}</h3>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{t("home.portfolioT1Sub")}</p>
              </div>
            </div>

            {/* Right Column - Two shorter stacked cards */}
            <div className="grid grid-rows-2 gap-6 h-[400px] md:h-full">
              {/* Card 1 */}
              <div className="group relative bg-[#121212] border border-white/10 rounded-2xl overflow-hidden cursor-pointer stagger-item shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/10 to-black/80 pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-white/10 backdrop-blur-md text-white border border-white/10 py-1.5 px-3 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                    {t("home.portfolioT2Badge")}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-white font-bold text-xl mb-1">{t("home.portfolioT2Title")}</h3>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{t("home.portfolioT2Sub")}</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group relative bg-[#121212] border border-white/10 rounded-2xl overflow-hidden cursor-pointer stagger-item shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/10 to-black/80 pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-white/10 backdrop-blur-md text-white border border-white/10 py-1.5 px-3 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                    {t("home.portfolioT3Badge")}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-white font-bold text-xl mb-1">{t("home.portfolioT3Title")}</h3>
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{t("home.portfolioT3Sub")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 reveal-group">
            <p className="text-sm text-[#86868B] font-inter">{t("home.portfolioAvailable")}</p>
          </div>
        </div>
      </section>



    </>
  );
}
