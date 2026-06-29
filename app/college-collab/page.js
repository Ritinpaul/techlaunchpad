import Link from 'next/link';
import colleges from '@/data/colleges.json';

export const metadata = {
  title: 'College Collaborations — MBA Partner',
  description: 'MBA Partner partners with top B-Schools across India to bring placement preparation programs directly to students. See current college tie-ups.',
};

const TIER_LABELS = { 1: 'Tier 1', 2: 'Tier 2', 3: 'Tier 2+' };
const TIER_COLORS = { 1: 'var(--yellow)', 2: 'var(--blue)', 3: 'var(--bg-main)' };

const BENEFITS = [
  { icon: '🎓', title: 'Curriculum Integration', desc: 'Our programs are structured to align with your placement season calendar — not to conflict with it.' },
  { icon: '👨‍🏫', title: 'On-Campus Sessions', desc: 'We bring mentor-led sessions to campus — live PI mocks and GD simulations run inside your college.' },
  { icon: '📊', title: 'Batch Pricing', desc: 'College-level group pricing that makes it accessible for entire batches — 30–45% lower than individual rates.' },
  { icon: '📈', title: 'Placement Track Record', desc: 'We track outcomes at the college level — so you know MBA Partner has a real record at your institution.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Placement Cell Contact', desc: 'The Placement Committee or a student coordinator reaches out on behalf of the batch.' },
  { step: '02', title: 'Needs Assessment', desc: 'We understand your placement season timeline, domain split, and batch size to customise the offering.' },
  { step: '03', title: 'Batch Proposal', desc: 'We send a formal proposal within 48 hours — including pricing, session structure, and expected outcomes.' },
  { step: '04', title: 'Program Kickoff', desc: 'On confirmation, we schedule the first live session and set up the student dashboard access for the batch.' },
];

export default function CollegeCollabPage() {
  const partners = colleges.filter(c => c.isPartner);
  const exploring = colleges.filter(c => !c.isPartner);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 64 }} aria-labelledby="collab-h1">
        <div className="container">
          <p className="eyebrow hero-eyebrow">College Partnerships</p>
          <h1 className="hero-h1" id="collab-h1">
            MBA Partner at{' '}
            <span className="text-purple">Your Campus</span>
          </h1>
          <p className="hero-sub">
            We partner with B-Schools to bring placement preparation directly to students — with batch pricing, on-campus sessions, and a track record your Placement Cell can verify.
          </p>
          <div className="hero-ctas">
            <a href="https://wa.me/917042732092?text=Hi%2C%20I%27m%20from%20the%20Placement%20Committee%20and%20would%20like%20to%20discuss%20a%20college%20tie-up%20with%20MBA%20Partner." target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Talk to Us — Placement Committee
            </a>
            <Link href="#how-it-works" className="btn btn-secondary">See How It Works</Link>
          </div>

          <div className="hero-stat-strip" style={{ marginTop: 40 }}>
            {[
              { num: `${partners.length}+`, label: 'College Tie-Ups' },
              { num: '200+',  label: 'Students Prepared' },
              { num: '48hr',  label: 'Proposal Turnaround' },
              { num: '30–45%', label: 'Batch Discount vs. Individual' },
            ].map(s => (
              <div key={s.label} className="hero-stat-item">
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT PARTNERS ── */}
      {partners.length > 0 && (
        <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="partners-heading">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Active Tie-Ups</p>
              <h2 id="partners-heading">Current College Partners</h2>
              <p>These colleges have confirmed MBA Partner as an approved placement preparation partner for their batches.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {partners.map(c => (
                <article key={c.id} className="card" style={{ background: 'var(--bg-main)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: TIER_COLORS[c.tier] || 'var(--yellow)' }} aria-hidden="true" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingTop: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, background: TIER_COLORS[c.tier], color: 'var(--navy)', padding: '3px 10px', borderRadius: 'var(--radius-tag)', border: '1.5px solid var(--black)' }}>
                      {TIER_LABELS[c.tier] || 'Partner'}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      ✓ Active
                    </span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{c.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--slate)', marginBottom: 4 }}>📍 {c.city}</p>
                  {c.batchSize && <p style={{ fontSize: 13, color: 'var(--slate)' }}>👥 {c.batchSize} students per batch</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT YOUR COLLEGE GETS ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="benefits-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Partnership Benefits</p>
            <h2 id="benefits-heading">What Your College Gets</h2>
            <p>Beyond a vendor agreement — a placement outcome partner that invests in your batch&apos;s success.</p>
          </div>
          <div className="collab-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            {BENEFITS.map((b, i) => (
              <div key={b.title} style={{ padding: '36px 24px', borderRight: i < 3 ? '1px solid var(--black)' : 'none', background: i === 1 ? 'var(--purple)' : 'var(--white)' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: i === 1 ? 'var(--white)' : 'var(--navy)', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: i === 1 ? 'rgba(255,255,255,0.8)' : 'var(--slate)', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="hiw-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">The Process</p>
            <h2 id="hiw-heading">How a Tie-Up Works</h2>
            <p>From first WhatsApp to first campus session — typically 2 weeks.</p>
          </div>
          <div className="collab-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.step} style={{ position: 'relative' }}>
                {i < 3 && (
                  <div style={{ position: 'absolute', top: 28, left: 'calc(50% + 28px)', right: '-12px', height: 2, background: 'var(--black)', zIndex: 0 }} aria-hidden="true" />
                )}
                <div style={{ background: 'var(--yellow)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--purple)', marginBottom: 12 }}>{s.step}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--navy-body)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPLORING (Coming Soon colleges) ── */}
      {exploring.length > 0 && (
        <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="exploring-heading">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Coming Soon</p>
              <h2 id="exploring-heading">Colleges We&apos;re Currently in Talks With</h2>
              <p>Partnership discussions in progress — if you&apos;re from one of these colleges, WhatsApp us to fast-track the process.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {exploring.map(c => (
                <span key={c.id} style={{ background: 'var(--white)', border: '2px dashed rgba(21,19,19,0.2)', borderRadius: 'var(--radius-tag)', padding: '10px 20px', fontSize: 14, fontWeight: 600, color: 'var(--navy)', opacity: 0.8 }}>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ background: 'var(--purple)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>Is MBA Partner Right for Your Batch?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32 }}>
            WhatsApp us from the Placement Committee. We respond within 4 hours with a customised proposal for your batch size and timeline.
          </p>
          <a href="https://wa.me/917042732092?text=Hi%2C%20I%27m%20from%20the%20Placement%20Committee%20of%20[Your%20College]%20and%20want%20to%20discuss%20a%20partnership%20with%20MBA%20Partner." target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            WhatsApp the Placement Team →
          </a>
        </div>
      </section>
    </>
  );
}
