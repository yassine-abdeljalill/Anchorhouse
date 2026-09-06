import React from 'react';
import styles from './HowItWorks.module.css';
import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal';

const STEPS = [
  {
    number: '01',
    title: 'Browse & tour',
    body: 'Schedule self-guided digital lockbox or accompanied viewings online in under 60 seconds with verified unit specs.',
  },
  {
    number: '02',
    title: 'Apply online',
    body: 'Standardized $25 background check fee. Clear qualification rubrics and a binding decision delivered in under 24 hours.',
  },
  {
    number: '03',
    title: 'Sign digitally',
    body: 'Standard plain-English lease agreements without undisclosed administrative add-ons, utility markups, or renewal ambushes.',
  },
  {
    number: '04',
    title: 'Move in & relax',
    body: 'Keyless smart entry codes, condition reports, and immediate direct portal access for payments and 4-hour maintenance dispatch.',
  },
];

export const HowItWorks: React.FC = () => {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 32 });
  const gridRef = useStaggerReveal<HTMLDivElement>(0.13, { y: 40, duration: 0.65 });

  return (
    <section className={styles.section} id="how-it-works" aria-labelledby="how-heading">
      <div className={styles.inner}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Straightforward Process</span>
          <h2 id="how-heading" className={styles.heading}>
            How renting with Anchorhouse works.
          </h2>
        </div>
        <div ref={gridRef} className={styles.grid}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
