import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Star, ArrowUpRight, ShieldCheck, Mail, Zap, MessageSquare, Phone, MapPin } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

// CountUp component for statistical numbers on the landing page
function CountUp({ end, suffix = "", duration = 1200 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

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
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Home() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  // Trigger animations
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal-element");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeUp");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.05 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

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
      <section id="hero" className="relative min-h-[90vh] bg-white overflow-hidden pt-36 pb-16 flex flex-col justify-between">
        {/* Apple subtle line grid background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03] hero-grid-overlay" />
          <div className="absolute w-[500px] h-[500px] top-[-100px] left-[-150px] bg-[radial-gradient(circle,rgba(0,113,227,0.03)_0%,transparent_70%)] rounded-full animate-orb1" />
        </div>

        {/* Content Section (Centered) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center space-y-8">
          {/* Badge Line with REMOVED "Creative studio" (only Tangier Morocco remains) */}
          <div className="animate-fadeIn">
            <span className="font-poppins font-semibold text-xs text-[#0071E3] uppercase tracking-widest bg-[#F5F5F7] px-5 py-2 rounded-full border border-black/5 inline-block">
              {t("home.badge")}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 pt-2">
            <h1 className="font-poppins font-extrabold text-[#1D1D1F] tracking-tight leading-[1.05] animate-fadeUp text-5xl sm:text-6xl md:text-7xl">
              {t("home.titlePart1")} <br />
              <span className="text-[#0071E3]">{t("home.titlePart2")}</span> <br />
              {t("home.titlePart3")}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="font-inter text-base md:text-lg text-[#6E6E73] max-w-xl mx-auto animate-fadeUp [animation-delay:200ms] leading-relaxed">
            {t("home.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fadeUp [animation-delay:300ms]">
            <Link to="/contact" className="btn-primary w-full sm:w-auto justify-center">
              <span>{t("home.btnStart")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-outline w-full sm:w-auto justify-center">
              <span>{t("home.btnServices")}</span>
            </Link>
          </div>

          {/* RENDERED EXPERT PARTS DIRECTLY IN PLACE OF THE DECORATIVE PRODUCTION ENGINE DASHBOARD MOCK */}
          <div className="pt-12 max-w-3xl mx-auto animate-scaleIn [animation-delay:400ms]">
            <div className="bg-[#F5F5F7] border border-black/5 rounded-2xl p-6 md:p-8 space-y-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#86868B] font-bold block">
                {t("home.expertBadge")}
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center pt-2">
                
                {/* Google */}
                <div className="flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.78-2.4 3.65v3.02h3.87c2.26-2.08 3.58-5.15 3.58-8.52z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.73-2.47 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.27a11.95 11.95 0 0 0 0 10.76l4-3.11z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.62l4 3.11c.95-2.85 3.6-4.98 6.73-4.98z"/>
                    </svg>
                    <span className="font-bold text-[#1D1D1F] text-sm">Google</span>
                  </div>
                  <span className="text-[10px] text-[#86868B]">{t("home.gCertified")}</span>
                </div>

                {/* Coursera */}
                <div className="flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-[#0056D2]" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1.94 17.5c-4.32-.41-5.63-2.16-5.63-5.5 0-3.34 1.31-5.09 5.63-5.5.94 0 1.88.04 2.82.08v2.33c-.94-.04-1.88-.08-2.82-.08-2.33 0-2.89.84-2.89 3.17s.56 3.17 2.89 3.17c.94 0 1.88-.04 2.82-.08v2.33c-.94.04-1.88.08-2.82.08z"/>
                    </svg>
                    <span className="font-bold text-[#0056D2] text-sm">coursera</span>
                  </div>
                  <span className="text-[10px] text-[#86868B]">{t("home.eCertified")}</span>
                </div>

                {/* Trustpilot */}
                <div className="flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4.5 h-4.5 fill-[#00B67A]" viewBox="0 0 24 24">
                      <path d="M23.95 9.2c-.08-.24-.26-.43-.5-.48l-7.34-.63-2.85-6.8a.5.5 0 0 0-.92 0L9.49 8.1 2.15 8.7a.5.5 0 0 0-.29.87l5.57 4.8-1.68 7.15c-.06.26.04.53.26.68.22.15.5.15.72 0l6.27-3.83 6.27 3.83a.47.47 0 0 0 .52 0c.2-.14.3-.42.25-.68l-1.68-7.15 5.57-4.8a.49.49 0 0 0 .15-.52z"/>
                    </svg>
                    <span className="font-bold text-[#1D1D1F] text-sm">Trustpilot</span>
                  </div>
                  <span className="text-[10px] text-[#86868B]">{t("home.vIntegration")}</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Dynamic numerical stats block directly embedded inside the Hero bounds */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-12 pb-4">
          <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-sm divide-y lg:divide-y-0 lg:divide-x divide-black/5">
            <div className="pt-2 lg:pt-0">
              <div className="font-bold text-3xl md:text-4xl text-[#1D1D1F]">
                <CountUp end={50} suffix="+" />
              </div>
              <p className="text-xs text-[#6E6E73] mt-1 font-semibold uppercase tracking-wider">{t("home.statsProjects")}</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="font-bold text-3xl md:text-4xl text-[#1D1D1F]">
                <CountUp end={48} suffix="H" />
              </div>
              <p className="text-xs text-[#6E6E73] mt-1 font-semibold uppercase tracking-wider">{t("home.statsConcept")}</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="font-bold text-3xl md:text-4xl text-[#1D1D1F]">
                <CountUp end={100} suffix="%" />
              </div>
              <p className="text-xs text-[#6E6E73] mt-1 font-semibold uppercase tracking-wider">{t("home.statsSatisfaction")}</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <div className="font-bold text-3xl md:text-4xl text-[#1D1D1F]">
                <CountUp end={3} />
              </div>
              <p className="text-xs text-[#6E6E73] mt-1 font-semibold uppercase tracking-wider">{t("home.statsOfferings")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Band (Autoscroll Keywords) */}
      <section className="bg-[#F5F5F7] border-y border-black/5 py-4 overflow-hidden relative select-none">
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

      {/* Core values block / Apple section */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-black/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071E3]">{t("home.valuesBadge")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F]">{t("home.valuesHeading")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">{t("home.p1Title")}</h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">
                {t("home.p1Desc")}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">{t("home.p2Title")}</h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">
                {t("home.p2Desc")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">{t("home.p3Title")}</h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">
                {t("home.p3Desc")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">{t("home.p4Title")}</h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">
                {t("home.p4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials in clean minimalist Apple cards */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F5F7] border-b border-black/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-[#0071E3] tracking-wider block uppercase">
              {t("home.testimonialsBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F]">
              {t("home.testimonialsHeading")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            
            {/* Card 1 */}
            <div className="bg-white border border-black/5 p-8 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-sm text-[#6E6E73] italic leading-relaxed">
                  {t("home.t1Text")}
                </p>
              </div>
              <div className="pt-6 border-t border-black/5 mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-xs font-bold">AM</div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1D1D1F] leading-none">{t("home.t1Author")}</h4>
                  <span className="text-[11px] text-[#86868B] block mt-1">{t("home.t1Role")}</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-black/5 p-8 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-sm text-[#6E6E73] italic leading-relaxed">
                  {t("home.t2Text")}
                </p>
              </div>
              <div className="pt-6 border-t border-black/5 mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-xs font-bold">SB</div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1D1D1F] leading-none">{t("home.t2Author")}</h4>
                  <span className="text-[11px] text-[#86868B] block mt-1">{t("home.t2Role")}</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-black/5 p-8 rounded-2xl flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-sm text-[#6E6E73] italic leading-relaxed">
                  {t("home.t3Text")}
                </p>
              </div>
              <div className="pt-6 border-t border-black/5 mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-xs font-bold">KH</div>
                <div>
                  <h4 className="font-semibold text-sm text-[#1D1D1F] leading-none">{t("home.t3Author")}</h4>
                  <span className="text-[11px] text-[#86868B] block mt-1">
                    {language === "EN" ? "E-Commerce Merchant" : "Commerçant E-Commerce"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
