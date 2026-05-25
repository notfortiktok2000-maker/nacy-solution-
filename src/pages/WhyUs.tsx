import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Heart, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] pt-28 pb-20 px-6 md:px-12">
      <Helmet>
        <title>{t("why.metaTitle")}</title>
        <meta name="description" content={t("why.metaDesc")} />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto reveal-heading">
          <span className="font-poppins font-medium text-xs tracking-widest text-[#0071E3] uppercase block">
            {t("why.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            {t("why.heading")}
          </h1>
          <p className="text-[#6E6E73] text-base leading-relaxed">
            {t("why.sub")}
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 reveal-group">
          
          <div className="glass-card bg-[#F5F5F7]/85 p-8 rounded-2xl border border-black/5 flex gap-5 stagger-item">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3]">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">{t("why.card1Title")}</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                {t("why.card1Desc")}
              </p>
            </div>
          </div>

          <div className="glass-card bg-[#F5F5F7]/85 p-8 rounded-2xl border border-black/5 flex gap-5 stagger-item">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">{t("why.card2Title")}</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                {t("why.card2Desc")}
              </p>
            </div>
          </div>

          <div className="glass-card bg-[#F5F5F7]/85 p-8 rounded-2xl border border-black/5 flex gap-5 stagger-item">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">{t("why.card3Title")}</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                {t("why.card3Desc")}
              </p>
            </div>
          </div>

          <div className="glass-card bg-[#F5F5F7]/85 p-8 rounded-2xl border border-black/5 flex gap-5 stagger-item">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">{t("why.card4Title")}</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                {t("why.card4Desc")}
              </p>
            </div>
          </div>

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
