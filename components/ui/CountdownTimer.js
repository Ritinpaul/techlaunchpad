'use client';
import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate = '2026-07-10T23:59:59' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function calc() {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000)  / 60000),
        secs:  Math.floor((diff % 60000)    / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) return null;

  const units = [
    { label: 'Days',    val: timeLeft.days  },
    { label: 'Hours',   val: timeLeft.hours },
    { label: 'Mins',    val: timeLeft.mins  },
    { label: 'Secs',    val: timeLeft.secs  },
  ];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, marginBottom: 20 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#c2410c', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: 4 }}>
        Batch closes in:
      </span>
      {units.map((u, i) => (
        <span key={u.label} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: '#1a1a2e',
            color: '#fccc42',
            fontWeight: 900,
            fontSize: 20,
            lineHeight: 1,
            padding: '6px 10px',
            borderRadius: 8,
            minWidth: 44,
            textAlign: 'center',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
          }}>
            {String(u.val).padStart(2, '0')}
          </span>
          <span style={{ fontSize: 10, color: '#c2410c', fontWeight: 700, marginTop: 3, letterSpacing: '0.04em' }}>{u.label}</span>
          {i < 3 && <span style={{ position: 'absolute', marginLeft: 44 + 6 + 14 + 'px', color: '#c2410c', fontWeight: 900, fontSize: 18, lineHeight: '32px' }} />}
        </span>
      ))}
    </div>
  );
}
