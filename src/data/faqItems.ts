import type { FAQItem } from '../types';

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is your policy on pets and pet deposits?',
    answer:
      'We charge a flat $25/month pet fee with zero non-refundable deposits and zero arbitrary breed discrimination. We require basic veterinary vaccination verification and welcome up to two domestic pets per apartment.',
    defaultOpen: true,
  },
  {
    id: 'faq-2',
    question: 'How quickly are maintenance requests handled?',
    answer:
      'Emergency dispatches (heating failure in winter, active leaks, electrical faults) are acknowledged and dispatched within 2 hours. Standard residential maintenance items are addressed and resolved in under 24 hours by in-house Anchorhouse technicians.',
  },
  {
    id: 'faq-3',
    question: 'How long does the application process take?',
    answer:
      'Under 24 hours. Our screening carries a single, transparent $25 background check fee. As soon as your verified payroll or bank statements and previous rental verification are attached, a formal approval notice or clear rejection rationale is issued.',
  },
  {
    id: 'faq-4',
    question: 'Can I break my lease early if I relocate for work?',
    answer:
      'Yes. Every Anchorhouse contract features a plain-language relocation clause: deliver 60 days written notice accompanied by a standard 1-month transition fee. No continuing liability or legal entanglement once the unit is turned over in good condition.',
  },
];
