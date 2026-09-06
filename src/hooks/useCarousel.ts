import { useState, useCallback } from 'react';

interface CarouselControls {
  currentIndex: number;
  prev: () => void;
  next: () => void;
  goTo: (index: number) => void;
}

export function useCarousel(count: number): CarouselControls {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % count);
  }, [count]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < count) {
      setCurrentIndex(index);
    }
  }, [count]);

  return { currentIndex, prev, next, goTo };
}
