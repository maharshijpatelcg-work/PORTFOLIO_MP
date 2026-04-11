import React, { lazy, Suspense } from 'react';
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

export default App;

