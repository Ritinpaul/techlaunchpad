'use client';
import { useState } from 'react';
import Link from 'next/link';
import courses from '@/data/courses.json';

const COMPARE_FEATURES = [
  { label: 'PI Mock Interviews',     get: c => c.tracker?.pi   > 0 ? `${c.tracker.pi} sessions`  : null },
  { label: 'GD Practice Sessions',   get: c => c.tracker?.gd   > 0 ? `${c.tracker.gd} sessions`  : null },
  { label: 'CV Review Rounds',       get: c => c.tracker?.cv   > 0 ? `${c.tracker.cv} rounds`    : null },
  { label: 'Live Client Project',    get: c => ['live-project','all-in-one'].includes(c.id) ? 'yes' : 'no' },
  { label: 'Case Competition Prep',  get: c => ['case-comp','all-in-one'].includes(c.id)    ? 'yes' : 'no' },
  { label: 'Matched 1:1 Mentor',    get: c => ['all-in-one','bootcamp'].includes(c.id)     ? 'yes' : 'no' },
  { label: 'Student Dashboard',      get: c => ['all-in-one','bootcamp','live-project'].includes(c.id) ? 'yes' : 'no' },
];

function Tick() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: '#22c55e', color: '#fff', fontWeight: 900, fontSize: 13 }}>✓</span>
  );
}
function Dash() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', color: '#999', fontWeight: 700, fontSize: 16 }}>—</span>
  );
}

export default function HomepageCompareStrip() {
  const [selected, setSelected] = useState(['all-in-one', 'bootcamp', 'live-project']);

  const toggle = (id) => {
    if (id === 'all-in-one') return; // always locked
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const activeCourses = courses
    .filter(c => selected.includes(c.id))
    .sort((a, b) => (a.id === 'all-in-one' ? -1 : b.id === 'all-in-one' ? 1 : 0));

  const selectableCourses = courses.filter(c => !['excel-cert','powerbi-cert','mock-interview','cv-review'].includes(c.id));

  return (
    <section
      id="compare-strip"
      style={{ background: 'var(--white)', padding: 'var(--section-gap) 0', borderTop: '2px solid var(--black)' }}
      aria-labelledby="compare-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: 40 }}>
          <p className="eyebrow">Side-by-Side Comparison</p>
          <h2 id="compare-heading">One Enrollment. Everything You Need.</h2>
          <p>Toggle programs to compare. Most students end up choosing the Combo — here&apos;s exactly why.</p>
        </div>

        {/* Course Selector Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
          {selectableCourses.map(c => {
            const isCombo = c.id === 'all-in-one';
            const isActive = selected.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                aria-pressed={isActive}
                style={{
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-btn)',
                  border: `2px solid ${isCombo ? 'var(--navy)' : isActive ? 'var(--navy)' : 'rgba(0,0,0,0.15)'}`,
                  background: isCombo ? 'var(--yellow)' : isActive ? 'var(--navy)' : 'var(--white)',
                  color: isCombo ? 'var(--navy)' : isActive ? 'var(--white)' : 'var(--slate)',
                  fontWeight: 700, fontSize: 14,
                  cursor: isCombo ? 'default' : 'pointer',
                  transition: 'all 200ms ease',
                  fontFamily: 'inherit',
                }}
              >
                {isCombo ? '★ ' : ''}{c.shortName}
                {isCombo && <span style={{ marginLeft: 8, fontSize: 11, background: 'rgba(0,0,0,0.12)', borderRadius: 99, padding: '2px 8px' }}>Always On</span>}
              </button>
            );
          })}
        </div>

        {/* Scrollable wrapper — perfectly unified cards using table border-spacing */}
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingTop: 16, paddingBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '14px 0', minWidth: 640 }}>
            <colgroup>
              <col style={{ width: 180 }} />
              {activeCourses.map(c => <col key={c.id} />)}
            </colgroup>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0 0 16px 0', border: 'none', background: 'transparent', verticalAlign: 'bottom' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--slate)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Feature</span>
                </th>
                {activeCourses.map(c => {
                  const isCombo = c.id === 'all-in-one';
                  const savings = c.originalPrice ? c.originalPrice - c.price : 0;
                  return (
                    <th key={c.id} style={{ 
                      textAlign: 'center', 
                      verticalAlign: 'top',
                      background: isCombo ? 'var(--navy)' : 'var(--bg-main)',
                      borderTop: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                      borderLeft: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                      borderRight: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                      borderBottom: 'none',
                      borderRadius: '20px 20px 0 0',
                      padding: '24px 16px 20px',
                      position: 'relative',
                    }}>
                      {isCombo && (
                        <div style={{
                          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                          background: 'var(--yellow)', color: 'var(--navy)', fontSize: 11, fontWeight: 900,
                          padding: '4px 14px', borderRadius: 99, whiteSpace: 'nowrap', border: '2px solid var(--navy)',
                        }}>
                          ★ MOST ENROLLED
                        </div>
                      )}
                      <div style={{ fontSize: 13, fontWeight: 700, color: isCombo ? 'rgba(255,255,255,0.65)' : 'var(--slate)', marginBottom: 6, marginTop: isCombo ? 6 : 0 }}>
                        {c.shortName}
                      </div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: isCombo ? 'var(--yellow)' : 'var(--navy)', lineHeight: 1.1 }}>
                        ₹{c.price.toLocaleString('en-IN')}
                      </div>
                      {c.originalPrice && (
                        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 12, color: isCombo ? 'rgba(255,255,255,0.4)' : 'var(--slate)', textDecoration: 'line-through' }}>₹{c.originalPrice.toLocaleString('en-IN')}</span>
                          <span style={{ fontSize: 11, fontWeight: 800, color: '#22c55e', background: 'rgba(34,197,94,0.15)', borderRadius: 99, padding: '2px 8px' }}>Save ₹{savings.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {isCombo && (
                        <div style={{ marginTop: 16 }}>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>Chosen by 63% of students</div>
                          <div style={{ background: 'rgba(252,204,66,0.12)', borderRadius: 10, padding: '10px 12px', textAlign: 'left', marginBottom: 10 }}>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: 700, marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Bundles</div>
                            {['Live Project', 'Case Comp Prep', 'Full Bootcamp'].map(item => (
                              <div key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                <span style={{ color: 'var(--yellow)', fontWeight: 900 }}>✓</span> {item}
                              </div>
                            ))}
                          </div>
                          <div style={{ fontSize: 11, color: '#fb923c', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fb923c', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                            8 seats left — Jul 10
                          </div>
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {COMPARE_FEATURES.map((feat, fi) => {
                const isEven = fi % 2 === 0;
                return (
                  <tr key={feat.label}>
                    <td style={{ padding: '14px 16px 14px 0', fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{feat.label}</td>
                    {activeCourses.map(c => {
                      const isCombo = c.id === 'all-in-one';
                      const val = feat.get(c);
                      return (
                        <td key={c.id} style={{
                          textAlign: 'center', padding: '14px 8px',
                          background: isCombo ? (isEven ? 'rgba(0,0,0,0.03)' : 'transparent') : (isEven ? 'var(--bg-main)' : 'var(--white)'),
                          borderLeft: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                          borderRight: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                          borderTop: 'none',
                          borderBottom: 'none',
                        }}>
                          {val === 'yes' ? <Tick /> :
                           val === 'no' || val === null ? <Dash /> :
                           <span style={{ fontSize: 13, fontWeight: 700, color: isCombo ? 'var(--navy)' : 'var(--slate)' }}>{val}</span>}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Price row */}
              <tr>
                <td style={{ padding: '18px 16px 0 0', fontSize: 12, fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cohort Price</td>
                {activeCourses.map(c => {
                  const isCombo = c.id === 'all-in-one';
                  return (
                    <td key={c.id} style={{
                      textAlign: 'center', padding: '24px 8px 12px',
                      background: isCombo ? 'transparent' : 'var(--white)',
                      borderLeft: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                      borderRight: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                      borderTop: `1px dashed ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.15)'}`,
                      borderBottom: 'none',
                    }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: isCombo ? 'var(--navy)' : 'var(--slate)' }}>₹{c.price.toLocaleString('en-IN')}</span>
                    </td>
                  );
                })}
              </tr>

              {/* CTA row */}
              <tr>
                <td style={{ padding: '0 16px 24px 0' }} />
                {activeCourses.map(c => {
                  const isCombo = c.id === 'all-in-one';
                  return (
                    <td key={c.id} style={{
                      textAlign: 'center', padding: '12px 12px 24px',
                      background: isCombo ? 'transparent' : 'var(--white)',
                      borderLeft: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                      borderRight: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                      borderBottom: `2px solid ${isCombo ? 'var(--navy)' : 'rgba(0,0,0,0.12)'}`,
                      borderTop: 'none',
                      borderRadius: '0 0 20px 20px',
                    }}>
                      <Link href={c.href} style={{
                        display: 'block',
                        padding: isCombo ? '14px 22px' : '10px 18px',
                        borderRadius: 'var(--radius-btn)',
                        background: isCombo ? 'var(--orange)' : 'var(--white)',
                        color: isCombo ? 'var(--white)' : 'var(--navy)',
                        border: isCombo ? 'none' : '2px solid var(--navy)',
                        fontWeight: 700, fontSize: isCombo ? 14 : 13,
                        textDecoration: 'none', whiteSpace: 'nowrap',
                      }}>
                        {isCombo ? 'Enroll in All-In-One →' : 'Explore →'}
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>


        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <Link href="/courses/compare" className="btn btn-secondary">See Full Comparison — All Programs →</Link>
        </div>
      </div>
    </section>
  );
}
