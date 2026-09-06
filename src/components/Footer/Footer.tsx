import React from 'react';
import styles from './Footer.module.css';

const COMPANY_LINKS = [
  { label: 'About us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Contact', href: '#' },
];

const RENTER_LINKS = [
  { label: 'Available units', href: '#listings-section' },
  { label: 'Application process', href: '#' },
  { label: 'Resident portal', href: '#tenant-portal' },
  { label: 'Maintenance', href: '#' },
];

const OWNER_LINKS = [
  { label: 'Management services', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Performance metrics', href: '#' },
  { label: 'Schedule consultation', href: '#' },
];

const handleSmoothClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith('#') && href.length > 1) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
};

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* 4-column grid */}
        <div className={styles.grid}>
          {/* Brand col */}
          <div className={styles.brandCol}>
            <span className={styles.wordmark}>Anchorhouse</span>
            <p className={styles.brandBody}>
              Residential property management across the city. Renting, minus the runaround.
            </p>
          </div>

          {/* Company */}
          <div className={styles.linkCol}>
            <span className={styles.colLabel}>Company</span>
            <nav aria-label="Company links">
              {COMPANY_LINKS.map((l) => (
                <a key={l.label} href={l.href} className={styles.link}
                  onClick={(e) => handleSmoothClick(e, l.href)}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Renters */}
          <div className={styles.linkCol}>
            <span className={styles.colLabel}>Renters</span>
            <nav aria-label="Renter links">
              {RENTER_LINKS.map((l) => (
                <a key={l.label} href={l.href} className={styles.link}
                  onClick={(e) => handleSmoothClick(e, l.href)}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Property Owners */}
          <div className={styles.linkCol}>
            <span className={styles.colLabel}>Property Owners</span>
            <nav aria-label="Property owner links">
              {OWNER_LINKS.map((l) => (
                <a key={l.label} href={l.href} className={styles.link}
                  onClick={(e) => handleSmoothClick(e, l.href)}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © 2025 Anchorhouse Property Management LLC. Equal Housing Opportunity.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
