import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 pt-24 pb-12 text-[#1D1D1F]">
      <Helmet>
        <title>Page Not Found (404) | NACY ST</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mx-auto text-[#0071E3] animate-bounce">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-semibold text-xs text-[#0071E3] uppercase tracking-widest block">
            — Index Error 404
          </span>
          <h1 className="font-bold text-3xl md:text-4xl text-[#1D1D1F]">
            Page Not Found
          </h1>
          <p className="text-sm text-[#6E6E73] leading-relaxed">
            The requested resource doesn&apos;t exist or has been permanently moved. Our engineering team in Tangier has been notified.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="btn-primary w-full justify-center py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
