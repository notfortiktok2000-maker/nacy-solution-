import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function Contact() {
  const { t, language } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Website Creation");
  const [message, setMessage] = useState("");
  const [isFormSending, setIsFormSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSending(true);

    const formattedMessage = `New Inquiry — NACY ST%0A` +
      `Client: *${firstName} ${lastName}*%0A` +
      `WhatsApp: ${phone}%0A` +
      `Email: ${email}%0A` +
      `Requested Service: *${service}*%0A` +
      `Message: ${message}%0A` +
      `Date: ${new Date().toLocaleDateString("en-US")}`;

    setTimeout(() => {
      setIsFormSending(false);
      setFormSuccess(true);
      
      // Open WhatsApp Link
      window.location.href = `https://wa.me/+212710900502?text=${formattedMessage}`;
      
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] pt-28 pb-20 px-6 md:px-12">
      <Helmet>
        <title>{t("contact.metaTitle")}</title>
        <meta name="description" content={t("contact.metaDesc")} />
      </Helmet>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left info column */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <span className="font-poppins font-medium text-xs tracking-widest text-[#0071E3] uppercase block">
              {t("contact.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] leading-tight">
              {t("contact.heading")}
            </h1>
            <p className="text-[#6E6E73] text-sm md:text-base leading-relaxed">
              {t("contact.sub")}
            </p>
          </div>

          <div className="space-y-6 pt-4 text-sm font-inter text-[#6E6E73]">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#1D1D1F]">{t("contact.office")}</h4>
                <p className="text-xs text-[#6E6E73] mt-0.5">{language === "EN" ? "Tangier, Morocco" : "Tanger, Maroc"}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#1D1D1F]">{t("contact.emailSupport")}</h4>
                <p className="text-xs text-[#6E6E73] mt-0.5">eaagagency@gmail.cm</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#1D1D1F]">{t("contact.liveHelp")}</h4>
                <p className="text-xs text-[#6E6E73] mt-0.5">+212 7 10 90 05 02</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form block */}
        <div className="bg-[#F5F5F7] border border-black/5 p-8 md:p-10 rounded-3xl relative shadow-sm">
          {formSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-emerald-600 animate-bounce" />
              </div>
              <h3 className="font-bold text-xl text-[#1D1D1F]">{t("contact.formSuccessTitle")}</h3>
              <p className="text-sm text-[#6E6E73] max-w-sm mx-auto">
                {t("contact.formSuccessText")}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setFormSuccess(false)}
                  className="btn-outline"
                >
                  {t("contact.formAnotherBtn")}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 font-inter text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6E6E73] mb-1.5 uppercase">{t("contact.formFirstName")}</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Adam"
                    className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-4 text-[#1D1D1F] text-xs focus:outline-none focus:border-[#0071E3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6E6E73] mb-1.5 uppercase">{t("contact.formLastName")}</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Tazi"
                    className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-4 text-[#1D1D1F] text-xs focus:outline-none focus:border-[#0071E3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6E6E73] mb-1.5 uppercase">{t("contact.formPhone")}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +212612345678"
                    className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-4 text-[#1D1D1F] text-xs focus:outline-none focus:border-[#0071E3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6E6E73] mb-1.5 uppercase">{t("contact.formService")}</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-3 text-[#1D1D1F] text-xs focus:outline-none focus:border-[#0071E3]"
                  >
                    <option value="Website Creation">{language === "EN" ? "Digital Website Creation" : "Création de Site Web Numérique"}</option>
                    <option value="AI Photo Shooting">{language === "EN" ? "Studio AI Photo Shooting" : "Séance Photo IA en Studio"}</option>
                    <option value="Video Production">{language === "EN" ? "Viral Video Production" : "Production Vidéo Virale"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E6E73] mb-1.5 uppercase">{t("contact.formEmail")}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. adam@company.com"
                  className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-4 text-[#1D1D1F] text-xs focus:outline-none focus:border-[#0071E3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E6E73] mb-1.5 uppercase">{t("contact.formOverview")}</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("contact.formOverviewPlaceholder")}
                  className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-4 text-[#1D1D1F] text-xs focus:outline-none focus:border-[#0071E3] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isFormSending}
                className="w-full btn-primary justify-center text-xs py-3.5 mt-4 disabled:opacity-50"
              >
                {isFormSending ? t("contact.formSending") : t("contact.formSubmitBtn")}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
