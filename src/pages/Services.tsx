import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Database, Globe, Video, Check, ArrowRight } from "lucide-react";
import { CurrencyType, CheckoutProduct } from "../types";
import { useTranslation } from "../context/LanguageContext";
import TiltCard from "../components/TiltCard";

export default function Services() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
const handlePurchase = (serviceName: string, amountId: "web" | "photo" | "video", detailAddition?: string) => {
    const payload: CheckoutProduct = {
      id: amountId,
      name: serviceName,
      price: 0,
      currency: "MAD",
      tierName: serviceName,
      details: detailAddition || "Premium Content"
    };

    sessionStorage.setItem("nacy_selected_product", JSON.stringify(payload));
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-black text-[#F5F5F7] pt-28 pb-20 px-6 md:px-12">
      <Helmet>
        <title>{t("services.metaTitle")}</title>
        <meta name="description" content={t("services.metaDesc")} />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Area */}
        <div className="text-center space-y-4 max-w-3xl mx-auto reveal-heading">
          <span className="font-poppins font-medium text-xs tracking-widest text-[#0071E3] uppercase block">
            {t("services.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
            {t("services.heading")}
          </h1>
          <p className="text-[#A1A1A6] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("services.sub")}
          </p>
        </div>

        {/* Apple columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 reveal-group">
          
          {/* Service 1: Custom Web */}
          <TiltCard className="h-full">
            <div className="glass-card bg-[#121212]/80 rounded-2xl p-8 flex flex-col justify-between border border-white/10 hover:bg-[#0A0A0A] hover:shadow-xl transition-all duration-300 stagger-item h-full">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                  <Database className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">{t("services.s01")}</span>
                  <h2 className="text-2xl font-bold text-[#F5F5F7]">{t("nav.serviceWeb")}</h2>
                </div>
                <p className="text-[#A1A1A6] text-sm leading-relaxed">
                  {t("services.webDesc")}
                </p>
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.webF1")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.webF2")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.webF3")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.webF4")}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/10 mt-8">
                <button
                  type="button"
                  onClick={() => handlePurchase(t("nav.serviceWeb"), "web")}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span>{t("services.orderNow")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TiltCard>

          {/* Service 2: AI Photo shooting */}
          <TiltCard className="h-full">
            <div className="glass-card bg-[#121212]/80 rounded-2xl p-8 flex flex-col justify-between border border-white/10 hover:bg-[#0A0A0A] hover:shadow-xl transition-all duration-300 stagger-item h-full">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">{t("services.s02")}</span>
                  <h2 className="text-2xl font-bold text-[#F5F5F7]">{t("nav.servicePhoto")}</h2>
                </div>
                <p className="text-[#A1A1A6] text-sm leading-relaxed">
                  {t("services.photoDesc")}
                </p>
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.photoF1")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.photoF2")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.photoF3")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.photoF4")}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/10 mt-8">
                <button
                  type="button"
                  onClick={() => handlePurchase(t("nav.servicePhoto"), "photo")}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span>{t("services.orderNow")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TiltCard>

          {/* Service 3: Video Production */}
          <TiltCard className="h-full">
            <div className="glass-card bg-[#121212]/80 rounded-2xl p-8 flex flex-col justify-between border border-white/10 hover:bg-[#0A0A0A] hover:shadow-xl transition-all duration-300 stagger-item h-full">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                  <Video className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">{t("services.s03")}</span>
                  <h2 className="text-2xl font-bold text-[#F5F5F7]">{t("nav.serviceVideo")}</h2>
                </div>
                <p className="text-[#A1A1A6] text-sm leading-relaxed">
                  {t("services.videoDesc")}
                </p>

                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.videoF1")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.videoF2")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#A1A1A6]">
                    <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                    <span>{t("services.videoF3")}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/10 mt-8">
                <button
                  type="button"
                  onClick={() => handlePurchase(t("nav.serviceVideo"), "video")}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span>{t("services.orderNow")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TiltCard>

        </div>

        {/* Contact CTA */}
        <div className="bg-[#121212] rounded-3xl p-8 md:p-12 text-center space-y-4 border border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F5F5F7]">{t("services.customHeading")}</h2>
          <p className="text-[#A1A1A6] text-sm max-w-xl mx-auto">
            {t("services.customSub")}
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/212710900502?text=Hi%20NACY%20ST,%20I'm%20interested%20in%20a%20customized%20enterprise%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex animate-pulse"
            >
              <span>{t("services.customBtn")}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
