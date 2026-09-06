import React from 'react';
import styles from './TrustBar.module.css';
import { useStaggerReveal } from '../../hooks/useScrollReveal';

const STATS = [
  { value: '3.8 hrs', label: 'Average maintenance dispatch' },
  { value: '$0', label: 'Hidden fees or move-in markups' },
  { value: '4.9 / 5', label: 'Tenant rating across 620+ reviews' },
  { value: '1,240+', label: 'Managed units across the city' },
];

export const TrustBar: React.FC = () => {
  const ref = useStaggerReveal<HTMLDivElement>(0.12, { y: 24, duration: 0.6 });

  return (
    <section className={styles.trustBar} aria-label="Key statistics">
      <div ref={ref} className={styles.inner}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
