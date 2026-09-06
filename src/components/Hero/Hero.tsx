import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';
import { Button } from '../ui/Button';

const NEIGHBORHOODS = [
  { value: 'all', label: 'All Neighborhoods' },
  { value: 'river-north', label: 'River North' },
  { value: 'south-hill', label: 'South Hill' },
  { value: 'oakridge', label: 'Oakridge' },
  { value: 'historic-district', label: 'Historic District' },
];

const LAYOUTS = [
  { value: 'any', label: 'Any Bedrooms' },
  { value: 'studio', label: 'Studio' },
  { value: '1bed', label: '1 Bedroom' },
  { value: '2bed', label: '2 Bedrooms' },
  { value: '3bed', label: '3+ Bedrooms' },
];

const WIN_DARK = '#d4e7e0';
const WIN_LIGHT = '#ffc55f';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const illusRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const copyEls = copyRef.current ? Array.from(copyRef.current.children) : [];
    const illus = illusRef.current;
    const svg = svgRef.current;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(copyEls, { opacity: 0, y: 28 });
      if (illus) gsap.set(illus, { opacity: 0, scale: 0.95, y: 20 });

      const tl = gsap.timeline({ delay: 0.4 });

      // Stagger entrance of hero text + search box
      tl.to(copyEls, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Reveal building illustration
      if (illus) {
        tl.to(
          illus,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5',
        );
      }

      // Window lighting sequence
      if (svg) {
        const win1 = svg.querySelectorAll<SVGRectElement>('[data-win="1"]');
        const win2 = svg.querySelectorAll<SVGRectElement>('[data-win="2"]');
        const win3 = svg.querySelectorAll<SVGRectElement>('[data-win="3"]');
        const win4 = svg.querySelectorAll<SVGRectElement>('[data-win="4"]');

        gsap.set([win1, win2, win3, win4], { fill: WIN_DARK, opacity: 0.35 });

        tl.to(win1, { fill: WIN_LIGHT, opacity: 0.95, duration: 0.45, ease: 'power2.out', stagger: 0.06 }, '-=0.3')
          .to(win2, { fill: WIN_LIGHT, opacity: 0.95, duration: 0.45, ease: 'power2.out', stagger: 0.06 }, '-=0.25')
          .to(win3, { fill: WIN_LIGHT, opacity: 0.95, duration: 0.45, ease: 'power2.out', stagger: 0.06 }, '-=0.25')
          .to(win4, { fill: WIN_LIGHT, opacity: 0.95, duration: 0.45, ease: 'power2.out', stagger: 0.06 }, '-=0.25');
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById('listings-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        {/* Copy column */}
        <div ref={copyRef} className={styles.copy}>
          <span className={styles.eyebrow}>Residential Property Stewardship</span>
          <h1 id="hero-heading" className={styles.headline}>
            Renting, minus the runaround.
          </h1>
          <p className={styles.body}>
            Clear pricing, guaranteed 4-hour maintenance dispatch, and a digital lease process that
            takes minutes. We manage residential rentals across the city with zero hidden fees and no
            landlord guesswork.
          </p>

          {/* Search card */}
          <div className={styles.searchCard}>
            <form id="heroSearchForm" onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <div className={styles.field}>
                <label htmlFor="heroNeighborhood" className={styles.label}>Neighborhood</label>
                <select id="heroNeighborhood" className={styles.select}>
                  {NEIGHBORHOODS.map((n) => (
                    <option key={n.value} value={n.value}>{n.label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="heroBeds" className={styles.label}>Layout</label>
                <select id="heroBeds" className={styles.select}>
                  {LAYOUTS.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="heroMoveIn" className={styles.label}>Target Move-in</label>
                <input id="heroMoveIn" type="date" defaultValue="2025-04-01" className={styles.select} />
              </div>
              <div className={styles.submitRow}>
                <Button type="submit" variant="cta" className={styles.searchBtn}>
                  Search available rentals
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Illustration column */}
        <div className={styles.illustration}>
          <div ref={illusRef} className={styles.illusCard}>
            <div className={styles.illusHeader}>
              <span className={styles.illusLabel}>Est. Metropolitan Roster</span>
              <span className={styles.illusTag}>Verified Active Occupancy</span>
            </div>

            <svg
              ref={svgRef}
              viewBox="0 0 420 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.svg}
              aria-label="Architectural illustration of three city buildings with sequential window lighting effect"
            >
              {/* Ground */}
              <rect x="10" y="300" width="400" height="4" fill="#1e3630" />

              {/* Building 1: Left brownstone */}
              <rect x="30" y="110" width="105" height="190" rx="1" fill="#1e3630" />
              <rect x="25" y="102" width="115" height="8" fill="#334b45" />
              <rect x="28" y="98" width="109" height="4" fill="#1e3630" />
              {/* Windows B1 */}
              <rect data-win="1" x="42" y="125" width="16" height="24" rx="1" fill={WIN_DARK} />
              <rect data-win="2" x="70" y="125" width="16" height="24" rx="1" fill={WIN_DARK} />
              <rect data-win="1" x="98" y="125" width="16" height="24" rx="1" fill={WIN_DARK} />
              <rect data-win="3" x="42" y="165" width="16" height="24" rx="1" fill={WIN_DARK} />
              <rect data-win="4" x="70" y="165" width="16" height="24" rx="1" fill={WIN_DARK} />
              <rect data-win="2" x="98" y="165" width="16" height="24" rx="1" fill={WIN_DARK} />
              <rect data-win="1" x="42" y="205" width="16" height="24" rx="1" fill={WIN_DARK} />
              <rect data-win="3" x="70" y="205" width="16" height="24" rx="1" fill={WIN_DARK} />
              <rect data-win="4" x="98" y="205" width="16" height="24" rx="1" fill={WIN_DARK} />
              {/* Entrance */}
              <rect x="62" y="260" width="32" height="40" fill="#859f97" />
              <rect x="68" y="268" width="20" height="32" fill="#08211b" />

              {/* Building 2: Central classical */}
              <rect x="145" y="50" width="130" height="250" rx="1" fill="#08211b" />
              <polygon points="145,50 210,18 275,50" fill="#1e3630" />
              <circle cx="210" cy="38" r="5" fill="#ffc55f" />
              {/* Windows B2 */}
              <rect data-win="2" x="162" y="70" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="3" x="200" y="70" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="1" x="238" y="70" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="4" x="162" y="115" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="1" x="200" y="115" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="2" x="238" y="115" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="3" x="162" y="160" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="4" x="200" y="160" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="1" x="238" y="160" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="2" x="162" y="205" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="3" x="200" y="205" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect data-win="4" x="238" y="205" width="20" height="30" rx="2" fill={WIN_DARK} />
              <rect x="195" y="258" width="30" height="42" fill="#7d5700" />

              {/* Building 3: Right industrial */}
              <rect x="285" y="90" width="105" height="210" rx="1" fill="#1c3725" />
              <rect x="285" y="85" width="105" height="5" fill="#83a188" />
              {/* Windows B3 */}
              <rect data-win="4" x="300" y="105" width="32" height="22" rx="1" fill={WIN_DARK} />
              <rect data-win="1" x="342" y="105" width="32" height="22" rx="1" fill={WIN_DARK} />
              <rect data-win="3" x="300" y="140" width="32" height="22" rx="1" fill={WIN_DARK} />
              <rect data-win="2" x="342" y="140" width="32" height="22" rx="1" fill={WIN_DARK} />
              <rect data-win="1" x="300" y="175" width="32" height="22" rx="1" fill={WIN_DARK} />
              <rect data-win="4" x="342" y="175" width="32" height="22" rx="1" fill={WIN_DARK} />
              <rect data-win="2" x="300" y="210" width="32" height="22" rx="1" fill={WIN_DARK} />
              <rect data-win="3" x="342" y="210" width="32" height="22" rx="1" fill={WIN_DARK} />
              <rect x="312" y="255" width="40" height="45" fill="#314d39" />
            </svg>

            <div className={styles.illusFooter}>
              <span>Anchorhouse Ledger Registry</span>
              <span>Civic Core • North Quad • Old Town</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
