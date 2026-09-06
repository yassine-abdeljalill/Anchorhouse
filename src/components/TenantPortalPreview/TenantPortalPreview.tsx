import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './TenantPortalPreview.module.css';
import type { PortalTabKey } from '../../types';
import { portalTabs } from '../../data/portalTabs';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const PayRentPanel: React.FC = () => (
  <div className={styles.panel}>
    {/* Autopay header */}
    <div className={styles.autopayCard}>
      <div>
        <span className={styles.autopayLabel}>Autopay Active • Bank Checking (*4092)</span>
        <h3 className={styles.autopayAmount}>$1,850.00 Due May 1, 2025</h3>
        <p className={styles.autopayNote}>Scheduled to draw automatically • $0 ACH processing fee</p>
      </div>
      <button className={styles.manageBtn} type="button">Manage Autopay</button>
    </div>

    {/* Ledger + History */}
    <div className={styles.twoCol}>
      {/* Ledger breakdown */}
      <div className={styles.ledgerCard}>
        <span className={styles.cardTitle}>Current Ledger Breakdown</span>
        <div className={styles.ledgerRow}>
          <span className={styles.ledgerKey}>Scheduled Monthly Rent (Apt 4B)</span>
          <span className={styles.ledgerVal}>$1,850.00</span>
        </div>
        <div className={styles.ledgerRow}>
          <span className={styles.ledgerKey}>Municipal Water & Trash Recovery</span>
          <span className={styles.ledgerValAccent}>Included ($0.00)</span>
        </div>
        <div className={styles.ledgerRow}>
          <span className={styles.ledgerKey}>Anchorhouse Resident Portal Access</span>
          <span className={styles.ledgerValAccent}>Included ($0.00)</span>
        </div>
        <div className={styles.ledgerTotal}>
          <span>Total Net Remittance</span>
          <span>$1,850.00</span>
        </div>
      </div>

      {/* Receipt history */}
      <div className={styles.ledgerCard}>
        <span className={styles.cardTitle}>Recent Statement Receipts</span>
        {[
          { date: 'April 1, 2025', ref: 'ACH #8472' },
          { date: 'March 1, 2025', ref: 'ACH #7391' },
          { date: 'February 1, 2025', ref: 'ACH #6204' },
        ].map((r) => (
          <div className={styles.receiptRow} key={r.ref}>
            <span className={styles.receiptDate}>{r.date}</span>
            <span className={styles.receiptAmount}>$1,850.00</span>
            <span className={styles.receiptBadge}>Paid • {r.ref}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MaintenancePanel: React.FC = () => (
  <div className={styles.panel}>
    <div className={styles.dispatchCard}>
      <div className={styles.dispatchLeft}>
        <div className={styles.dispatchIcon}>
          <span className="material-symbols-outlined" aria-hidden="true">build</span>
        </div>
        <div>
          <span className={styles.dispatchBadge}>Active Dispatch #M-3081</span>
          <h3 className={styles.dispatchTitle}>Dishwasher Drainage Valve Inspection</h3>
          <p className={styles.dispatchMeta}>Submitted today at 8:45 AM • Dispatched within 42 minutes</p>
        </div>
      </div>
      <div className={styles.dispatchRight}>
        <span className={styles.dispatchStatus}>Technician Dispatched</span>
        <span className={styles.dispatchEta}>ETA: 1:30 PM • Certified Tradesperson</span>
      </div>
    </div>

    <div className={styles.twoCol}>
      <div className={styles.techCard}>
        <div className={styles.techAvatar}>JD</div>
        <div>
          <span className={styles.techName}>Julian Drake</span>
          <p className={styles.techRole}>Master Plumber • Anchorhouse Field Staff #14</p>
          <span className={styles.techAccess}>Direct Keyless Entry Authorized by Tenant</span>
        </div>
      </div>
      <div className={styles.newRequestCard}>
        <div>
          <span className={styles.cardTitle}>Have a new issue?</span>
          <p className={styles.techRole}>Photo diagnostic upload with 4-hr guarantee</p>
        </div>
        <button className={styles.manageBtn} type="button">New Request</button>
      </div>
    </div>
  </div>
);

const DocumentsPanel: React.FC = () => (
  <div className={styles.panel}>
    <div className={styles.docsGrid}>
      {[
        {
          icon: 'description',
          title: 'Residential Lease Agreement',
          meta: 'Term: May 1, 2024 – April 30, 2025',
          badge: 'Executed • Counter-signed',
          cta: 'Download PDF (284 KB)',
        },
        {
          icon: 'verified',
          title: 'Move-In Inspection Ledger',
          meta: '42 photographic checkpoints verified',
          badge: 'Verified on Record',
          cta: 'View Photo Record',
        },
        {
          icon: 'shield',
          title: 'Renters Insurance Policy',
          meta: 'Policy #LF-99382-A • Lemonade',
          badge: 'Valid thru Oct 2025',
          cta: 'Update Certificate',
        },
      ].map((doc) => (
        <div key={doc.title} className={styles.docCard}>
          <div>
            <span className={`material-symbols-outlined ${styles.docIcon}`} aria-hidden="true">{doc.icon}</span>
            <h4 className={styles.docTitle}>{doc.title}</h4>
            <p className={styles.docMeta}>{doc.meta}</p>
            <span className={styles.docBadge}>{doc.badge}</span>
          </div>
          <a href="#" className={styles.docCta}>{doc.cta}</a>
        </div>
      ))}
    </div>
  </div>
);

export const TenantPortalPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PortalTabKey>('pay');
  const panelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>({ y: 30, opacity: 0, duration: 0.8 });

  const switchTab = (key: PortalTabKey) => {
    if (key === activeTab) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (panelRef.current && !prefersReduced) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    }
    setActiveTab(key);
  };

  // Entrance animation on mount
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (panelRef.current && !prefersReduced) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="tenant-portal" aria-labelledby="portal-heading">
      <div className={styles.inner}>
        {/* Header row */}
        <div className={styles.headerRow}>
          <div className={styles.headerCopy}>
            <span className={styles.eyebrow}>Resident Stewardship</span>
            <h2 id="portal-heading" className={styles.heading}>
              A tenant portal that actually works.
            </h2>
            <p className={styles.body}>
              Say goodbye to clunky third-party interfaces with 3% credit card fee surcharges. Handle
              payments, schedule certified trades, and audit lease documents from a calm, unified
              ledger.
            </p>
          </div>

          {/* Tab switcher */}
          <div className={styles.tabBar} role="tablist" aria-label="Portal sections">
            {portalTabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                type="button"
                aria-selected={activeTab === tab.key}
                aria-controls={`panel-${tab.key}`}
                className={[styles.tabBtn, activeTab === tab.key ? styles.tabActive : ''].join(' ')}
                onClick={() => switchTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel container */}
        <div
          ref={panelRef}
          className={styles.panelContainer}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-label={portalTabs.find((t) => t.key === activeTab)?.label}
        >
          {activeTab === 'pay' && <PayRentPanel />}
          {activeTab === 'maint' && <MaintenancePanel />}
          {activeTab === 'docs' && <DocumentsPanel />}
        </div>
      </div>
    </section>
  );
};
