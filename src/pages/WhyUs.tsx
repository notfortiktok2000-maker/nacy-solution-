import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Heart, Sparkles, MessageSquare, ArrowRight } from "lucide-react";

export default function WhyUs() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] pt-28 pb-20 px-6 md:px-12">
      <Helmet>
        <title>Why Us | NACY ST — Why Smart Brands Choose Us</title>
        <meta name="description" content="Why modern businesses choose NACY Solutions over traditional agencies. Instant WhatsApp communications, hand-coded performance, and stellar artificial intelligence workflows." />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-poppins font-medium text-xs tracking-widest text-[#0071E3] uppercase block">
            — Beyond Standard Agencies
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
            We build what others only promise.
          </h1>
          <p className="text-[#6E6E73] text-base leading-relaxed">
            NACY Solutions (NACY ST) isn't a traditional creative agency. We are an tech-forward squad building lightning-fast websites, hyper-realistic AI visuals, and viral social media assets.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          <div className="bg-[#F5F5F7] p-8 rounded-2xl border border-black/5 flex gap-5">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3]">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">Smarter Tools, Sharper Results</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                By integrating specialized generative workflows into our design stack, we slash standard production time without cutting quality. You get top-tier assets in days, not months.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F7] p-8 rounded-2xl border border-black/5 flex gap-5">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">Zero Template Hand-coding</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                Most agencies reuse identical WordPress templates. We compile clean, custom codes optimized to index instantly in Tangier or globally, ensuring absolute platform immunity and fast loading times.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F7] p-8 rounded-2xl border border-black/5 flex gap-5">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">Direct WhatsApp Communication</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                No slow, corporate emails or ticketing delays. Chat in real-time with engineers and creators who actually execute your edits. Full transparency with immediate WhatsApp responses.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F7] p-8 rounded-2xl border border-black/5 flex gap-5">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 text-[#0071E3]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1D1D1F]">No Hidden Fees & Multi-Currency</h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed">
                Transparent multi-currency pricing models. Select your base currency and pay exactly what has been displayed. No surprise fees, no unexpected overages.
              </p>
            </div>
          </div>

        </div>

        {/* Summary Table or Quote Block */}
        <div className="border border-black/10 rounded-2xl p-8 bg-white space-y-6">
          <div className="border-l-4 border-black pl-5">
            <p className="text-xl italic text-[#1D1D1F] font-semibold leading-relaxed">
              "Working with NACY ST felt like adding an elite technology department to our real estate firm overnight. They shipped an optimized website and produced 45 product photos within 72 hours."
            </p>
            <span className="block mt-3 text-xs font-bold uppercase tracking-wider text-[#6E6E73]">
              — Anass Benjelloun, Tangier Real Estate Director
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/contact"
            className="btn-primary inline-flex gap-2 items-center"
          >
            <span>Begin Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
