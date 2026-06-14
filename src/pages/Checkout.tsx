import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  MapPin, 
  User, 
  Phone, 
  AlertTriangle,
  FileText
} from "lucide-react";
import { CheckoutProduct, UserFormData } from "../types";
import { useTranslation } from "../context/LanguageContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [product, setProduct] = useState<CheckoutProduct | null>(null);

  // Form states matching structural type requirements
  const [formData, setFormData] = useState<UserFormData>({
    prenom: "",
    nom: "",
    tel: "",
    adresse: "",
    ville: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Retrieve selected service from sessionStorage on mount
  useEffect(() => {
    const raw = sessionStorage.getItem("nacy_selected_product");
    if (raw) {
      try {
        setProduct(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse product data", e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple fields validation
    if (
      !formData.prenom || 
      !formData.nom || 
      !formData.tel || 
      !formData.adresse || 
      !formData.ville || 
      false
    ) {
      setErrorMsg(t("checkout.formFieldsErr"));
      return;
    }

    if (!product) {
      setErrorMsg(t("checkout.formNoProduct"));
      return;
    }

    setIsSubmitting(true);

    const today = new Date().toLocaleDateString("en-US");

    // Currency Symbol formatting
    const currencySymbols = { MAD: "MAD", EUR: "€", USD: "$" };
    const priceFormatted = `${product.price} ${currencySymbols[product.currency] || product.currency}`;

    // Build WhatsApp message content
    const waMessage = encodeURIComponent(
      `New Order — NACY ST\n` +
      `Client: *${formData.prenom} ${formData.nom}*\n` +
      `Product ordered: *${product.name}*\n` +
      `WhatsApp: ${formData.tel}\n` +
      `City: ${formData.ville} - Address: ${formData.adresse}\n` +
      `Date: ${today}`
    );

    // Open WA contact number thread in same tab (fixes popup blocker issues on mobile)
    window.location.href = `https://wa.me/212710900502?text=${waMessage}`;
    
    // Clear session so they don't double buy
    sessionStorage.removeItem("nacy_selected_product");
    setIsSubmitting(false);
  };

  // If no product in sessionStorage, show elegant blank state
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-[#F5F5F7] flex items-center justify-center px-6 pt-24 pb-12">
        <Helmet>
          <title>{language === "EN" ? "Session Expired" : "Session Expirée"} | NACY ST Checkout</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="max-w-md w-full bg-[#121212] border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-xl text-[#F5F5F7]">{t("checkout.emptyTitle")}</h2>
            <p className="text-sm text-[#A1A1A6] leading-relaxed">
              {t("checkout.emptySub")}
            </p>
          </div>
          <Link
            to="/services"
            className="w-full btn-primary justify-center py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("checkout.emptyBtn")}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-16 px-6 md:px-12 text-[#F5F5F7] font-inter">
      <Helmet>
        <title>{t("checkout.metaTitle")}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation back helper */}
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#86868B] hover:text-[#0071E3] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{t("checkout.backServices")}</span>
        </Link>

        {/* Header Title */}
        <div className="space-y-1">
          <span className="font-semibold text-xs text-[#0071E3] uppercase tracking-widest block">{t("checkout.orderSummary")}</span>
          <h1 className="font-bold text-3xl md:text-4xl text-[#F5F5F7]">{t("checkout.heading")}</h1>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Product Info (Col Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="font-semibold text-lg text-[#F5F5F7] border-b border-white/10 pb-3">{t("checkout.pkgDetails")}</h2>
              
              {/* Service Circle logo & Name */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#F5F5F7]">{product.name}</h3>
                  <span className="inline-block bg-[#0071E3]/10 border border-[#0071E3]/20 text-[#0071E3] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1">
                    {product.tierName || (language === "EN" ? "Standard Offer" : "Offre Standard")}
                  </span>
                </div>
              </div>

              <div className="bg-[#0A0A0A]/40 border border-white/10 p-4 rounded-xl text-center mt-6">
                <p className="text-[11px] text-[#86868B] italic leading-relaxed">
                  {t("checkout.quoteNote")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: User Data Form (Col Span 7) */}
          <div className="lg:col-span-7">
            <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="font-semibold text-lg text-[#F5F5F7] border-b border-white/10 pb-3">{t("checkout.billingHeading")}</h2>
              
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/25 p-4 rounded-xl text-xs text-red-600 flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleConfirmOrder} className="space-y-5 text-xs font-inter text-sm">
                
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#A1A1A6] uppercase mb-1.5 tracking-wider">{t("checkout.firstNameLabel")} *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-[#86868B]" />
                      <input
                        type="text"
                        name="prenom"
                        required
                        value={formData.prenom}
                        onChange={handleInputChange}
                        placeholder="e.g. John"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-[#F5F5F7] focus:outline-none focus:border-[#0071E3] text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#A1A1A6] uppercase mb-1.5 tracking-wider">{t("checkout.lastNameLabel")} *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-[#86868B]" />
                      <input
                        type="text"
                        name="nom"
                        required
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="e.g. Doe"
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-[#F5F5F7] focus:outline-none focus:border-[#0071E3] text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#A1A1A6] uppercase mb-1.5 tracking-wider">{t("checkout.waPhoneLabel")} *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#86868B]" />
                    <input
                      type="tel"
                      name="tel"
                      required
                      value={formData.tel}
                      onChange={handleInputChange}
                      placeholder="e.g. +212612345678"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-[#F5F5F7] focus:outline-none focus:border-[#0071E3] text-xs"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#A1A1A6] uppercase mb-1.5 tracking-wider">{t("checkout.billingAddrLabel")} *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#86868B]" />
                    <input
                      type="text"
                      name="adresse"
                      required
                      value={formData.adresse}
                      onChange={handleInputChange}
                      placeholder={t("checkout.addressPlaceholder")}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2.5 pl-9 pr-4 text-[#F5F5F7] focus:outline-none focus:border-[#0071E3] text-xs"
                    />
                  </div>
                </div>

                {/* Ville */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#A1A1A6] uppercase mb-1.5 tracking-wider">{t("checkout.cityLabel")} *</label>
                    <input
                      type="text"
                      name="ville"
                      required
                      value={formData.ville}
                      onChange={handleInputChange}
                      placeholder="e.g. Tangier"
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg py-2.5 px-3 text-[#F5F5F7] focus:outline-none focus:border-[#0071E3] text-xs"
                    />
                  </div>
                </div>

                {/* Submit Confirmation CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary justify-center text-sm py-3.5 mt-4 disabled:opacity-40"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>
                    {isSubmitting ? (language === "EN" ? "Submitting..." : "En cours...") : (language === "EN" ? "Submit" : "Soumettre")}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Security / Quality Check Badges bottom element */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-4 text-[#86868B] text-xs text-center">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t("checkout.badgeSecure")}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t("checkout.badgeAssistance")}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
