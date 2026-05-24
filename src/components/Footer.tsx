import { Link } from "react-router-dom";
import { Globe, Mail, MapPin, Phone, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1D1D1F] border-t border-black/10 pt-16 pb-8 px-6 md:px-12 text-white font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-white/10 border border-white/20 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-poppins font-semibold text-lg tracking-tight">NACY ST</span>
          </div>
          <p className="text-[#86868B] text-sm leading-relaxed max-w-xs">
            NACY Solutions designs websites, premium AI photo shoots, and high-performance videos for modern businesses. Where strategy meets intelligence.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://instagram.com/nacyst_creative"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center text-[#86868B] transition-all"
              aria-label="Instagram Page"
            >
              <Instagram className="w-4 h-4" />
            </a>
            
            {/* TikTok custom inline SVG */}
            <a
              href="https://tiktok.com/@nacyst_creative"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center text-[#86868B] transition-all"
              aria-label="TikTok Page"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.6 4.19 1.1 1.25 2.65 1.95 4.29 2.11v3.91c-1.23-.16-2.42-.64-3.41-1.39a8.23 8.23 0 0 1-2.49-3.04v7.75c-.01 1.56-.47 3.09-1.32 4.38-1.12 1.74-2.88 2.92-4.88 3.32-1.42.27-2.9.15-4.26-.35a8.71 8.71 0 0 1-4.14-3.79c-.93-1.63-1.25-3.53-.9-5.4.38-2.01 1.54-3.79 3.22-4.94A8.8 8.8 0 0 1 12 7.72V11.83a4.7 4.7 0 0 0-2.54-.53 4.61 4.61 0 0 0-3.35 2.37 4.77 4.77 0 0 0-.25 3.95 4.68 4.68 0 0 0 4.16 2.94 4.5 4.5 0 0 0 2.51-.5c1.47-.79 2.39-2.35 2.49-4.01V.02z" />
              </svg>
            </a>
            
            <a
              href="https://linkedin.com/company/nacyst"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white flex items-center justify-center text-[#86868B] transition-all"
              aria-label="LinkedIn Page"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div className="space-y-4">
          <h4 className="font-poppins font-semibold text-sm uppercase tracking-wider text-white">Services</h4>
          <ul className="space-y-2.5 text-sm text-[#86868B]">
            <li>
              <Link to="/services" className="hover:text-white transition-colors">Website Creation</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition-colors">AI Photo Shooting</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition-colors">Video Production</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition-colors">Custom Projects</Link>
            </li>
          </ul>
        </div>

        {/* Agency Page Links */}
        <div className="space-y-4">
          <h4 className="font-poppins font-semibold text-sm uppercase tracking-wider text-white">The Agency</h4>
          <ul className="space-y-2.5 text-sm text-[#86868B]">
            <li>
              <Link to="/why-us" className="hover:text-white transition-colors">Why NACY ST</Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white transition-colors gap-2 inline-flex items-center">
                <span>Multi-Currency Pricing</span>
                <span className="text-[9px] bg-[#0071E3] text-white px-1.5 py-0.5 rounded-full uppercase scale-90">Live</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">Free Consultation</Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-white transition-colors">Instant Order Calculator</Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-4">
          <h4 className="font-poppins font-semibold text-sm uppercase tracking-wider text-white">Get in Touch</h4>
          <ul className="space-y-3.5 text-sm text-[#86868B]">
            <li className="flex items-start gap-3">
              <MapPin className="w-[18px] h-[18px] text-white shrink-0 mt-0.5" />
              <span>Tangier, Morocco</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-[18px] h-[18px] text-white shrink-0 mt-0.5" />
              <a href="mailto:eaagagency@gmail.cm" className="hover:text-white transition-colors">
                eaagagency@gmail.cm
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-[18px] h-[18px] text-white shrink-0 mt-0.5" />
              <a href="https://wa.me/212710900502" className="hover:text-white transition-colors">
                +212 7 10 90 05 02
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Dividers & Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#86868B]">
        <p>
          &copy; {currentYear} NACY ST. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="text-[#86868B]">Engineered in Tangier</span>
        </div>
      </div>
    </footer>
  );
}
