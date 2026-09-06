import { useState, useCallback } from 'react';

interface AccordionControls {
  openId: string | null;
  toggle: (id: string) => void;
  isOpen: (id: string) => boolean;
}

export function useAccordion(initialOpenId: string | null = null): AccordionControls {
  const [openId, setOpenId] = useState<string | null>(initialOpenId);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  const isOpen = useCallback((id: string) => openId === id, [openId]);

  return { openId, toggle, isOpen };
}
