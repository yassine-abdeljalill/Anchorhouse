import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import styles from './AffordabilityCalculator.module.css';
import { useAffordabilityCalculator } from '../../hooks/useAffordabilityCalculator';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Chip } from '../ui/Chip';
import { listings } from '../../data/listings';
import type { Listing } from '../../types';

const NEIGHBORHOODS = ['All Units', 'River North', 'South Hill', 'Oakridge', 'Historic District'];

const ListingCard: React.FC<{ listing: Listing; fitsbudget: boolean }> = ({ listing, fitsbudget }) => {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevFits = useRef(fitsbudget);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const badge = badgeRef.current;
    if (!badge) return;

    if (fitsbudget === prevFits.current) return;
    prevFits.current = fitsbudget;

    if (prefersReduced) {
      gsap.set(badge, { opacity: fitsbudget ? 1 : 0, display: fitsbudget ? 'flex' : 'none' });
      return;
    }

    if (fitsbudget) {
      gsap.set(badge, { display: 'flex', opacity: 0, y: -4 });
      gsap.to(badge, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(badge, { opacity: 0, y: -4, duration: 0.25, ease: 'power2.in', onComplete: () => {
        gsap.set(badge, { display: 'none' });
      }});
    }
  }, [fitsbudget]);

  // Set initial badge state on mount
  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;
    gsap.set(badge, { opacity: fitsbudget ? 1 : 0, display: fitsbudget ? 'flex' : 'none' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        <img src={listing.imageUrl} alt={listing.imageAlt} className={styles.img} />
        <span ref={badgeRef} className={styles.budgetBadge} aria-label="Fits your budget">
          Fits your budget
        </span>
      </div>
      <div className={styles.cardBody}>
        <div>
          <div className={styles.cardMeta}>
            <span className={styles.cardRent}>
              ${listing.rent.toLocaleString()}
              <span className={styles.cardRentUnit}>/mo</span>
            </span>
            <span className={styles.cardNeighborhood}>{listing.neighborhood}</span>
          </div>
          <h3 className={styles.cardAddress}>{listing.address}</h3>
          <p className={styles.cardDetails}>{listing.beds} • {listing.baths} • {listing.sqft.toLocaleString()} sq ft</p>
          <p className={styles.cardAmenities}>{listing.amenities}</p>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.cardAvailable}>{listing.available}</span>
          <a href="#" className={styles.cardCta}>Request Tour</a>
        </div>
      </div>
    </article>
  );
};

export const AffordabilityCalculator: React.FC = () => {
  const { income, setIncome, maxBudget } = useAffordabilityCalculator(6500);
  const [activeFilter, setActiveFilter] = useState('All Units');
  const budgetDisplayRef = useRef<HTMLSpanElement>(null);
  const prevBudget = useRef(maxBudget);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>({ y: 30, opacity: 0, duration: 0.8 });

  // Animate budget number on change
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = budgetDisplayRef.current;
    if (!el || prefersReduced) {
      if (el) el.textContent = `$${maxBudget.toLocaleString()} / mo`;
      prevBudget.current = maxBudget;
      return;
    }
    const obj = { val: prevBudget.current };
    gsap.to(obj, {
      val: maxBudget,
      duration: 0.4,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: () => {
        el.textContent = `$${Math.round(obj.val).toLocaleString()} / mo`;
      },
    });
    prevBudget.current = maxBudget;
  }, [maxBudget]);

  const filteredListings = listings.filter(
    (l) => activeFilter === 'All Units' || l.neighborhood === activeFilter,
  );

  // Animate grid cards on filter change
  const handleFilterChange = useCallback((filter: string) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setActiveFilter(filter);
    if (!gridRef.current || prefersReduced) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>('article');
    gsap.fromTo(cards, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' });
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="listings-section" aria-labelledby="listings-heading">
      <div className={styles.inner}>
        {/* Header row */}
        <div className={styles.headerRow}>
          <div className={styles.headerCopy}>
            <span className={styles.eyebrow}>Budget Guidance</span>
            <h2 id="listings-heading" className={styles.heading}>
              Transparent pricing designed for your budget.
            </h2>
            <p className={styles.body}>
              Standard HUD guidelines recommend spending no more than 30% of gross monthly income on
              housing. Adjust the slider to see which properties fit your comfortable threshold.
            </p>
          </div>

          {/* Calculator widget */}
          <div className={styles.calculator}>
            <div className={styles.calcRow}>
              <label htmlFor="incomeSlider" className={styles.calcLabel}>
                Gross Monthly Household Income
              </label>
              <span className={styles.incomeValue}>
                ${income.toLocaleString()}/mo
              </span>
            </div>
            <input
              id="incomeSlider"
              type="range"
              min={3000}
              max={15000}
              step={250}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className={styles.slider}
              aria-valuemin={3000}
              aria-valuemax={15000}
              aria-valuenow={income}
              aria-valuetext={`$${income.toLocaleString()} per month`}
            />
            <div className={styles.budgetRow}>
              <span className={styles.budgetLabel}>30% Recommended Max:</span>
              <span ref={budgetDisplayRef} className={styles.budgetValue}>
                ${maxBudget.toLocaleString()} / mo
              </span>
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className={styles.filters} role="group" aria-label="Filter by neighborhood">
          <span className={styles.filterLabel}>District:</span>
          {NEIGHBORHOODS.map((n) => (
            <Chip
              key={n}
              label={n}
              active={activeFilter === n}
              onClick={() => handleFilterChange(n)}
            />
          ))}
        </div>

        {/* Listing grid */}
        <div className={styles.grid} ref={gridRef} aria-live="polite">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              fitsbudget={listing.rent <= maxBudget}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
