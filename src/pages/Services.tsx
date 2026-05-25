import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Code, Camera, Video, Check, ArrowRight } from "lucide-react";
import { CurrencyType, CheckoutProduct } from "../types";
import { useTranslation } from "../context/LanguageContext";

export default function Services() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [currency, setCurrency] = useState<CurrencyType>("MAD");
  const [videoVolume, setVideoVolume] = useState<1 | 2 | 3 | 4>(3);

  const getPrice = (type: "web" | "photo" | "video") => {
    if (type === "web") {
      if (currency === "EUR") return "325 €";
      if (currency === "USD") return "350 $";
      return "3,499 MAD";
    }
    if (type === "photo") {
      if (currency === "EUR") return "88 €";
      if (currency === "USD") return "95 $";
      return "950 MAD";
    }
    const rates = {
      1: { MAD: 350, EUR: 33, USD: 35 },
      2: { MAD: 650, EUR: 60, USD: 65 },
      3: { MAD: 900, EUR: 84, USD: 90 },
      4: { MAD: 1100, EUR: 102, USD: 110 }
    };
    const choice = rates[videoVolume];
    if (currency === "EUR") return `${choice.EUR} €`;
    if (currency === "USD") return `${choice.USD} $`;
    return `${choice.MAD.toLocaleString("en-US")} MAD`;
  };

  const getVideoSavings = () => {
    if (videoVolume === 1) return "";
    const originalPrices = videoVolume * 350;
    const currentPrices = { 1: 350, 2: 650, 3: 900, 4: 1100 }[videoVolume];
    const diff = originalPrices - currentPrices;
    if (diff <= 0) return "";
    
    if (currency === "EUR") return t("price.save", { amount: `${(diff * 0.093).toFixed(0)} €` });
    if (currency === "USD") return t("price.save", { amount: `${(diff * 0.1).toFixed(0)} $` });
    return t("price.save", { amount: `${diff} MAD` });
  };

  const handlePurchase = (serviceName: string, amountId: "web" | "photo" | "video", detailAddition?: string) => {
    let numericPrice = 3499;
    if (amountId === "web") {
      numericPrice = currency === "MAD" ? 3499 : currency === "EUR" ? 325 : 350;
    } else if (amountId === "photo") {
      numericPrice = currency === "MAD" ? 950 : currency === "EUR" ? 88 : 95;
    } else {
      const selections = { 1: 350, 2: 650, 3: 900, 4: 1100 };
      const rawMad = selections[videoVolume];
      numericPrice = currency === "MAD" ? rawMad : currency === "EUR" ? Math.round(rawMad * 0.093) : Math.round(rawMad * 0.10);
    }

    const payload: CheckoutProduct = {
      id: amountId,
      name: serviceName,
      price: numericPrice,
      currency: currency,
      tierName: amountId === "video" ? `${videoVolume} ${language === "EN" ? "Product Videos" : "Vidéos de Produits"}` : serviceName,
      details: detailAddition || "Standard Offer"
    };

    sessionStorage.setItem("nacy_selected_product", JSON.stringify(payload));
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] pt-28 pb-20 px-6 md:px-12">
      <Helmet>
        <title>{t("services.metaTitle")}</title>
        <meta name="description" content={t("services.metaDesc")} />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Area */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-poppins font-medium text-xs tracking-widest text-[#0071E3] uppercase block">
            {t("services.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            {t("services.heading")}
          </h1>
          <p className="text-[#6E6E73] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("services.sub")}
          </p>

          <div className="flex justify-center pt-2">
            <div className="inline-flex bg-[#F5F5F7] p-1 rounded-full text-xs font-medium border border-black/5">
              <button
                type="button"
                onClick={() => setCurrency("MAD")}
                className={`py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                  currency === "MAD" ? "bg-black text-white shadow-sm" : "text-[#6E6E73] hover:text-black"
                }`}
              >
                {t("price.switchMad")}
              </button>
              <button
                type="button"
                onClick={() => setCurrency("EUR")}
                className={`py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                  currency === "EUR" ? "bg-black text-white shadow-sm" : "text-[#6E6E73] hover:text-black"
                }`}
              >
                {t("price.switchEur")}
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                  currency === "USD" ? "bg-black text-white shadow-sm" : "text-[#6E6E73] hover:text-black"
                }`}
              >
                {t("price.switchUsd")}
              </button>
            </div>
          </div>
        </div>

        {/* Apple columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          
          {/* Service 1: Custom Web */}
          <div className="glass-card bg-[#F5F5F7]/80 rounded-2xl p-8 flex flex-col justify-between border border-black/5 hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black">
                <Code className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">{t("services.s01")}</span>
                <h2 className="text-2xl font-bold text-[#1D1D1F]">{language === "EN" ? "Website Creation" : "Création de Site Web"}</h2>
              </div>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                {t("services.webDesc")}
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.webF1")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.webF2")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.webF3")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.webF4")}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-black/5 mt-8 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">{t("services.startingFrom")}</span>
                <span className="text-xl font-bold text-[#1D1D1F]">{getPrice("web")}</span>
              </div>
              <button
                type="button"
                onClick={() => handlePurchase(language === "EN" ? "Website Creation" : "Création de Site Web", "web")}
                className="btn-primary"
              >
                <span>{t("services.orderNow")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Service 2: AI Photo shooting */}
          <div className="glass-card bg-[#F5F5F7]/80 rounded-2xl p-8 flex flex-col justify-between border border-black/5 hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black">
                <Camera className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">{t("services.s02")}</span>
                <h2 className="text-2xl font-bold text-[#1D1D1F]">{language === "EN" ? "AI Photo Shooting" : "Séance Photo IA"}</h2>
              </div>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                {t("services.photoDesc")}
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.photoF1")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.photoF2")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.photoF3")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.photoF4")}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-black/5 mt-8 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">{t("services.totalPackage")}</span>
                <span className="text-xl font-bold text-[#1D1D1F]">{getPrice("photo")}</span>
              </div>
              <button
                type="button"
                onClick={() => handlePurchase(language === "EN" ? "AI Photo Shooting" : "Séance Photo IA", "photo", language === "EN" ? "Pack of 45 AI HD Photos" : "Pack de 45 Photos IA HD")}
                className="btn-primary"
              >
                <span>{t("services.bookShoot")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Service 3: Video Production */}
          <div className="glass-card bg-[#F5F5F7]/80 rounded-2xl p-8 flex flex-col justify-between border border-black/5 hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black">
                <Video className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">{t("services.s03")}</span>
                <h2 className="text-2xl font-bold text-[#1D1D1F]">{language === "EN" ? "Video Production" : "Production Vidéo"}</h2>
              </div>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                {t("services.videoDesc")}
              </p>
              
              {/* Volume selector */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] text-[#6E6E73] block font-semibold uppercase tracking-wider">
                  {language === "EN" ? "Select Video Batch Volume" : "Sélectionner le volume d'envoi"}
                </span>
                <div className="grid grid-cols-4 gap-1 bg-black/5 p-0.5 rounded-lg text-center text-[11px]">
                  {[1, 2, 3, 4].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVideoVolume(v as any)}
                      className={`py-1 rounded cursor-pointer ${
                        videoVolume === v ? "bg-black text-white" : "text-[#6E6E73] hover:text-black font-medium"
                      }`}
                    >
                      {v} Video{v > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.videoF1")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.videoF2")}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>{t("services.videoF3")}</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-black/5 mt-8 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">{t("services.totalCost")}</span>
                <span className="text-xl font-bold text-[#1D1D1F]">{getPrice("video")}</span>
                {getVideoSavings() && (
                  <span className="block text-[9px] text-[#00a86b] font-bold tracking-tight">{getVideoSavings()}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handlePurchase(language === "EN" ? "Video Production" : "Production Vidéo", "video", language === "EN" ? `${videoVolume} high resolution videos` : `${videoVolume} vidéos haute résolution`)}
                className="btn-primary"
              >
                <span>{t("services.orderVideos")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Contact CTA */}
        <div className="bg-[#F5F5F7] rounded-3xl p-8 md:p-12 text-center space-y-4 border border-black/5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">{t("services.customHeading")}</h2>
          <p className="text-[#6E6E73] text-sm max-w-xl mx-auto">
            {t("services.customSub")}
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/+212710900502?text=Hi%20NACY%20ST,%20I'm%20interested%20in%20a%20customized%20enterprise%20project."
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
