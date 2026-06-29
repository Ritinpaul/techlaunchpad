'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCookie, setCookie } from '@/lib/utils';

const USPs = [
  { icon: '📄', title: 'ATS-Optimised CV', desc: '5 rounds of expert review that get past automated filters' },
  { icon: '🏆', title: 'Case Competition Prep', desc: 'Frameworks and practice for B-school and corporate competitions' },
  { icon: '💼', title: 'Live Client Projects', desc: 'Real deliverables via Prodmark Consultants — CV-ready output' },
  { icon: '🎯', title: 'Domain-Specific Mentors', desc: 'Matched to a mentor who placed at your target company' },
];

export default function USPPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Don't show if dismissed in last 24h
    if (getCookie('usp_dismissed')) return;
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setCookie('usp_dismissed', '1', 24);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className={`usp-overlay ${open ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }} role="dialog" aria-modal="true" aria-labelledby="usp-title">
      <div className="usp-popup" style={{ position: 'relative' }}>
        <button
          onClick={dismiss}
          className="modal-close"
          aria-label="Close popup"
          style={{ position: 'absolute', top: 16, right: 16 }}
        >✕</button>

        <p className="eyebrow" style={{ marginBottom: 12 }}>Why MBA Partner</p>
        <h2 id="usp-title" style={{ fontSize: 'clamp(22px,3vw,28px)', marginBottom: 8, color: 'var(--navy)' }}>
          What Makes the Difference at Placement Season
        </h2>
        <p style={{ color: 'var(--slate)', marginBottom: 32, fontSize: 15 }}>
          Our students now work at McKinsey, Bain, Goldman Sachs, Amazon, and HUL.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {USPs.map((u) => (
            <div key={u.title} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 16, padding: '20px 16px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{u.icon}</div>
              <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15, marginBottom: 4 }}>{u.title}</div>
              <div style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.5 }}>{u.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/courses" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={dismiss}>
            Explore Programs
          </Link>
          <button className="btn btn-secondary-light" onClick={dismiss} style={{ flex: 1 }}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
