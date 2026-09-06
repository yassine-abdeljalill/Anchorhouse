import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { TrustBar } from './components/TrustBar/TrustBar';
import { AffordabilityCalculator } from './components/AffordabilityCalculator/AffordabilityCalculator';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { TenantPortalPreview } from './components/TenantPortalPreview/TenantPortalPreview';
import { Testimonials } from './components/Testimonials/Testimonials';
import { FAQAccordion } from './components/FAQAccordion/FAQAccordion';
import { CTABand } from './components/CTABand/CTABand';
import { Footer } from './components/Footer/Footer';
import styles from './App.module.css';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !overlayRef.current) {
      if (overlayRef.current) overlayRef.current.style.display = 'none';
      return;
    }

    // Smooth intro reveal timeline
    const tl = gsap.timeline();

    tl.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.75,
      ease: 'power4.inOut',
      delay: 0.1,
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = 'none';
        ScrollTrigger.refresh();
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Page-load curtain reveal overlay */}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />

      <Header />
      <main style={{ paddingTop: '72px' }}>
        <Hero />
        <TrustBar />
        <AffordabilityCalculator />
        <HowItWorks />
        <TenantPortalPreview />
        <Testimonials />
        <FAQAccordion />
        <CTABand />
      </main>
      <Footer />
    </>
  );
};

export default App;
