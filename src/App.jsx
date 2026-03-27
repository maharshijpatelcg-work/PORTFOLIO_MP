import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import LeetCode from './components/LeetCode';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SectionDivider from './components/SectionDivider';
import Background3D from './components/Background3D';
import './App.css';

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

      {/* Set the stunning universe image as the fixed background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/universe-bg.jpg')" }}
      />
      {/* Dark overlay with slight blur to ensure text remains perfectly readable against the vivid space background */}
      <div className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-[3px]" />

      {/* Dynamic 3D planets orbiting on top of the universe background */}
      <Background3D />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Certificates />
        <SectionDivider />
        <LeetCode />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
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
