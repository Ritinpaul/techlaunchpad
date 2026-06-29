'use client';
import { useState } from 'react';
import Link from 'next/link';
import courses from '@/data/courses.json';
import { formatRupees } from '@/lib/utils';

const ALL_FEATURES = [
  { key: 'cv', label: 'CV Review Rounds', field: 'tracker.cv', format: (v) => v > 0 ? `${v} rounds` : null },
  { key: 'pi', label: 'PI Mock Interviews', field: 'tracker.pi', format: (v) => v > 0 ? `${v} sessions` : null },
  { key: 'gd', label: 'GD Practice Sessions', field: 'tracker.gd', format: (v) => v > 0 ? `${v} sessions` : null },
  { key: 'live_project', label: 'Live Client Project', field: null,
    check: (c) => c.id === 'live-project' || c.id === 'all-in-one' },
  { key: 'case_comp', label: 'Case Competition Prep', field: null,
    check: (c) => c.id === 'case-comp' || c.id === 'all-in-one' },
  { key: 'mentor', label: 'Matched 1:1 Mentor', field: null,
    check: (c) => ['all-in-one','bootcamp'].includes(c.id) },
  { key: 'cert', label: 'Completion Certificate', field: null,
    check: () => true },
  { key: 'excel', label: 'Excel Cert Add-On', field: null,
    check: (c) => c.id === 'excel-cert' || c.id === 'powerbi-cert' },
  { key: 'group', label: 'Group Discount Available', field: null,
    check: (c) => !!c.groupOffer },
  { key: 'dashboard', label: 'Student Dashboard Access', field: null,
    check: (c) => ['all-in-one','bootcamp','live-project'].includes(c.id) },
];

const MAX_COMPARE = 4;

export default function ComparePage() {
  const [selected, setSelected] = useState(['all-in-one', 'bootcamp', 'live-project']);

  const toggle = (id) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  };

  const activeCourses = courses.filter(c => selected.includes(c.id));

  const getCellValue = (course, feature) => {
    if (feature.field) {
      const keys = feature.field.split('.');
      let val = course;
      keys.forEach(k => { val = val?.[k]; });
      return feature.format ? feature.format(val) : val;
    }
    if (feature.check) {
      return feature.check(course) ? 'yes' : 'no';
    }
    return null;
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 48 }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Compare Programs</p>
            <h1 className="hero-h1" style={{ marginBottom: 12 }}>Find the Right Fit,{' '}<span className="text-purple">Side by Side</span></h1>
            <p className="hero-sub" style={{ margin: '0 auto 0' }}>Select up to 4 programs. Everything that matters in one table.</p>
          </div>
        </div>
      </section>

      {/* ── SELECTOR ── */}
      <section style={{ background: 'var(--white)', padding: '32px 0', borderBottom: '2px solid var(--black)' }}>
        <div className="container">
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--slate)', marginBottom: 12 }}>Select programs to compare (up to {MAX_COMPARE}):</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {courses.map(c => (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                aria-pressed={selected.includes(c.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-btn)',
                  border: `2px solid ${selected.includes(c.id) ? 'var(--purple)' : 'var(--hairline)'}`,
                  background: selected.includes(c.id) ? 'var(--purple)' : 'var(--white)',
                  color: selected.includes(c.id) ? 'var(--white)' : 'var(--navy)',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: selected.length >= MAX_COMPARE && !selected.includes(c.id) ? 'not-allowed' : 'pointer',
                  opacity: selected.length >= MAX_COMPARE && !selected.includes(c.id) ? 0.5 : 1,
                  transition: 'all 200ms ease',
                }}
              >
                {c.isFlagship ? '⭐ ' : ''}{c.shortName}
              </button>
            ))}
          </div>
          {selected.length >= MAX_COMPARE && (
            <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 8 }}>Max {MAX_COMPARE} programs selected. Deselect one to add another.</p>
          )}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }}>
        <div className="container">
          {activeCourses.length < 2 ? (
            <p style={{ textAlign: 'center', color: 'var(--slate)', fontSize: 16, padding: '48px 0' }}>
              Select at least 2 programs above to start comparing.
            </p>
          ) : (
            <>
              {/* Price banner */}
              <div style={{ display: 'grid', gridTemplateColumns: `160px ${activeCourses.map(() => '1fr').join(' ')}`, gap: 0, marginBottom: 32 }}>
                <div />
                {activeCourses.map(c => {
                  let badge = null;
                  if (c.id === 'all-in-one') badge = '⭐ BEST VALUE';
                  else if (c.id === 'bootcamp') badge = '🔥 MOST POPULAR';
                  else if (c.id === 'case-comp') badge = '📈 TRENDING';

                  return (
                    <div key={c.id} style={{
                      padding: '24px 20px', textAlign: 'center', position: 'relative',
                      background: c.isFlagship ? 'var(--purple)' : 'var(--white)',
                      border: `2px solid ${c.isFlagship ? 'var(--purple)' : 'var(--black)'}`,
                      borderRadius: 'var(--radius-card)',
                      margin: '0 6px',
                    }}>
                      {badge && (
                        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--yellow)', color: 'var(--navy)', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>
                          {badge}
                        </div>
                      )}
                      <span className={c.isFlagship ? 'tag-most-chosen' : 'tag-category'} style={{ marginBottom: 8, display: 'inline-block', marginTop: badge ? 8 : 0 }}>
                        {c.category}
                      </span>
                      <div style={{ fontSize: 16, fontWeight: 700, color: c.isFlagship ? 'var(--white)' : 'var(--navy)', marginBottom: 8 }}>{c.shortName}</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: c.isFlagship ? 'var(--yellow)' : 'var(--purple)' }}>
                        {formatRupees(c.price)}
                      </div>
                      {c.originalPrice && (
                        <>
                          <div style={{ fontSize: 14, color: c.isFlagship ? 'rgba(255,255,255,0.6)' : 'var(--slate)', textDecoration: 'line-through' }}>{formatRupees(c.originalPrice)}</div>
                          <div style={{ fontSize: 13, color: c.isFlagship ? '#a7f3d0' : '#059669', fontWeight: 700, marginTop: 4 }}>Save {formatRupees(c.originalPrice - c.price)}</div>
                        </>
                      )}
                      <div style={{ marginTop: 12 }}>
                        <Link href={c.href} className="btn btn-primary" style={{ fontSize: 13, height: 40, padding: '0 16px' }}>Explore →</Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feature rows */}
              <div className="table-scroll-wrap">
                <table className="comparison-table" aria-label="Program comparison">
                  <thead>
                    <tr>
                      <th className="col-feature" style={{ textAlign: 'left' }}>Feature</th>
                      {activeCourses.map(c => (
                        <th key={c.id}>{c.shortName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col-feature">Duration</td>
                      {activeCourses.map(c => <td key={c.id}>{c.duration}</td>)}
                    </tr>
                    <tr>
                      <td className="col-feature">Format</td>
                      {activeCourses.map(c => <td key={c.id}>{c.format}</td>)}
                    </tr>
                    <tr>
                      <td className="col-feature">Domains Covered</td>
                      {activeCourses.map(c => <td key={c.id}>{c.domains}</td>)}
                    </tr>
                    {ALL_FEATURES.map(f => (
                      <tr key={f.key}>
                        <td className="col-feature">{f.label}</td>
                        {activeCourses.map(c => {
                          const val = getCellValue(c, f);
                          if (val === 'yes') return <td key={c.id}><span className="check" aria-label="Included">✓</span></td>;
                          if (val === 'no' || val === null || val === 0) return <td key={c.id}><span className="dash" aria-label="Not included">—</span></td>;
                          return <td key={c.id} className="price-cell">{val}</td>;
                        })}
                      </tr>
                    ))}
                    {/* Price row */}
                    <tr style={{ background: 'var(--bg-main)' }}>
                      <td className="col-feature" style={{ fontWeight: 700 }}>Cohort Price</td>
                      {activeCourses.map(c => (
                        <td key={c.id} className="price-cell" style={{ fontSize: 18, color: 'var(--purple)' }}>
                          {formatRupees(c.price)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom CTAs */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginTop: 48 }}>
                {activeCourses.map(c => (
                  <Link key={c.id} href={c.href} className={c.isFlagship ? 'btn btn-primary' : 'btn btn-secondary-light'}>
                    {c.isFlagship ? `⭐ Enroll in ${c.shortName}` : `Enroll in ${c.shortName}`}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── RECOMMENDATION ── */}
      <section style={{ background: 'var(--purple)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>Still Not Sure? WhatsApp Us.</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32 }}>Tell us your domain target and timeline — we&apos;ll recommend the exact program combination for you.</p>
          <a href="https://wa.me/917042732092" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Chat on WhatsApp →
          </a>
        </div>
      </section>
    </>
  );
}
