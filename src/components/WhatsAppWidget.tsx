import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function WhatsAppWidget() {
  const { language } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  const phone = "212710900502";
  const messageEn = "Hi Nacy Solutions, I visited your website and would like to request a free quote/consultation!";
  const messageFr = "Bonjour Nacy Solutions, j'ai visité votre site web et je souhaite obtenir un devis gratuit!";
  
  const activeMessage = language === "FR" ? messageFr : messageEn;
  const tooltipText = language === "FR" ? "Discutez avec nous" : "Chat on WhatsApp";

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip popping to the left */}
      <div 
        className={`bg-[#F5F5F7] text-[#0A0A0A] text-[11px] font-medium tracking-wide font-poppins px-3.5 py-1.5 rounded-full shadow-lg transition-all duration-300 select-none pointer-events-none translate-x-2 ${
          showTooltip ? "opacity-100 -translate-x-0" : "opacity-0 invisible"
        }`}
      >
        {tooltipText}
      </div>

      {/* Main Pulse Anchor link */}
      <a
        id="whatsapp-floating-trigger"
        href={`https://wa.me/${phone}?text=${encodeURIComponent(activeMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-[0_8px_32px_rgba(37,211,102,0.45)] transition-all duration-300 transform active:scale-95 flex items-center justify-center cursor-pointer group"
        aria-label="WhatsApp Contact"
      >
        {/* Continuous Pulse Ripples */}
        <div className="whatsapp-pulse-ring" />
        <div className="whatsapp-pulse-ring" style={{ animationDelay: "1s" }} />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  );
}
