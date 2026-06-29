import Link from 'next/link';

export const metadata = {
  title: 'Free Material — MBA Partner',
  description: 'Free CV templates, GD strategy guides, PI prep checklists, and domain primers for MBA students. No paywall.',
};

const RESOURCES = [
  {
    category: 'CV Templates',
    icon: '📄',
    accent: 'var(--yellow)',
    items: [
      { name: 'MBA Summer Internship CV Template', format: 'PDF + DOCX', type: 'Template', desc: 'Single-page format used by top IIM placed students. Section-by-section guidance on what to include.', link: '#' },
      { name: 'Consulting Domain CV Template', format: 'PDF', type: 'Template', desc: 'Tailored for consulting roles — emphasises case exposure, leadership, and problem-solving.', link: '#' },
      { name: 'Finance / IB CV Template', format: 'PDF', type: 'Template', desc: 'Finance-specific layout highlighting quantitative skills, internships, and projects.', link: '#' },
    ],
  },
  {
    category: 'GD Strategy Guides',
    icon: '🗣️',
    accent: 'var(--purple)',
    items: [
      { name: 'GD Framework: Types & Strategies', format: 'PDF', type: 'Guide', desc: 'Case GD, Topic GD, Abstract GD — frameworks for entering, contributing, and summarising.', link: '#' },
      { name: '30 Most Common GD Topics for MBA 2025', format: 'PDF', type: 'Flashcards', desc: 'Current affairs, business ethics, and abstract topics with suggested positions and data points.', link: '#' },
    ],
  },
  {
    category: 'PI Checklists & Guides',
    icon: '🎯',
    accent: 'var(--blue)',
    items: [
      { name: 'PI Answer Structure: STAR Method', format: 'PDF', type: 'Guide', desc: 'Situation–Task–Action–Result format with examples for leadership, failure, and achievement questions.', link: '#' },
      { name: 'Top 25 PI Questions for MBA Placements', format: 'PDF', type: 'Flashcards', desc: 'The most common PI questions from Consulting, Finance, FMCG, and General Management interviews.', link: '#' },
      { name: 'Walk Me Through Your CV — Prep Template', format: 'PDF', type: 'Template', desc: 'A fill-in template to craft a 90-second structured CV walkthrough for any domain.', link: '#' },
    ],
  },
  {
    category: 'Domain Knowledge Primers',
    icon: '📚',
    accent: 'var(--orange)',
    items: [
      { name: 'Consulting 101: Frameworks & Case Types', format: 'PDF', type: 'Primer', desc: 'Profitability, market entry, M&A, pricing — the 5 core case types explained with sample structures.', link: '#' },
      { name: 'Finance Primer: Ratios & Valuation', format: 'PDF', type: 'Primer', desc: 'Key financial ratios, DCF basics, and valuation multiples explained for MBA placement interviews.', link: '#' },
      { name: 'Marketing Primer: 4P & Brand Analysis', format: 'PDF', type: 'Primer', desc: 'Brand positioning, GTM strategy, and consumer insight frameworks for FMCG and marketing interviews.', link: '#' },
    ],
  },
];

export default function FreeMaterialPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 64 }} aria-labelledby="free-h1">
        <div className="container">
          <p className="eyebrow hero-eyebrow">100% Free · No Registration Required</p>
          <h1 className="hero-h1" id="free-h1">
            Free Resources for{' '}
            <span className="text-purple">MBA Placements</span>
          </h1>
          <p className="hero-sub">
            CV templates, GD guides, PI frameworks, and domain primers — everything to give you a head start before you enroll. No email required.
          </p>
        </div>
      </section>

      {/* ── RESOURCE SECTIONS ── */}
      {RESOURCES.map((section, si) => (
        <section
          key={section.category}
          style={{ background: si % 2 === 0 ? 'var(--bg-main)' : 'var(--white)', padding: 'var(--section-gap) 0' }}
          aria-labelledby={`res-${si}`}
        >
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
              <div style={{ fontSize: 36, background: section.accent, border: '2px solid var(--black)', borderRadius: 16, width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {section.icon}
              </div>
              <div>
                <p className="eyebrow" style={{ marginBottom: 4 }}>Free Download</p>
                <h2 id={`res-${si}`} style={{ fontSize: 'clamp(20px,3vw,26px)' }}>{section.category}</h2>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {section.items.map((item, i) => (
                <article key={i} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 200ms ease, box-shadow 200ms ease' }} className="card">
                  <div style={{ height: 6, background: section.accent }} aria-hidden="true" />
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: section.accent, color: section.accent === 'var(--purple)' ? 'var(--white)' : 'var(--navy)', padding: '3px 10px', borderRadius: 'var(--radius-tag)', border: '1.5px solid var(--black)' }}>{item.type}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate)', padding: '3px 10px', borderRadius: 'var(--radius-tag)', border: '1.5px solid rgba(0,0,0,0.15)' }}>{item.format}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.4 }}>{item.name}</h3>
                    <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.65, flex: 1, marginBottom: 20 }}>{item.desc}</p>
                    <a
                      href={item.link}
                      aria-label={`Download ${item.name} (${item.format})`}
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      ⬇ Download Free
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CAT HUB BRIDGE ── */}
      <section style={{ background: 'var(--black)', padding: '80px 0' }} aria-labelledby="cat-bridge">
        <div className="container">
          <div className="free-cat-bridge" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', marginBottom: 16 }}>Also Free</p>
              <h2 id="cat-bridge" style={{ color: 'var(--white)', marginBottom: 16 }}>50 Mock Tests + Percentile Calculator</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
                Don&apos;t just read — practice. Our CAT/OMET hub has 50 timed sectional mocks, a percentile calculator, and a college predictor.
              </p>
              <Link href="/cat-omet" className="btn btn-primary">Visit CAT/OMET Hub →</Link>
            </div>
            <div className="free-links-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '📊', title: 'Percentile Calculator', sub: 'CAT & OMET' },
                { icon: '📝', title: '50 Mock Tests', sub: '5 domains' },
                { icon: '🎯', title: 'Profile Evaluator', sub: 'Weighted score' },
                { icon: '🏛', title: 'College Predictor', sub: 'IIM cutoffs' },
              ].map(c => (
                <div key={c.title} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--white)' }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM CTA ── */}
      <section style={{ background: 'var(--purple)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>Want More Than Templates?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32 }}>
            Free material is the start. The Bootcamp is where you apply it — with live practice, real mentor feedback, and a student dashboard tracking every session.
          </p>
          <Link href="/courses/bootcamp" className="btn btn-primary">Explore the Bootcamp →</Link>
        </div>
      </section>
    </>
  );
}
