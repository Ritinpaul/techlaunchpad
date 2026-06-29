'use client';

import { useEffect } from 'react';

/**
 * Handles FAQ accordion click events and scroll-reveal animation.
 * Must be a Client Component because it uses DOM APIs inside useEffect.
 */
export default function PageScripts({ enableReveal = true }) {
  useEffect(() => {
    // FAQ accordion
    const faqBtns = document.querySelectorAll('.faq-question');
    faqBtns.forEach(btn => {
      const handler = () => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      };
      btn.addEventListener('click', handler);
    });

    // Scroll reveal
    if (enableReveal && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const els = document.querySelectorAll(
        '.program-card, .mentor-card, .testimonial-card, .step, .faq-item, .card'
      );
      els.forEach(el => el.classList.add('reveal'));
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08 });
      els.forEach(el => obs.observe(el));
    }
  }, [enableReveal]);

  return null;
}
