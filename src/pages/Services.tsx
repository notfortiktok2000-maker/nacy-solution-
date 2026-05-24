import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Code, Camera, Video, Check, ArrowRight } from "lucide-react";
import { CurrencyType, CheckoutProduct } from "../types";

export default function Services() {
  const navigate = useNavigate();
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
    
    if (currency === "EUR") return `Save ${(diff * 0.093).toFixed(0)} €`;
    if (currency === "USD") return `Save ${(diff * 0.1).toFixed(0)} $`;
    return `Save ${diff} MAD`;
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
      tierName: amountId === "video" ? `${videoVolume} Product Videos` : serviceName,
      details: detailAddition || "Standard Offer"
    };

    sessionStorage.setItem("nacy_selected_product", JSON.stringify(payload));
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] pt-28 pb-20 px-6 md:px-12">
      <Helmet>
        <title>Services | NACY ST — Premium Digital Solutions</title>
        <meta name="description" content="Explore our primary high-conversion services: custom website engineering, professional AI photo shooting, and attention-grabbing product video editing in Tangier." />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Area */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-poppins font-medium text-xs tracking-widest text-[#0071E3] uppercase block">
            — Specialized Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            High-performance digital assets built for conversion.
          </h1>
          <p className="text-[#6E6E73] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We merge professional software engineering with deep algorithmic creativity. No sluggish templates, no bloated processes. Only refined high-tier deliverables.
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
                MAD (Morocco)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("EUR")}
                className={`py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                  currency === "EUR" ? "bg-black text-white shadow-sm" : "text-[#6E6E73] hover:text-black"
                }`}
              >
                EUR (Europe)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                  currency === "USD" ? "bg-black text-white shadow-sm" : "text-[#6E6E73] hover:text-black"
                }`}
              >
                USD (USA)
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
                <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">SERVICE 01</span>
                <h2 className="text-2xl font-bold text-[#1D1D1F]">Website Creation</h2>
              </div>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                Hand-coded, optimized websites designed to win on Google. Lightning-fast response times, bespoke graphics, and clean design patterns tailored specifically to your conversion funnel.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Custom bespoke design, strictly zero templates</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Comprehensive SEO integration & semantic tags</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Fluid ultra-responsive framework performance</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>30 days of complimentary engineering updates</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-black/5 mt-8 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">Starting From</span>
                <span className="text-xl font-bold text-[#1D1D1F]">{getPrice("web")}</span>
              </div>
              <button
                type="button"
                onClick={() => handlePurchase("Website Creation", "web")}
                className="btn-primary"
              >
                <span>Order Now</span>
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
                <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">SERVICE 02</span>
                <h2 className="text-2xl font-bold text-[#1D1D1F]">AI Photo Shooting</h2>
              </div>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                Studio-grade high definition commercial product pictures at a fraction of standard cost. We use deep stable model layers to engineer professional lighting, perfect models, and customized global scenery.
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Complete package of 45 high definition visuals</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Fully localized ambient light & backdrops</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Stable, ultra-realistic model generation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Complete global commercial usage license</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-black/5 mt-8 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">Total Package</span>
                <span className="text-xl font-bold text-[#1D1D1F]">{getPrice("photo")}</span>
              </div>
              <button
                type="button"
                onClick={() => handlePurchase("AI Photo Shooting", "photo", "Pack of 45 AI HD Photos")}
                className="btn-primary"
              >
                <span>Book Shoot</span>
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
                <span className="text-xs font-semibold text-[#0071E3] tracking-wider block">SERVICE 03</span>
                <h2 className="text-2xl font-bold text-[#1D1D1F]">Video Production</h2>
              </div>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                Aggressive thumb-stopping video edits carefully scripted and cut for Reels, TikTok, and YouTube Shorts. Built on psychological engagement hooks to keep users locked in from state zero.
              </p>
              
              {/* Volume selector */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] text-[#6E6E73] block font-semibold uppercase tracking-wider">Select Video Batch Volume</span>
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
                  <span>Vertical optimized TikTok/Reels framework</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Highly dynamic pace, text motion & audio synthesis</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#6E6E73]">
                  <Check className="w-4 h-4 text-[#0071E3] shrink-0" />
                  <span>Professional organic voiceovers optional</span>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-black/5 mt-8 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">Total Cost</span>
                <span className="text-xl font-bold text-[#1D1D1F]">{getPrice("video")}</span>
                {getVideoSavings() && (
                  <span className="block text-[9px] text-[#00a86b] font-bold tracking-tight">{getVideoSavings()}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handlePurchase("Video Production", "video", `${videoVolume} high resolution videos`)}
                className="btn-primary"
              >
                <span>Order Videos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Contact CTA */}
        <div className="bg-[#F5F5F7] rounded-3xl p-8 md:p-12 text-center space-y-4 border border-black/5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">Need a completely customized setup?</h2>
          <p className="text-[#6E6E73] text-sm max-w-xl mx-auto">
            We specialize in bespoke systems, complete brand design, and long-term retainer scopes. Contact us right now on WhatsApp for a quick discussion.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/+212710900502?text=Hi%20NACY%20ST,%20I'm%20interested%20in%20a%20customized%20enterprise%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <span>Discuss Custom Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
