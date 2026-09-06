import React, { useRef, useEffect, useState } from 'react';
import styles from './Testimonials.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCarousel } from '../../hooks/useCarousel';
import { testimonials } from '../../data/testimonials';
import gsap from 'gsap';

export const Testimonials: React.FC = () => {
  const { currentIndex, prev, next, goTo } = useCarousel(testimonials.length);
  const slideRef = useRef<HTMLDivElement>(null);
  const prevIndex = useRef(currentIndex);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const sectionRef = useScrollReveal<HTMLDivElement>({ y: 36, duration: 0.8 });

  const handleNext = () => {
    setDirection('next');
    next();
  };

  const handlePrev = () => {
    setDirection('prev');
    prev();
  };

  const handleGoTo = (index: number) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    goTo(index);
  };

  useEffect(() => {
    if (prevIndex.current === currentIndex) return;
    prevIndex.current = currentIndex;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (slideRef.current && !prefersReduced) {
      const xOffset = direction === 'next' ? 24 : -24;
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: xOffset },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
      );
    }
  }, [currentIndex, direction]);

  const testimonial = testimonials[currentIndex];

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div ref={sectionRef} className={styles.inner}>
        <span className={styles.eyebrow}>Tenant Feedback</span>
        <h2 id="testimonials-heading" className={styles.heading}>
          Real opinions from genuine leaseholders.
        </h2>

        {/* Carousel */}
        <div className={styles.carousel}>
          <div ref={slideRef} className={styles.slide}>
            <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
            <div className={styles.attribution}>
              <span className={styles.author}>{testimonial.author}</span>
              <span className={styles.tenure}>&nbsp;• {testimonial.tenure}</span>
            </div>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <button type="button" onClick={handlePrev} className={styles.arrowBtn} aria-label="Previous review">
              <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
            </button>
            <div className={styles.dots} role="group" aria-label="Slide indicators">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={[styles.dot, i === currentIndex ? styles.dotActive : ''].join(' ')}
                  onClick={() => handleGoTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === currentIndex}
                />
              ))}
            </div>
            <button type="button" onClick={handleNext} className={styles.arrowBtn} aria-label="Next review">
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
