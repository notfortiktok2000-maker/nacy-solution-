import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import WhyUs from './pages/WhyUs';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import CinematicExperience from './pages/CinematicExperience';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isCinematicPage = location.pathname.toLowerCase() === '/cinematic';

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1D1D1F] font-inter selection:bg-[#0071E3] selection:text-white relative overflow-hidden animate-page-enter">
      <ScrollToTop />
      {/* Global Minimalist Light Background elements - hide in cinematic to maintain deep true blacks */}
      {!isCinematicPage && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] hero-grid-overlay" />
          {/* Ambient subtle warm blur orbs in low opacity for high-end Apple look */}
          <div className="absolute w-[500px] h-[500px] top-[-150px] left-[-200px] bg-[radial-gradient(circle,rgba(0,113,227,0.04)_0%,transparent_70%)] rounded-full animate-orb1" />
          <div className="absolute w-[400px] h-[400px] top-[40%] right-[-150px] bg-[radial-gradient(circle,rgba(0,113,227,0.02)_0%,transparent_70%)] rounded-full animate-orb2" />
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        {!isCinematicPage && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cinematic" element={<CinematicExperience />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isCinematicPage && <Footer />}
        {!isCinematicPage && <WhatsAppWidget />}
      </div>
    </div>
  );
}

