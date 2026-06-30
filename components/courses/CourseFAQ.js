'use client';
import { useState } from 'react';

export default function CourseFAQ({ items, courseName }) {
  const [open, setOpen] = useState(null);

  if (!items || items.length === 0) return null;

  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];

  return (
    <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="course-faq-heading">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Questions</p>
          <h2 id="course-faq-heading">{courseName} — FAQ</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="faq-grid">
          {cols.map((col, ci) => (
            <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {col.map((item, i) => {
                const idx = ci * half + i;
                const isOpen = open === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      borderBottom: '1px solid var(--hairline)',
                    }}
                  >
                    <button
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '20px 0',
                        textAlign: 'left',
                        fontSize: 15,
                        fontWeight: 600,
                        color: 'var(--navy)',
                        lineHeight: 1.4,
                      }}
                    >
                      <span>{item.q}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          width: 18,
                          height: 18,
                          flexShrink: 0,
                          transition: 'transform 0.25s ease',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: 'var(--slate)',
                        }}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div
                      style={{
                        maxHeight: isOpen ? 400 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease',
                      }}
                    >
                      <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.7, paddingBottom: 20, margin: 0 }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
