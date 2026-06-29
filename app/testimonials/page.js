'use client';
import { useState } from 'react';
import Link from 'next/link';
import testimonials from '@/data/testimonials.json';

const DOMAINS = ['All', ...Array.from(new Set(testimonials.map(t => t.domain)))];

const DOMAIN_ACCENTS = {
  'Consulting':         'var(--yellow)',
  'Finance':            'var(--purple)',
  'Investment Banking': 'var(--purple)',
  'Marketing':          'var(--blue)',
  'Product':            'var(--blue)',
  'Operations':         'var(--bg-main)',
  'General Management': 'var(--white)',
};

function StarRating({ n = 5 }) {
  return (
    <div aria-label={`${n} out of 5 stars`} style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i < n ? '#fccc42' : '#e5e7eb'} aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [domain, setDomain] = useState('All');
  const [expanded, setExpanded] = useState({});

  const filtered = domain === 'All' ? testimonials : testimonials.filter(t => t.domain === domain);
  const featured = filtered.filter(t => t.isFeatured);
  const rest      = filtered.filter(t => !t.isFeatured);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 64 }} aria-labelledby="testimonials-h1">
        <div className="container">
          <p className="eyebrow hero-eyebrow">Student Stories</p>
          <h1 className="hero-h1" id="testimonials-h1">
            200+ Students.{' '}
            <span className="text-purple">Real Outcomes.</span>
          </h1>
          <p className="hero-sub">
            From summer internship shortlists to final placements. Read what MBA Partner students say about the programs, mentors, and outcomes.
          </p>
          <div className="hero-stat-strip" style={{ marginTop: 40 }}>
            {[
              { num: '200+', label: 'Students Trained' },
              { num: '4.8',  label: 'Average Rating' },
              { num: '78%',  label: 'Got Their Top-1 Domain' },
              { num: '12+',  label: 'Colleges Represented' },
            ].map(s => (
              <div key={s.label} className="hero-stat-item">
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TESTIMONIALS ── */}
      {featured.length > 0 && (
        <section style={{ background: 'var(--purple)', padding: '80px 0' }} aria-labelledby="featured-heading">
          <div className="container">
            <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>Top Stories</p>
            <h2 id="featured-heading" style={{ color: 'var(--white)', marginBottom: 40 }}>Featured Testimonials</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
              {featured.map(t => (
                <blockquote key={t.id} style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.25)', borderRadius: 'var(--radius-card)', padding: '28px', margin: 0 }}>
                  <StarRating n={t.rating || 5} />
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: 'var(--black)', flexShrink: 0 }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {t.name}
                        {t.linkedin && (
                          <a href={t.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', color: '#0a66c2', background: 'white', borderRadius: 2 }} title={`View ${t.name} on LinkedIn`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{t.college} · Placed at {t.companyPlaced}</div>
                    </div>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FILTER + GRID ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="all-testimonials-heading">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>All Stories</p>
              <h2 id="all-testimonials-heading">Filter by Domain</h2>
            </div>
            <span style={{ fontSize: 14, color: 'var(--slate)' }}>{filtered.length} student stories</span>
          </div>

          {/* Domain filter chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {DOMAINS.map(d => (
              <button
                key={d}
                onClick={() => setDomain(d)}
                aria-pressed={domain === d}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-btn)',
                  border: `2px solid ${domain === d ? 'var(--purple)' : 'var(--hairline)'}`,
                  background: domain === d ? 'var(--purple)' : 'var(--white)',
                  color: domain === d ? 'var(--white)' : 'var(--navy)',
                  fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {[...featured, ...rest].filter(t => domain === 'All' || t.domain === domain).map((t, idx) => {
              const accent = DOMAIN_ACCENTS[t.domain] || 'var(--yellow)';
              const isLong  = t.quote.length > 200;
              const isOpen  = expanded[t.id];
              return (
                <article key={t.id} className="card" style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {/* Accent top */}
                  <div style={{ height: 8, background: accent }} aria-hidden="true" />
                  <div style={{ padding: '24px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <StarRating n={t.rating || 5} />
                    <p style={{ fontSize: 14, color: 'var(--navy-body)', lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
                      &ldquo;{isLong && !isOpen ? t.quote.slice(0, 200) + '…' : t.quote}&rdquo;
                      {isLong && (
                        <button onClick={() => setExpanded(p => ({ ...p, [t.id]: !p[t.id] }))} style={{ marginLeft: 6, fontSize: 12, color: 'var(--purple)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                          {isOpen ? 'Read less' : 'Read more'}
                        </button>
                      )}
                    </p>
                    <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {t.name}
                          {t.linkedin && (
                            <a href={t.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', color: '#0a66c2', background: 'white', borderRadius: 2 }} title={`View ${t.name} on LinkedIn`}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 2 }}>{t.college}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, background: accent, color: ['var(--purple)'].includes(accent) ? 'var(--white)' : 'var(--navy)', padding: '3px 10px', borderRadius: 'var(--radius-tag)', border: '1.5px solid var(--black)', display: 'block', marginBottom: 4 }}>{t.domain}</span>
                        <span style={{ fontSize: 11, color: 'var(--slate)' }}>→ {t.company}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ── */}
      <section style={{ background: 'var(--navy)', padding: 'var(--section-gap) 0' }} aria-labelledby="video-testimonials-heading">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 48 }}>
            <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)' }}>In Their Own Words</p>
            <h2 id="video-testimonials-heading" style={{ color: 'var(--white)' }}>Video Testimonials</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Unscripted. Real students. Real results.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {[
              { name: 'Mridul Agarwal', college: 'IIM Calcutta', domain: 'Consulting', domainColor: 'var(--yellow)', file: 'Mridul IIM Calcutta.mp4' },
              { name: 'Ananya Sharma', college: 'Welingkar Mumbai', domain: 'Marketing', domainColor: 'var(--blue)', file: 'Ananya Welingkar.mp4' },
              { name: 'Jigar Mehta', college: 'IIM Amritsar', domain: 'Finance', domainColor: 'var(--purple)', file: 'Jigar IIM Amritsar.mp4' },
              { name: 'Satwik Reddy', college: 'IMT Ghaziabad', domain: 'Operations', domainColor: 'var(--yellow)', file: 'Satwik IMT Ghaziabad.mp4' },
              { name: 'Siddhant Gupta', college: 'Delhi School of Economics', domain: 'Product Management', domainColor: 'var(--blue)', file: 'Siddhant DSE.mp4' },
              { name: 'Tushar Bhatt', college: 'GLIM Chennai', domain: 'General Management', domainColor: 'var(--yellow)', file: 'Tushar GLIM C.mp4' },
            ].map(({ name, college, domain, domainColor, file }) => (
              <div
                key={name}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ height: 4, background: domainColor }} />
                <video
                  controls
                  preload="metadata"
                  style={{ width: '100%', display: 'block', maxHeight: 210, background: '#000' }}
                  aria-label={`Video testimonial by ${name} from ${college}`}
                >
                  <source src={`/videos/${encodeURIComponent(file)}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: 14, marginBottom: 2 }}>{name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{college}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, background: domainColor, color: 'var(--navy)', padding: '4px 12px', borderRadius: 20, flexShrink: 0 }}>{domain}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>Add Your Story Next.</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginBottom: 32 }}>
            Join 200+ students who prepared with MBA Partner and landed their target domain placement.
          </p>
          <Link href="/courses" className="btn btn-primary">See All Programs →</Link>
        </div>
      </section>
    </>
  );
}
