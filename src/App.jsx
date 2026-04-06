import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import SectionDivider from './components/SectionDivider';
import './App.css';

// Lazy load below-the-fold components for faster initial render
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certificates = lazy(() => import('./components/Certificates'));
const LeetCode = lazy(() => import('./components/LeetCode'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
// Background3D removed — premium black theme doesn't need the solar system

// Minimal fallback while lazy chunks load
const SectionFallback = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for cinematic entry
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app min-h-screen bg-transparent text-white relative md:pl-16">
      <CustomCursor />

      {/* Premium black geometric background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/premium-black-bg.png')" }}
      />
      {/* Subtle dark overlay to blend content */}
      <div className="fixed inset-0 -z-10 bg-black/40" />



      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Certificates />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <LeetCode />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

/* ── Cinematic Loading Screen ── */
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-primary z-[9999] flex items-center justify-center">
      {/* Static subtle glow */}
      <div className="absolute w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo/Name */}
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-display font-bold gradient-text">
            MP
          </h1>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent via-neon-cyan to-neon-pink rounded-full"
            style={{
              animation: 'loading-bar 2s ease-in-out forwards',
            }}
          />
        </div>

        <p className="text-sm text-gray-500 font-mono tracking-widest uppercase">
          Initializing Experience
        </p>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          40% { width: 40%; }
          80% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default App;
