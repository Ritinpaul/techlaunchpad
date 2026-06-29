'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCookie, setCookie } from '@/lib/utils';

const MESSAGES = [
  '🔥 Save ₹3,500 — All-In-One Combo: Bootcamp + Case Comp + Live Project',
  '👥 Enrolling with a friend? Get 30% off as a group!',
  '⏰ Next cohort starting soon — reserve your spot today',
  '📊 98.7% of our students placed in their desired domain',
];

export default function ComboSavingsBanner() {
  const [visible, setVisible] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    // Dismissed for 1 hour?
    if (getCookie('banner_dismissed')) return;

    // Show after 15s or scroll past 300px
    const timer = setTimeout(() => setVisible(true), 15000);
    const onScroll = () => { if (window.scrollY > 300) setVisible(true); };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Rotate messages every 4s
    const msgTimer = setInterval(() => setMsgIdx(i => (i + 1) % MESSAGES.length), 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(msgTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const dismiss = () => {
    setCookie('banner_dismissed', '1', 1);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 150,
      background: 'var(--black)',
      color: 'var(--white)',
      borderRadius: 'var(--radius-btn)',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      boxShadow: '4px 4px 0 var(--yellow)',
      border: '2px solid var(--yellow)',
      maxWidth: 'calc(100vw - 32px)',
      animation: 'toastIn 400ms cubic-bezier(0.16,1,0.3,1)',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{MESSAGES[msgIdx]}</span>
      <Link href="/courses/all-in-one" style={{ background: 'var(--yellow)', color: 'var(--black)', borderRadius: 'var(--radius-btn)', padding: '8px 18px', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
        View Combo
      </Link>
      <button onClick={dismiss} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }} aria-label="Dismiss banner">×</button>
    </div>
  );
}
