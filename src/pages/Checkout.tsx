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

export default function Checkout() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<CheckoutProduct | null>(null);

  // Form states matching structural type requirements
  const [formData, setFormData] = useState<UserFormData>({
    prenom: "",
    nom: "",
    tel: "",
    adresse: "",
    ville: "",
    cp: ""
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
      !formData.cp
    ) {
      setErrorMsg("Please fill in all the required form fields.");
      return;
    }

    if (!product) {
      setErrorMsg("No selected product was found in your session.");
      return;
    }

    setIsSubmitting(true);

    const today = new Date().toLocaleDateString("en-US");

    // Currency Symbol formatting
    const currencySymbols = { MAD: "MAD", EUR: "€", USD: "$" };
    const priceFormatted = `${product.price} ${currencySymbols[product.currency] || product.currency}`;

    // Build WhatsApp message content in English
    const waMessage = 
      `New Order — NACY ST%0A` +
      `Client: *${formData.prenom} ${formData.nom}*%0A` +
      `Product ordered: *${product.name}*%0A` +
      `Tier Selection: ${product.tierName || "Standard"}%0A` +
      `Total Price: ${priceFormatted}%0A` +
      `Billing Address: ${formData.adresse}, ${formData.ville} [${formData.cp}]%0A` +
      `WhatsApp: ${formData.tel}%0A` +
      `Date: ${today}`;

    setTimeout(() => {
      // Clear session so they don't double buy
      sessionStorage.removeItem("nacy_selected_product");
      setIsSubmitting(false);

      // Open WA contact number thread
      window.location.href = `https://wa.me/+212710900502?text=${waMessage}`;
      
      // Navigate back home to reset flow nicely
      navigate("/");
    }, 1200);
  };

  // If no product in sessionStorage, show elegant blank state
  if (!product) {
    return (
      <div className="min-h-screen bg-white text-[#1D1D1F] flex items-center justify-center px-6 pt-24 pb-12">
        <Helmet>
          <title>Session Expired | NACY ST Checkout</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="max-w-md w-full bg-[#F5F5F7] border border-black/5 rounded-3xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-xl text-[#1D1D1F]">Your order bag is empty</h2>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              Please select one of our premium services (Website Creation, AI Photo Shooting or Video Production) from our services directory first.
            </p>
          </div>
          <Link
            to="/services"
            className="w-full btn-primary justify-center py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Services</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 px-6 md:px-12 text-[#1D1D1F] font-inter">
      <Helmet>
        <title>Finalize Your Selection | NACY ST Checkout</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation back helper */}
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#86868B] hover:text-[#0071E3] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Services</span>
        </Link>

        {/* Header Title */}
        <div className="space-y-1">
          <span className="font-semibold text-xs text-[#0071E3] uppercase tracking-widest block">— ORDER SUMMARY</span>
          <h1 className="font-bold text-3xl md:text-4xl text-[#1D1D1F]">Finalize Your Project</h1>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Product Info (Col Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F5F5F7] border border-black/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="font-semibold text-lg text-[#1D1D1F] border-b border-black/5 pb-3">Package Details</h2>
              
              {/* Service Circle logo & Name */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1D1D1F]">{product.name}</h3>
                  <span className="inline-block bg-[#0071E3]/10 border border-[#0071E3]/20 text-[#0071E3] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1">
                    {product.tierName || "Standard Offer"}
                  </span>
                </div>
              </div>

              {/* Service pricing items table layout */}
              <div className="space-y-2.5 text-xs text-[#6E6E73] pt-2">
                <div className="flex justify-between">
                  <span>Base Package Prestation</span>
                  <span className="text-[#1D1D1F] font-semibold">
                    {product.price} {product.currency === "EUR" ? "€" : product.currency === "USD" ? "$" : "MAD"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Post-launch support</span>
                  <span className="text-[#00a86b] font-semibold">Included / Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing fees</span>
                  <span className="text-[#00a86b] font-semibold">0.00 MAD</span>
                </div>
                <div className="h-px bg-black/5 my-2" />
                <div className="flex justify-between text-sm font-semibold text-[#1D1D1F]">
                  <span>Total Due</span>
                  <span className="text-[#0071E3] text-lg font-bold">
                    {product.price} {product.currency === "EUR" ? "€" : product.currency === "USD" ? "$" : "MAD"}
                  </span>
                </div>
              </div>

              <div className="bg-white/40 border border-black/5 p-4 rounded-xl text-center">
                <p className="text-[11px] text-[#86868B] italic leading-relaxed">
                  &ldquo;Once confirmed, we&apos;ll reach out within 24 hours to get started.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: User Data Form (Col Span 7) */}
          <div className="lg:col-span-7">
            <div className="bg-[#F5F5F7] border border-black/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h2 className="font-semibold text-lg text-[#1D1D1F] border-b border-black/5 pb-3">Billing & Contact Details</h2>
              
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
                    <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase mb-1.5 tracking-wider">First Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-[#86868B]" />
                      <input
                        type="text"
                        name="prenom"
                        required
                        value={formData.prenom}
                        onChange={handleInputChange}
                        placeholder="e.g. John"
                        className="w-full bg-white border border-black/10 rounded-lg py-2.5 pl-9 pr-4 text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase mb-1.5 tracking-wider">Last Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-[#86868B]" />
                      <input
                        type="text"
                        name="nom"
                        required
                        value={formData.nom}
                        onChange={handleInputChange}
                        placeholder="e.g. Doe"
                        className="w-full bg-white border border-black/10 rounded-lg py-2.5 pl-9 pr-4 text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase mb-1.5 tracking-wider">WhatsApp Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-[#86868B]" />
                    <input
                      type="tel"
                      name="tel"
                      required
                      value={formData.tel}
                      onChange={handleInputChange}
                      placeholder="e.g. +212612345678"
                      className="w-full bg-white border border-black/10 rounded-lg py-2.5 pl-9 pr-4 text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] text-xs"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase mb-1.5 tracking-wider">Full Billing Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#86868B]" />
                    <input
                      type="text"
                      name="adresse"
                      required
                      value={formData.adresse}
                      onChange={handleInputChange}
                      placeholder="Street, District, App Number"
                      className="w-full bg-white border border-black/10 rounded-lg py-2.5 pl-9 pr-4 text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] text-xs"
                    />
                  </div>
                </div>

                {/* Ville & Code Postal */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase mb-1.5 tracking-wider">City *</label>
                    <input
                      type="text"
                      name="ville"
                      required
                      value={formData.ville}
                      onChange={handleInputChange}
                      placeholder="e.g. Tangier"
                      className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-3 text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6E6E73] uppercase mb-1.5 tracking-wider">Postal / ZIP Code *</label>
                    <input
                      type="text"
                      name="cp"
                      required
                      value={formData.cp}
                      onChange={handleInputChange}
                      placeholder="e.g. 90000"
                      className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-3 text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] text-xs"
                    />
                  </div>
                </div>

                {/* Submit Confirmation CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary justify-center text-sm py-3.5 mt-4 disabled:slate-40"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>
                    {isSubmitting ? "Finalizing Order..." : "Confirm Project & Open WhatsApp"}
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Security / Quality Check Badges bottom element */}
        <div className="flex justify-center items-center gap-6 pt-4 text-[#86868B] text-xs">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Secure Instant Briefing</span>
          </div>
          <div className="h-4 w-px bg-black/10" />
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Direct Tangier, Morocco Assistance Line</span>
          </div>
        </div>

      </div>
    </div>
  );
}
