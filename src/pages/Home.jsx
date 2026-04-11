import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import SectionDivider from '../components/SectionDivider';

// Lazy load below-the-fold components for faster initial render
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Certificates = lazy(() => import('../components/Certificates'));
const LeetCode = lazy(() => import('../components/LeetCode'));
const Contact = lazy(() => import('../components/Contact'));

// Minimal fallback while lazy chunks load
const SectionFallback = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
