import Link from 'next/link';
import mocks from '@/data/mocks.json';

export const metadata = {
  title: 'Mock Tests — 50 Sectional Mocks',
  description: '50 sectional mock tests for MBA placements — Consulting, Finance, Marketing, Operations, and General Management. Timed, scored, with a live leaderboard.',
};

const SECTION_COLORS = {
  'Consulting': 'var(--yellow)',
  'Finance':    'var(--purple)',
  'Marketing':  'var(--blue)',
  'Operations': 'var(--white)',
  'GM':         'var(--yellow)',
  'Mixed':      'var(--bg-main)',
};

const SECTION_TEXT = {
  'Finance':  'var(--white)',
};

const liveMocks    = mocks.filter(m => m.isLive);
const comingSoon   = mocks.filter(m => !m.isLive);

// Mock leaderboard data
const LEADERBOARD = [
  { rank: 1, name: 'Aditya K.',     college: 'IIM Shillong',   score: 95, time: '18:42' },
  { rank: 2, name: 'Priya S.',      college: 'SPJIMR Mumbai',  score: 92, time: '19:05' },
  { rank: 3, name: 'Rohan M.',      college: 'NMIMS Mumbai',   score: 90, time: '17:30' },
  { rank: 4, name: 'Sneha A.',      college: 'IMT Ghaziabad',  score: 88, time: '20:12' },
  { rank: 5, name: 'Kartik B.',     college: 'IIM Rohtak',     score: 85, time: '19:55' },
];

export default function MocksPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 56 }} aria-labelledby="mocks-h1">
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <Link href="/cat-omet" style={{ fontSize: 14, color: 'var(--slate)' }}>← CAT/OMET Hub</Link>
          </div>
          <p className="eyebrow hero-eyebrow">Sectional Mock Tests</p>
          <h1 className="hero-h1" id="mocks-h1">
            50 Mocks.{' '}
            <span className="text-purple">5 Domains.</span>{' '}
            One Leaderboard.
          </h1>
          <p className="hero-sub">
            Timed mock tests built around what MBA placement interviewers actually test — not generic aptitude. Domain-specific, scored, and ranked.
          </p>
          <div className="hero-ctas">
            <Link href="#live-mocks" className="btn btn-primary">Start a Live Mock</Link>
            <Link href="#leaderboard" className="btn btn-secondary">View Leaderboard</Link>
          </div>

          {/* Stats strip */}
          <div className="hero-stat-strip" style={{ marginTop: 40 }}>
            {[
              { num: '50', label: 'Total Mock Tests' },
              { num: '5',  label: 'Domains Covered' },
              { num: '20', label: 'Questions per Mock' },
              { num: '20', label: 'Minutes Time Limit' },
            ].map(s => (
              <div key={s.label} className="hero-stat-item">
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE MOCKS ── */}
      <section id="live-mocks" style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="live-mocks-heading">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Available Now</p>
              <h2 id="live-mocks-heading">{liveMocks.length} Mocks Live &amp; Ready</h2>
            </div>
            <span style={{ background: 'var(--yellow)', border: '2px solid var(--black)', borderRadius: 50, padding: '6px 16px', fontSize: 13, fontWeight: 700, color: 'var(--black)' }}>
              🔴 {liveMocks.length} Live
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
            {liveMocks.map((m, i) => {
              const bg = Object.values(SECTION_COLORS)[i % Object.values(SECTION_COLORS).length];
              const tc = SECTION_TEXT[m.section] || 'var(--navy)';
              return (
                <article key={m.id} style={{ background: bg, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px', transition: 'transform 200ms ease, box-shadow 200ms ease' }} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <span style={{ background: 'var(--black)', color: 'var(--white)', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 50, letterSpacing: '0.06em' }}>
                      LIVE NOW
                    </span>
                    <span style={{ fontSize: 12, color: tc, opacity: 0.7, fontWeight: 600 }}>
                      {m.questionCount}Q · {m.duration}min
                    </span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: tc, marginBottom: 6, lineHeight: 1.3 }}>{m.title}</h3>
                  <p style={{ fontSize: 13, color: tc, opacity: 0.75, marginBottom: 20 }}>{m.section} Focus</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                    {(m.tags || []).map(tag => (
                      <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: tc, background: 'rgba(0,0,0,0.08)', padding: '3px 10px', borderRadius: 50 }}>{tag}</span>
                    ))}
                  </div>
                  <Link href={`/mocks/${m.id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Start Mock →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LEADERBOARD ── */}
      <section id="leaderboard" style={{ background: 'var(--navy)', padding: 'var(--section-gap) 0' }} aria-labelledby="leaderboard-heading">
        <div className="container">
          <div className="section-header" style={{ color: 'var(--white)' }}>
            <p className="eyebrow" style={{ color: 'var(--yellow)', background: 'transparent' }}>Hall of Fame</p>
            <h2 id="leaderboard-heading" style={{ color: 'var(--white)' }}>This Week&apos;s Leaderboard</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Top scorers across all live mocks. Rankings update in real-time after each submission.</p>
          </div>

          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {LEADERBOARD.map((row, i) => (
              <div key={row.rank} style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr auto',
                alignItems: 'center',
                gap: 20,
                padding: '20px 24px',
                background: i === 0 ? 'var(--yellow)' : 'rgba(255,255,255,0.06)',
                border: `2px solid ${i === 0 ? 'var(--yellow)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 16,
                marginBottom: 10,
                transition: 'background 200ms ease',
              }}>
                <div style={{ fontSize: i === 0 ? 28 : 18, fontWeight: 700, color: i === 0 ? 'var(--black)' : 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${row.rank}`}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: i === 0 ? 'var(--black)' : 'var(--white)' }}>{row.name}</div>
                  <div style={{ fontSize: 12, color: i === 0 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)', marginTop: 2 }}>{row.college}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: i === 0 ? 'var(--black)' : 'var(--yellow)' }}>{row.score}/100</div>
                  <div style={{ fontSize: 12, color: i === 0 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)', marginTop: 2 }}>in {row.time}</div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            🔒 Login to see your rank and track improvement over time.{' '}
            <Link href="/login" style={{ color: 'var(--yellow)', fontWeight: 600 }}>Login →</Link>
          </p>
        </div>
      </section>

      {/* ── COMING SOON ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="coming-soon-heading">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Releasing Weekly</p>
              <h2 id="coming-soon-heading">{comingSoon.length} More Mocks Loading...</h2>
            </div>
            <span style={{ fontSize: 14, color: 'var(--slate)' }}>New mock every Tuesday through placement season</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 16 }}>
            {comingSoon.map((m, i) => (
              <article key={m.id} style={{
                background: 'var(--white)',
                border: '2px dashed rgba(21,19,19,0.2)',
                borderRadius: 'var(--radius-card)',
                padding: '24px',
                opacity: 0.75,
              }}>
                <span style={{ background: 'var(--slate)', color: 'var(--white)', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 50, letterSpacing: '0.06em' }}>
                  COMING SOON
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginTop: 12, marginBottom: 6 }}>{m.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--slate)' }}>
                  🗓 {new Date(m.releaseDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--purple)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>Good at Mocks? Now Ace the Interview.</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32 }}>
            Mock tests build knowledge. Our Bootcamp builds performance under pressure. That&apos;s the difference between shortlisted and selected.
          </p>
          <Link href="/courses/bootcamp" className="btn btn-primary">View Placements Bootcamp →</Link>
        </div>
      </section>
    </>
  );
}
