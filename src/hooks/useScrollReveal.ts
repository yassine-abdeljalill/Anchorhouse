import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  once?: boolean;
}

/**
 * Attach a GSAP ScrollTrigger reveal animation to a target element or its children.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const {
      y = 36,
      x = 0,
      opacity = 0,
      scale = 1,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      ease = 'power3.out',
      start = 'top 88%',
      once = true,
    } = options;

    const targets = stagger > 0 ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y,
          x,
          opacity,
          scale: scale !== 1 ? scale : undefined,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          stagger: stagger > 0 ? stagger : undefined,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            onRefresh: () => {
              // Ensure triggers re-evaluate after render
            },
          },
        },
      );
    }, el);

    // Refresh ScrollTrigger after brief delay for initial DOM layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement>(
  stagger = 0.12,
  options: Omit<ScrollRevealOptions, 'stagger'> = {},
) {
  return useScrollReveal<T>({ stagger, ...options });
}
