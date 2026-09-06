// ── Shared TypeScript interfaces for Anchorhouse ──

export interface Listing {
  id: string;
  neighborhood: string;
  rent: number;
  address: string;
  beds: string;
  baths: string;
  sqft: number;
  amenities: string;
  available: string;
  imageUrl: string;
  imageAlt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  tenure: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export type PortalTabKey = 'pay' | 'maint' | 'docs';

export interface PortalTab {
  key: PortalTabKey;
  label: string;
}
