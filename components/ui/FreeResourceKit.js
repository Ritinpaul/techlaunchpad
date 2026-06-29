'use client';
import Link from 'next/link';

const RESOURCES = [
  {
    id: 'cv-bank',
    title: 'CV Bank',
    count: '50+ Templates',
    desc: 'Single-page MBA CV formats used by placed students at Nomura, Deloitte, Amazon, and TAS.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    link: 'https://wa.me/917042732092?text=I%20want%20the%20free%20CV%20Bank',
    cta: 'Get on WhatsApp',
  },
  {
    id: 'interview-intel',
    title: 'Interview Intel',
    count: '300+ Transcripts',
    desc: 'Real PI question-and-answer transcripts from Consulting, Finance, FMCG, and Product companies.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    link: 'https://wa.me/917042732092?text=I%20want%20the%20Interview%20Intel%20pack',
    cta: 'Get on WhatsApp',
  },
  {
    id: 'placement-data',
    title: '5-Year Placement Data',
    count: 'IIM · XLRI · FMS · MDI',
    desc: 'Real median packages, domain-wise placement rates, and company visit lists across top B-Schools.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    link: 'https://wa.me/917042732092?text=I%20want%20the%205-Year%20Placement%20Data',
    cta: 'Get on WhatsApp',
  },
  {
    id: 'case-ppts',
    title: 'Case Study Compendium',
    count: '30+ Winning PPTs',
    desc: 'National winning case competition decks from AIR 1, AIR 6, and AIR 10 teams — fully annotated.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    link: 'https://wa.me/917042732092?text=I%20want%20the%20Case%20Study%20PPT%20Compendium',
    cta: 'Get on WhatsApp',
  },
  {
    id: 'bschool-tool',
    title: 'B-School Comparison Tool',
    count: 'Excel Sheet',
    desc: 'Real median salaries, domain strengths, and unvarnished placement stats for every top B-School.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>
      </svg>
    ),
    link: 'https://wa.me/917042732092?text=I%20want%20the%20B-School%20Comparison%20Tool',
    cta: 'Get on WhatsApp',
  },
  {
    id: 'game-plan',
    title: 'MBA Game Plan Doc',
    count: 'Month-by-Month',
    desc: 'A complete timeline of what to do from admission to Day-Zero — covering mocks, CVs, and networking.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    link: 'https://wa.me/917042732092?text=I%20want%20the%20MBA%20Game%20Plan%20Document',
    cta: 'Get on WhatsApp',
  },
];

export default function FreeResourceKit() {
  return (
    <section style={{ background: 'var(--navy)', padding: 'var(--section-gap) 0', color: 'var(--white)' }} aria-labelledby="resources-heading">
      <div className="container">
        <div className="section-header" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)' }}>100% Free · No Registration</p>
          <h2 id="resources-heading" style={{ color: 'var(--white)' }}>5 Years of Placement Intelligence</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Not ready to enroll? Start with the tools our top students used to crack their target domains.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 48 }}>
          {RESOURCES.map(res => (
            <div
              key={res.id}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-card)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(255,193,7,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--yellow)', flexShrink: 0 }}>
                  {res.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--white)' }}>{res.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--yellow)', fontWeight: 600 }}>{res.count}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, flex: 1, margin: 0 }}>{res.desc}</p>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '10px 0', borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)', color: 'var(--white)',
                  fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {res.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Free Watch Sessions */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 40 }}>
          <h3 style={{ color: 'var(--white)', fontSize: 20, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
            Free Sessions — Watch Before You Enroll
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { title: 'B-School Comparison & CV Skeleton', tag: 'CAT / OMET', url: 'https://www.youtube.com/watch?v=zZXBRobYRCE' },
              { title: 'MBA Game Plan — Full Strategy', tag: 'Placements', url: 'https://www.youtube.com/watch?v=eIgTrOVCyRw' },
              { title: 'HR Contacts Demo — Build Your Network', tag: 'Placements', url: 'https://www.youtube.com/watch?v=OhVg0Wf9JzU' },
            ].map(session => (
              <a
                key={session.title}
                href={session.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 12, transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--yellow)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--white)', marginBottom: 4 }}>{session.title}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,193,7,0.2)', color: 'var(--yellow)', padding: '2px 10px', borderRadius: 20 }}>{session.tag}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/free-material" className="btn btn-primary">See All Free Resources →</Link>
        </div>
      </div>
    </section>
  );
}
