import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, ArrowRight, Menu, X, Check, MessageSquare } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal states
  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalService, setModalService] = useState("Website Creation");
  const [modalMsg, setModalMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Construct WhatsApp message
    const formattedMsg = `Hi NACY ST,%0A%0A` +
      `From: *${modalName}* (%0AEmail: ${modalEmail})%0A` +
      `Service requested: *${modalService}*%0A` +
      `Project Details: ${modalMsg}%0A%0A` +
      `Requesting a free quote from the website.`;
    
    setTimeout(() => {
      // Direct WA URL
      window.open(`https://wa.me/212710900502?text=${formattedMsg}`, "_blank");
      setIsModalOpen(false);
      setIsSubmitted(false);
      setModalName("");
      setModalEmail("");
      setModalMsg("");
    }, 1200);
  };

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Why Us", href: "/why-us" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        id="app-navbar"
        className={`fixed top-0 left-0 w-full h-[72px] z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 border-b border-black/5 backdrop-blur-md shadow-sm"
            : "bg-white/40 border-b border-transparent backdrop-blur-sm"
        }`}
      >
        {/* Left Logo */}
        <Link to="/" className="flex items-center transition-opacity duration-300 hover:opacity-85">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Center links - Redirect to individual Route pages directly */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`font-poppins font-medium text-[14px] transition-colors relative py-1 ${
                  isActive ? "text-black font-semibold" : "text-[#6E6E73] hover:text-black"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-black rounded" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center">
          <button
            id="nav-cta-btn"
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            <span>Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center md:hidden">
          <button
            id="mobile-nav-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-full border border-black/10 bg-black/5 hover:bg-black/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-black" />
            ) : (
              <Menu className="w-5 h-5 text-black" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-full bg-white z-[45] pt-24 px-8 flex flex-col justify-start gap-8 animate-fadeIn md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-poppins text-lg font-semibold py-1 block ${
                    isActive ? "text-black" : "text-[#6E6E73]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="w-full h-px bg-black/5" />

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsModalOpen(true);
            }}
            className="w-full btn-primary justify-center text-center py-3"
          >
            <span>Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MODAL: Free Quote Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-white p-8 border border-black/10 rounded-3xl animate-scaleIn shadow-2xl z-10 text-[#1D1D1F]">
            <button
              type="button"
              className="absolute top-4 right-4 text-[#6E6E73] hover:text-black p-1 rounded-full bg-black/5 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-poppins font-semibold text-xs text-[#0071E3] uppercase tracking-wider block mb-2">
              — Premium Diagnostics
            </span>
            <h3 className="font-poppins font-bold text-2xl mb-4 leading-tight">
              Get Your Free Quote
            </h3>
            <p className="text-[#6E6E73] text-sm mb-6 font-inter">
              Describe your project goal below. We will analyze your specification and model a dedicated proposal under 24 hours.
            </p>

            {isSubmitted ? (
              <div className="h-64 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-emerald-600 animate-pulse" />
                </div>
                <h4 className="font-poppins font-bold text-lg text-black">Briefing Pack Complete!</h4>
                <p className="text-[#6E6E73] text-sm max-w-xs font-inter">
                  We are launching a live chat on WhatsApp to immediately process your proposal parameters.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4 font-inter text-sm">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#6E6E73] mb-1.5 tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    placeholder="e.g. Adam Smith"
                    className="w-full bg-black/5 border border-black/10 rounded-lg py-2.5 px-4 text-black text-xs focus:outline-none focus:border-[#0071E3] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#6E6E73] mb-1.5 tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    placeholder="e.g. adam@company.com"
                    className="w-full bg-black/5 border border-black/10 rounded-lg py-2.5 px-4 text-black text-xs focus:outline-none focus:border-[#0071E3] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#6E6E73] mb-1.5 tracking-wider">
                    Preferred Service
                  </label>
                  <select
                    value={modalService}
                    onChange={(e) => setModalService(e.target.value)}
                    className="w-full bg-white border border-black/10 rounded-lg py-2.5 px-3 text-black text-xs focus:outline-none focus:border-[#0071E3] transition-colors"
                  >
                    <option value="Website Creation">Digital Website Creation</option>
                    <option value="AI Photo Shooting">Studio-Quality AI Photo Shooting</option>
                    <option value="Video Production">Viral Short-Form Video Production</option>
                    <option value="Custom Project">Other Bespoke Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#6E6E73] mb-1.5 tracking-wider">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={modalMsg}
                    onChange={(e) => setModalMsg(e.target.value)}
                    placeholder="Tell us what you would like to achieve, target launch, etc..."
                    className="w-full bg-black/5 border border-black/10 rounded-lg py-2 px-3 text-black text-xs focus:outline-none focus:border-[#0071E3] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary justify-center text-center mt-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Send Request (Open WhatsApp)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
