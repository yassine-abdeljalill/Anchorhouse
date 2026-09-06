import React from 'react';
import styles from './CTABand.module.css';
import { Button } from '../ui/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const CTABand: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>({ y: 30, opacity: 0, duration: 0.8 });

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="cta-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="cta-heading" className={styles.heading}>
            Ready to find your next home without the hassle?
          </h2>
          <p className={styles.body}>
            Browse 40+ available apartments across the city or speak directly with our local leasing
            stewards today.
          </p>
        </div>
        <div className={styles.actions}>
          <Button
            as="a"
            variant="primary"
            href="#listings-section"
            className={styles.cta}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Schedule a tour
          </Button>
        </div>
      </div>
    </section>
  );
};
