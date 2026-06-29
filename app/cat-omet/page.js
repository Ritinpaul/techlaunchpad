import Link from 'next/link';
import Image from 'next/image';
import mocks from '@/data/mocks.json';
import catData from '@/data/cat-data.json';

export const metadata = {
  title: 'CAT / OMET Hub — Free Resources & Mock Tests',
  description: 'Free CAT & OMET resources from MBA Partner. Percentile calculator, 50 sectional mock tests, college predictor, and profile evaluator for MBA aspirants.',
};

const SECTIONS = [
  { icon: '📊', label: 'VARC',       desc: 'Verbal Ability & Reading Comprehension' },
  { icon: '🔢', label: 'DILR',       desc: 'Data Interpretation & Logical Reasoning' },
  { icon: '📐', label: 'QA',         desc: 'Quantitative Aptitude' },
  { icon: '🎯', label: 'Full Mock',  desc: 'All 3 sections · 2 hours' },
];

const TOOLS = [
  {
    href: '/cat-omet/calculator',
    icon: '📊',
    bg: 'var(--yellow)',
    title: 'Percentile Calculator',
    desc: 'Enter your raw scores for each section and get an estimated percentile using historical data. Also predicts which IIMs you qualify for.',
    cta: 'Use Calculator →',
  },
  {
    href: '/profile-evaluator',
    icon: '🎯',
    bg: 'var(--purple)',
    textColor: 'var(--white)',
    title: 'Profile Strength Evaluator',
    desc: 'Input your academic profile, work experience, and extra-curriculars. Get a weighted score and see which IIMs your profile matches.',
    cta: 'Evaluate My Profile →',
  },
  {
    href: '/cat-omet/mocks',
    icon: '📝',
    bg: 'var(--blue)',
    title: '50 Sectional Mocks',
    desc: '5 live mocks across Consulting, Finance, Marketing, Ops, and General Management. 45 more releasing weekly through placement season.',
    cta: 'View All Mocks →',
  },
];

// Days until OMET (approximate — XAT Jan 2027)
function getDaysUntil(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
}
const daysToOmet = getDaysUntil('2027-01-05');
const daysToCAT  = getDaysUntil('2026-11-24');

const liveMocks = mocks.filter(m => m.isLive);
const upcomingMocks = mocks.filter(m => !m.isLive).slice(0, 3);

export default function CatOmetPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" aria-labelledby="cat-omet-h1" style={{ paddingBottom: 56 }}>
        <div className="container">
          <p className="eyebrow hero-eyebrow">Free for All MBA Aspirants</p>
          <h1 className="hero-h1" id="cat-omet-h1">
            CAT &amp; OMET{' '}
            <span className="text-purple">Preparation Hub</span>
          </h1>
          <p className="hero-sub">
            Free tools, sectional mocks, and a college predictor — everything you need from exam prep to IIM interview. No paywall for the basics.
          </p>
          <div className="hero-ctas">
            <Link href="/cat-omet/calculator" className="btn btn-primary">Free Percentile Calculator</Link>
            <Link href="/cat-omet/mocks" className="btn btn-secondary">View 50 Mocks</Link>
          </div>
        </div>
      </section>

      {/* ── EXAM COUNTDOWN ── */}
      <div style={{ background: 'var(--black)', padding: '40px 0' }} role="region" aria-label="Exam countdown timers">
        <div className="container">
          <div className="cat-countdown-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              { exam: 'CAT 2026', days: daysToCAT, color: 'var(--yellow)', desc: 'Expected: November 2026' },
              { exam: 'OMET / XAT', days: daysToOmet, color: 'var(--purple)', desc: 'Expected: January 2027' },
            ].map(c => (
              <div key={c.exam} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <div>
                  <div style={{ fontSize: 56, fontWeight: 700, color: c.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                    {c.days}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>days remaining</div>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--white)' }}>{c.exam}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{c.desc}</div>
                  <Link href="/courses/bootcamp" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 13, fontWeight: 600, color: c.color }}>
                    Prep with MBA Partner →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FREE TOOLS GRID ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="tools-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Free Tools</p>
            <h2 id="tools-heading">Three Tools. Zero Cost.</h2>
            <p>Built for MBA aspirants who are serious about their target percentile and college fit.</p>
          </div>
          <div className="cat-tools-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {TOOLS.map(t => (
              <Link key={t.href} href={t.href} style={{ textDecoration: 'none' }}>
                <article style={{
                  background: t.bg,
                  border: '2px solid var(--black)',
                  borderRadius: 'var(--radius-card)',
                  padding: '36px 28px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                  cursor: 'pointer',
                }} className="card">
                  <div style={{ fontSize: 48, marginBottom: 20 }} aria-hidden="true">{t.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: t.textColor || 'var(--navy)', marginBottom: 12 }}>{t.title}</h3>
                  <p style={{ fontSize: 14, color: t.textColor ? 'rgba(255,255,255,0.8)' : 'var(--slate)', lineHeight: 1.65, flex: 1, marginBottom: 20 }}>{t.desc}</p>
                  <span style={{ fontSize: 14, fontWeight: 700, color: t.textColor || 'var(--purple)' }}>{t.cta}</span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE MOCKS PREVIEW ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="mocks-preview-heading">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Live Now</p>
              <h2 id="mocks-preview-heading">5 Mocks Live. 45 Coming.</h2>
            </div>
            <Link href="/cat-omet/mocks" className="btn btn-secondary">View All 50 Mocks →</Link>
          </div>

          {/* Section breakdown */}
          <div className="cat-sections-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
            {SECTIONS.map(s => (
              <div key={s.label} style={{ background: 'var(--bg-main)', border: '2px solid var(--black)', borderRadius: 16, padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 4 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Live mocks */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
            {liveMocks.map((m, i) => {
              const bg = ['var(--yellow)','var(--purple)','var(--blue)','var(--white)','var(--yellow)'][i % 5];
              const tc = bg === 'var(--purple)' ? 'var(--white)' : 'var(--navy)';
              return (
                <Link key={m.id} href={`/mocks/${m.id}`} style={{ textDecoration: 'none' }}>
                  <article style={{ background: bg, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 24, transition: 'transform 200ms ease, box-shadow 200ms ease' }} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <span style={{ background: 'var(--black)', color: 'var(--white)', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 50 }}>LIVE</span>
                      <span style={{ fontSize: 12, color: tc, opacity: 0.7 }}>{m.questionCount}Q · {m.duration}min</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: tc, marginBottom: 6 }}>{m.title}</h3>
                    <p style={{ fontSize: 13, color: tc, opacity: 0.75, marginBottom: 16 }}>{m.section}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: tc }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Start Mock →</span>
                    </div>
                  </article>
                </Link>
              );
            })}

            {/* Coming soon previews */}
            {upcomingMocks.map(m => (
              <article key={m.id} style={{ background: 'var(--bg-main)', border: '2px dashed rgba(21,19,19,0.25)', borderRadius: 'var(--radius-card)', padding: 24, opacity: 0.7 }}>
                <span style={{ background: 'var(--slate)', color: 'var(--white)', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 50 }}>COMING SOON</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginTop: 16, marginBottom: 6 }}>{m.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--slate)' }}>Releases {new Date(m.releaseDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── IIM CUTOFFS TABLE ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="cutoffs-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Reference Data</p>
            <h2 id="cutoffs-heading">IIM Cutoffs — CAT 2025</h2>
            <p>Approximate sectional and overall cutoffs. Always verify with official college data.</p>
          </div>
          <div className="table-scroll-wrap">
            <table className="comparison-table" aria-label="IIM CAT cutoffs">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>College</th>
                  <th>Overall Cutoff</th>
                  <th>Avg. Salary (LPA)</th>
                </tr>
              </thead>
              <tbody>
                {catData.cat.colleges.map(c => (
                  <tr key={c.name}>
                    <td style={{ textAlign: 'left', fontWeight: 600, color: 'var(--navy)' }}>{c.name}</td>
                    <td><span style={{ fontWeight: 700, color: 'var(--purple)' }}>{c.cutoff99}+</span></td>
                    <td style={{ fontWeight: 600 }}>₹{c.avg_salary} LPA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--slate)', marginTop: 16 }}>
            *Mock data · Verify with official IIM admissions portals.
          </p>
        </div>
      </section>

      {/* ── GDPI BRIDGE CTA ── */}
      <section style={{ background: 'var(--purple)', padding: 'var(--section-gap) 0' }} aria-labelledby="gdpi-cta">
        <div className="container">
          <div className="cat-cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>After the CAT Score</p>
              <h2 id="gdpi-cta" style={{ color: 'var(--white)', marginBottom: 16 }}>Got the Percentile? Now Win the GDPI.</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32 }}>
                Most students prep hard for CAT and treat GDPI as an afterthought. The top performers flip that. MBA Partner&apos;s Bootcamp prepares you for both sides of the admit.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/courses/bootcamp" className="btn btn-primary">Explore the Bootcamp</Link>
                <Link href="/courses" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)' }}>
                  See All Programs
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              {[
                { num: '7', label: 'PI Mock Rounds' },
                { num: '7', label: 'GD Practice Sessions' },
                { num: '5', label: 'CV Review Rounds' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 16, padding: '16px 28px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--yellow)' }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
