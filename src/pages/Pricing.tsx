import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { CurrencyType, CheckoutProduct } from "../types";
import { useTranslation } from "../context/LanguageContext";

export default function Pricing() {
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
        <title>{t("price.metaTitle")}</title>
        <meta name="description" content={t("price.metaDesc")} />
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Title Switcher */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-poppins font-medium text-xs tracking-widest text-[#0071E3] uppercase block">
            {t("price.badge")}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-[#1D1D1F]">
            {t("price.heading")}
          </h1>
          <p className="text-[#6E6E73] text-sm leading-relaxed max-w-xl mx-auto">
            {t("price.sub")}
          </p>

          {/* Currency Switcher custom rounded block */}
          <div className="relative inline-flex bg-[#F5F5F7] border border-black/5 p-1 rounded-full text-xs font-semibold mt-2">
            <button
              type="button"
              onClick={() => setCurrency("MAD")}
              className={`py-2 px-6 rounded-full transition-all cursor-pointer ${
                currency === "MAD" ? "bg-black text-white shadow" : "text-[#6E6E73] hover:text-black"
              }`}
            >
              {t("price.switchMad")}
            </button>
            <button
              type="button"
              onClick={() => setCurrency("EUR")}
              className={`py-2 px-6 rounded-full transition-all cursor-pointer ${
                currency === "EUR" ? "bg-black text-white shadow" : "text-[#6E6E73] hover:text-black"
              }`}
            >
              {t("price.switchEur")}
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`py-2 px-6 rounded-full transition-all cursor-pointer ${
                currency === "USD" ? "bg-black text-white shadow" : "text-[#6E6E73] hover:text-black"
              }`}
            >
              {t("price.switchUsd")}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          
          {/* Card 1: Custom Web */}
          <div className="bg-[#F5F5F7] p-8 rounded-3xl flex flex-col justify-between border border-black/5 hover:bg-white hover:shadow-2xl transition-all duration-300">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-1">{t("price.singleProject")}</span>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">{language === "EN" ? "Website Creation" : "Création de Site Web"}</h3>
              </div>
              <div className="py-2">
                <span className="text-4xl font-bold text-[#1D1D1F]">{getPrice("web")}</span>
                <span className="text-xs text-[#6E6E73] block mt-1.5 font-inter">{t("price.webSub")}</span>
              </div>
              <div className="h-px bg-black/5" />
              <ul className="space-y-3.5 text-xs text-[#6E6E73] font-inter">
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.webF1")}</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.webF2")}</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.webF3")}</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.webF4")}</span>
                </li>
              </ul>
            </div>
            
            <button
              type="button"
              onClick={() => handlePurchase(language === "EN" ? "Website Creation" : "Création de Site Web", "web")}
              className="w-full btn-outline justify-center text-xs py-3.5 mt-8 hover:!bg-black hover:!text-white hover:!border-black"
            >
              {t("price.webBtn")}
            </button>
          </div>

          {/* Card 2: AI Photo shooting */}
          <div className="bg-[#F5F5F7] p-8 rounded-3xl flex flex-col justify-between border-2 border-black relative hover:bg-white hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white font-semibold text-[10px] uppercase py-1 px-4 rounded-full tracking-wider">
              {t("price.mostPopular")}
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-1">{t("price.commercialAssets")}</span>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">{language === "EN" ? "AI Photo Shooting" : "Séance Photo IA"}</h3>
              </div>
              <div className="py-2">
                <span className="text-4xl font-bold text-[#1D1D1F]">{getPrice("photo")}</span>
                <span className="text-xs text-[#6E6E73] block mt-1.5 font-inter">{t("price.photoSub")}</span>
              </div>
              <div className="h-px bg-black/5" />
              <ul className="space-y-3.5 text-xs text-[#6E6E73] font-inter">
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.photoF1")}</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.photoF2")}</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.photoF3")}</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.photoF4")}</span>
                </li>
              </ul>
            </div>
            
            <button
              type="button"
              onClick={() => handlePurchase(language === "EN" ? "AI Photo Shooting" : "Séance Photo IA", "photo", language === "EN" ? "Complete pack of 45 HD Photos" : "Pack complet de 45 Photos HD")}
              className="w-full btn-primary justify-center text-xs py-3.5 mt-8"
            >
              {t("price.photoBtn")}
            </button>
          </div>

          {/* Card 3: Video Production */}
          <div className="bg-[#F5F5F7] p-8 rounded-3xl flex flex-col justify-between border border-black/5 hover:bg-white hover:shadow-2xl transition-all duration-300">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-1">{t("price.degressiveBilling")}</span>
                <h3 className="text-2xl font-bold text-[#1D1D1F]">{language === "EN" ? "Video Production" : "Production Vidée"}</h3>
              </div>
              
              {/* Batch volume switch */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-[#6E6E73] block font-semibold uppercase tracking-wider">{t("price.selectVidBatch")}</span>
                <div className="grid grid-cols-4 gap-1 bg-black/5 p-1 rounded-lg text-center text-[10px] font-semibold">
                  {[1, 2, 3, 4].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVideoVolume(v as any)}
                      className={`py-1.5 rounded cursor-pointer ${
                        videoVolume === v ? "bg-black text-white" : "text-[#6E6E73] hover:text-black"
                      }`}
                    >
                      {v} {t("price.vidSuffix")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-1">
                <span className="text-4xl font-bold text-[#1D1D1F] block">{getPrice("video")}</span>
                {getVideoSavings() && (
                  <span className="inline-block bg-[#eafaf1] text-[#00a86b] text-[10px] font-bold py-0.5 px-2 rounded-full mt-1.5 uppercase">
                    {getVideoSavings()}
                  </span>
                )}
              </div>
              <div className="h-px bg-black/5" />
              <ul className="space-y-3.5 text-xs text-[#6E6E73] font-inter">
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.videoF1")}</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.videoF2")}</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0 mt-0.5" />
                  <span>{t("price.videoF3")}</span>
                </li>
              </ul>
            </div>
            
            <button
              type="button"
              onClick={() => handlePurchase(language === "EN" ? "Video Production" : "Production Vidée", "video", language === "EN" ? `${videoVolume} high resolution videos` : `${videoVolume} vidéos haute résolution`)}
              className="w-full btn-outline justify-center text-xs py-3.5 mt-8 hover:!bg-black hover:!text-white hover:!border-black"
            >
              {videoVolume > 1 ? t("price.videoBtn", { count: videoVolume }) : t("price.videoBtnSingle", { count: videoVolume })}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
