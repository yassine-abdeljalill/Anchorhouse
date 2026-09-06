import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import styles from './FAQAccordion.module.css';
import { useAccordion } from '../../hooks/useAccordion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { faqItems } from '../../data/faqItems';

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItemComponent: React.FC<FAQItemProps> = ({ id, question, answer, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const prevOpen = useRef(isOpen);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isOpen === prevOpen.current) return;
    prevOpen.current = isOpen;

    if (prefersReduced) {
      gsap.set(el, { height: isOpen ? 'auto' : 0, overflow: 'hidden' });
      return;
    }

    if (isOpen) {
      gsap.set(el, { height: 0, overflow: 'hidden' });
      gsap.to(el, { height: 'auto', duration: 0.35, ease: 'power2.out', onComplete: () => {
        gsap.set(el, { overflow: 'visible' });
      }});
    } else {
      gsap.set(el, { overflow: 'hidden' });
      gsap.to(el, { height: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  // Set initial height on mount
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    gsap.set(el, { height: isOpen ? 'auto' : 0, overflow: 'hidden' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.toggle}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${id}`}
        id={`faq-btn-${id}`}
      >
        <span className={styles.question}>{question}</span>
        <span
          className={`material-symbols-outlined ${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>
      <div
        ref={contentRef}
        id={`faq-content-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        className={styles.content}
      >
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
};

export const FAQAccordion: React.FC = () => {
  const defaultOpen = faqItems.find((i) => i.defaultOpen)?.id ?? null;
  const { isOpen, toggle } = useAccordion(defaultOpen);
  const sectionRef = useScrollReveal<HTMLDivElement>({ y: 30, opacity: 0, duration: 0.8 });

  const handleToggle = useCallback((id: string) => {
    toggle(id);
  }, [toggle]);

  return (
    <section ref={sectionRef} className={styles.section} id="faq" aria-labelledby="faq-heading">
      <div className={styles.inner}>
        {/* Left column */}
        <div className={styles.leftCol}>
          <span className={styles.eyebrow}>Direct Answers</span>
          <h2 id="faq-heading" className={styles.heading}>Plain terms, zero asterisks.</h2>
          <p className={styles.body}>
            We post our operational handbook publicly so prospective residents know our standards
            before completing an application.
          </p>
        </div>

        {/* Right column */}
        <div className={styles.rightCol} role="list">
          {faqItems.map((item) => (
            <FAQItemComponent
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={isOpen(item.id)}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
