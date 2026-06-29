'use client';

import { useState, useEffect } from 'react';

const MOCK_EVENTS = [
  { user: 'Rahul, IIM-B', action: 'enrolled in All-In-One Combo', time: 'Just now' },
  { user: 'Sneha, XLRI', action: 'completed PI Mock', time: '2 mins ago' },
  { user: 'Aditya, FMS', action: 'enrolled in Live Project', time: '5 mins ago' },
  { user: 'Priya, SPJIMR', action: 'downloaded Case Comp Framework', time: '12 mins ago' },
  { user: 'Karan, MDI', action: 'scheduled CV Review', time: '18 mins ago' },
  { user: 'Rohan, IIM-L', action: 'enrolled in Bootcamp', time: '25 mins ago' }
];

export default function MockCommunity() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_EVENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const event = MOCK_EVENTS[currentIndex];

  return (
    <section style={{ background: 'var(--navy)', padding: 'var(--section-gap) 0', color: 'var(--white)' }} aria-label="Live Community Activity">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p className="eyebrow" style={{ color: 'var(--white)', background: 'rgba(255,255,255,0.1)' }}>Live Community</p>
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', marginBottom: 8, color: 'var(--white)' }}>Join 5,000+ Students Taking Action</h2>
        </div>
        
        <div style={{ maxWidth: 600, margin: '0 auto', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', alignItems: 'center', gap: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--yellow)', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
            {event.user[0]}
          </div>
          <div key={currentIndex} style={{ animation: 'fade-in-up 0.5s ease-out' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
              {event.user} <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.8)' }}>{event.action}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--yellow)' }}>{event.time}</div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
}
