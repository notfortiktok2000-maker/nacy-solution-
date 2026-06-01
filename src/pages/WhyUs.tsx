import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Heart, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function WhyUs() {
  const { t } = useTranslation();
  
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      id: 0,
      icon: <Zap className="w-5 h-5" />,
      title: t("why.card1Title"),
      desc: t("why.card1Desc"),
    },
    {
      id: 1,
      icon: <ShieldCheck className="w-5 h-5" />,
      title: t("why.card2Title"),
      desc: t("why.card2Desc"),
    },
    {
      id: 2,
      icon: <MessageSquare className="w-5 h-5" />,
      title: t("why.card3Title"),
      desc: t("why.card3Desc"),
    },
    {
      id: 3,
      icon: <Sparkles className="w-5 h-5" />,
      title: t("why.card4Title"),
      desc: t("why.card4Desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] pt-28 pb-20 px-6 md:px-12">
      <Helmet>
        <title>{t("why.metaTitle")}</title>
        <meta name="description" content={t("why.metaDesc")} />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto reveal-heading is-visible">
          <span className="font-poppins font-semibold text-xs tracking-widest text-[#0071E3] uppercase block">
            {t("why.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1D1D1F] font-poppins">
            {t("why.heading")}
          </h1>
          <p className="text-[#6E6E73] text-base leading-relaxed font-inter font-medium max-w-lg mx-auto">
            {t("why.sub")}
          </p>
        </div>

        {/* 4 Core Pillars Grid with 3D wrapper perspective layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 card-3d-wrapper">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              ref={(el) => { cardRefs.current[pillar.id] = el; }}
              data-index={pillar.id}
              className={`card-3d-item bg-[#F5F5F7]/85 p-8 rounded-3xl border border-black/5 flex gap-5 select-none ${
                visibleCards[pillar.id] ? "is-visible" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3] shadow-sm transform transition-transform duration-300 group-hover:scale-110">
                {pillar.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-[#1D1D1F] font-poppins">{pillar.title}</h3>
                <p className="text-[#6E6E73] text-sm leading-relaxed font-inter font-medium">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Table or Quote Block */}
        <div className="border border-black/10 rounded-2xl p-8 bg-white space-y-6 reveal-element">
          <div className="border-l-4 border-black pl-5">
            <p className="text-xl italic text-[#1D1D1F] font-semibold leading-relaxed">
              {t("why.quote")}
            </p>
            <span className="block mt-3 text-xs font-bold uppercase tracking-wider text-[#6E6E73]">
              {t("why.quoteAuthor")}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/contact"
            className="btn-primary inline-flex gap-2 items-center"
          >
            <span>{t("why.btn")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
