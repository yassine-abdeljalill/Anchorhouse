import React, { useState, useCallback } from 'react';
import styles from './Header.module.css';
import { Button } from '../ui/Button';

const NAV_LINKS = [
  { label: 'Listings', href: '#listings-section' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Tenant portal', href: '#tenant-portal' },
  { label: 'FAQ', href: '#faq' },
];

const scrollTo = (href: string) => {
  const target = document.querySelector(href);
  target?.scrollIntoView({ behavior: 'smooth' });
};

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      scrollTo(href);
    },
    [],
  );

  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#" className={styles.logo} aria-label="Anchorhouse home">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="4" fill="#08211b" />
            <path
              d="M14 6 L14 22 M8 14 L20 14 M10 9 Q14 6 18 9 M10 19 Q14 22 18 19"
              stroke="#ffc55f"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.wordmark}>Anchorhouse</span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            as="a"
            variant="cta"
            href="#listings-section"
            className={styles.ctaBtn}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              scrollTo('#listings-section');
            }}
          >
            Schedule a tour
          </Button>
          <div className={styles.avatar} aria-label="User account">
            <span className="material-symbols-outlined" aria-hidden="true">
              person
            </span>
          </div>
          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <Button
            as="a"
            variant="cta"
            href="#listings-section"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setMobileOpen(false);
              scrollTo('#listings-section');
            }}
          >
            Schedule a tour
          </Button>
        </nav>
      )}
    </header>
  );
};
