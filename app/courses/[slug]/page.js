import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import courses from '@/data/courses.json';
import courseDetails from '@/data/courseDetails';
import ComboSavingsBanner from '@/components/courses/ComboSavingsBanner';
import CourseFAQ from '@/components/courses/CourseFAQ';
import { formatRupees } from '@/lib/utils';

// Brochure Drive links (view only)
const BROCHURES = {
  'case-comp':    { url: 'https://drive.google.com/file/d/11lxjrZXK0_e4lbgVp0hf7gPVL1ckb_ef/view', label: 'Case Comp Brochure (PDF)' },
  'live-project': { url: 'https://drive.google.com/file/d/1hXQ56KLgo9Pxyv2MvWXndg_yJtG4wXSV/view', label: 'Live Project Brochure' },
  'bootcamp':     { url: null, label: null },
  'all-in-one':   { url: null, label: null },
  'excel-cert':   { url: null, label: null },
  'powerbi-cert': { url: null, label: null },
};

const MENTORS = [
  { img: '/images/aisha.jpg',  name: 'Aisha Verma',   cred: 'IIM Ahmedabad · ex-Strategy, Accenture', domain: 'Consulting' },
  { img: '/images/rohan.jpg',  name: 'Rohan Sharma',  cred: 'IIM Bangalore · ex-Product, Media.net',  domain: 'Product'    },
  { img: '/images/Priya.jpg',  name: 'Priya Krishnan', cred: 'IIM Calcutta · ex-Finance, JM Financial', domain: 'Finance'   },
  { img: '/images/arjun.jpg',  name: 'Arjun Mehta',   cred: 'XLRI · ex-Marketing, Reliance Retail',   domain: 'Marketing'  },
];

const DOMAIN_COLORS = {
  'bootcamp':     { bg: 'var(--purple)', text: 'var(--white)' },
  'live-project': { bg: 'var(--yellow)', text: 'var(--black)' },
  'case-comp':    { bg: 'var(--blue)',   text: 'var(--black)' },
  'all-in-one':   { bg: 'var(--navy)',   text: 'var(--white)' },
  'excel-cert':   { bg: 'var(--bg-main)', text: 'var(--black)' },
  'powerbi-cert': { bg: 'var(--bg-main)', text: 'var(--black)' },
};

export async function generateStaticParams() {
  return courses.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = courses.find(c => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.name} | MBA Partner`,
    description: course.outcomes,
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = courses.find(c => c.slug === slug);
  if (!course) notFound();

  const colors  = DOMAIN_COLORS[course.slug] || { bg: 'var(--purple)', text: 'var(--white)' };
  const combo   = courses.find(c => c.id === course.comboId);
  const brochure = BROCHURES[course.slug];
  const detail  = courseDetails[course.slug] || {};

  const whatsappMsg = encodeURIComponent(
    `Hi! I'd like to enroll in ${course.name}. Price: ₹${course.price.toLocaleString('en-IN')}`
  );

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ background: colors.bg, paddingBottom: 72 }} aria-labelledby="course-h1">
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <Link href="/courses" style={{ color: colors.text, opacity: 0.7, fontSize: 14 }}>← All Programs</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 56, alignItems: 'start' }}>
            {/* LEFT copy */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span className="tag-category" style={{ background: 'rgba(255,255,255,0.2)', color: colors.text, border: '1.5px solid rgba(255,255,255,0.4)' }}>
                  {course.category}
                </span>
                {course.isFlagship && <span className="tag-most-chosen">Most Chosen</span>}
              </div>

              <h1 id="course-h1" style={{ color: colors.text, marginBottom: 14, fontSize: 'clamp(28px,4vw,46px)', lineHeight: 1.15 }}>
                {course.name}
              </h1>
              <p style={{ color: colors.text, opacity: 0.85, fontSize: 17, lineHeight: 1.65, maxWidth: 560, marginBottom: 28 }}>
                {course.outcomes}
              </p>

              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 28 }}>
                {[
                  { icon: '📅', label: course.duration },
                  { icon: '🖥️', label: course.format },
                  { icon: '🎯', label: course.domains },
                ].map(m => (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.text }}>
                    <span>{m.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{m.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/917042732092?text=${whatsappMsg}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary"
                  id={`enroll-hero-${course.slug}`}
                >
                  Enroll Now — ₹{course.price.toLocaleString('en-IN')}
                </a>
                {brochure?.url ? (
                  <a href={brochure.url} target="_blank" rel="noopener noreferrer"
                    className="btn"
                    style={{ background: 'rgba(255,255,255,0.15)', color: colors.text, border: '2px solid rgba(255,255,255,0.4)' }}>
                    📄 View Brochure
                  </a>
                ) : (
                  <a href={`https://wa.me/917042732092?text=${encodeURIComponent(`Hi! Can you share the brochure for ${course.name}?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn"
                    style={{ background: 'rgba(255,255,255,0.15)', color: colors.text, border: '2px solid rgba(255,255,255,0.4)' }}>
                    📄 Get Brochure
                  </a>
                )}
                {course.groupOffer && (
                  <Link href="#group-pricing" className="btn"
                    style={{ background: 'rgba(255,255,255,0.15)', color: colors.text, border: '2px solid rgba(255,255,255,0.4)' }}>
                    👥 Group Pricing
                  </Link>
                )}
              </div>
              <p style={{ color: colors.text, opacity: 0.6, fontSize: 13, marginTop: 12 }}>
                🔥 Limited cohort · Next batch starting soon
              </p>
            </div>

            {/* RIGHT sticky enroll panel */}
            <aside aria-label="Enrollment details">
              <div style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-card)',
                padding: 28,
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                position: 'sticky',
                top: 88,
              }}>
                {course.isFlagship && (
                  <div style={{ marginBottom: 14 }}>
                    <span className="tag-most-chosen">Most Chosen Program</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: 'var(--navy)', fontVariantNumeric: 'tabular-nums' }}>
                    ₹{course.price.toLocaleString('en-IN')}
                  </span>
                  {course.originalPrice && (
                    <span style={{ fontSize: 16, color: 'var(--slate)', textDecoration: 'line-through' }}>
                      ₹{course.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                {course.originalPrice ? (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                    <div style={{ display: 'inline-block', background: '#ecfdf5', color: '#059669', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
                      Save ₹{(course.originalPrice - course.price).toLocaleString('en-IN')}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
                      💳 EMI from ₹{Math.round(course.price / 12).toLocaleString('en-IN')}/mo
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
                      💳 EMI from ₹{Math.round(course.price / 12).toLocaleString('en-IN')}/mo
                    </div>
                  </div>
                )}
                <p style={{ fontSize: 12, color: 'var(--slate)', marginBottom: 16 }}>Cohort Price · One-time payment</p>
                <hr style={{ border: 'none', borderTop: '1px solid var(--hairline)', marginBottom: 16 }} />

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {course.features.slice(0, 5).map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--navy)', lineHeight: 1.4 }}>
                      <span style={{ color: '#059669', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/917042732092?text=${whatsappMsg}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: 'block', width: '100%', textAlign: 'center', marginBottom: 10 }}
                >
                  Reserve My Spot
                </a>
                <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--slate)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span style={{ color: '#f59e0b', fontSize: 14 }}>★★★★★</span>
                  <span style={{ fontWeight: 600, color: 'var(--navy)' }}>4,200+</span> students enrolled
                </div>
                <a
                  href={`https://wa.me/917042732092?text=${encodeURIComponent(`Hi! I'd like to book a consultation about ${course.name}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ display: 'block', width: '100%', textAlign: 'center' }}
                >
                  Book Consultation
                </a>
                <p style={{ fontSize: 12, color: 'var(--slate)', textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
                  Our team will confirm your cohort date within 24 hours.
                </p>
                <div style={{ borderTop: '1px solid var(--hairline)', marginTop: 16, paddingTop: 14, display: 'flex', gap: 16, justifyContent: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--slate)', display: 'flex', alignItems: 'center', gap: 4 }}>✅ 100% Refund Policy</span>
                  <span style={{ fontSize: 12, color: 'var(--slate)', display: 'flex', alignItems: 'center', gap: 4 }}>💳 No-Cost EMI</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── OUTCOME PROMISE BAND ── */}
      {detail.outcomeTiles && (
        <div style={{ background: 'var(--navy)', padding: '0' }} aria-label="What this program delivers">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
              {detail.outcomeTiles.map((tile, i) => (
                <div key={i} style={{
                  padding: '36px 32px',
                  borderRight: i < detail.outcomeTiles.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--yellow)', marginBottom: 10, lineHeight: 1.3 }}>{tile.title}</div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>{tile.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── WHAT YOU GET ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="features-heading">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>What&apos;s Included</p>
              <h2 id="features-heading" style={{ marginBottom: 28 }}>Exactly What You Get</h2>
              <ul className="feature-list">
                {course.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
            {(course.tracker.cv + course.tracker.pi + course.tracker.gd > 0) && (
              <div>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Your Bootcamp Tracker</p>
                <h3 style={{ marginBottom: 24 }}>Progress You Can See</h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'CV Reviews', val: course.tracker.cv, bg: '#f3eeff' },
                    { label: 'PI Mocks',   val: course.tracker.pi, bg: 'var(--yellow)' },
                    { label: 'GD Sessions', val: course.tracker.gd, bg: 'var(--blue)' },
                  ].filter(t => t.val > 0).map(t => (
                    <div key={t.label} style={{ background: t.bg, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '20px 24px', textAlign: 'center', flex: 1, minWidth: 100 }}>
                      <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--navy)' }}>{t.val}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.label}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 16 }}>Track every session in your student dashboard after enrollment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MODULES / PROGRAM STRUCTURE ── */}
      {detail.modules && (
        <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="modules-heading">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Program Structure</p>
              <h2 id="modules-heading">
                {course.slug === 'bootcamp' ? '6 Weeks. Zero Filler.' : "What's Included"}
              </h2>
              <p>
                {course.slug === 'bootcamp'
                  ? 'Every module maps to a specific gap in your interview readiness — not a generic curriculum.'
                  : course.slug === 'case-comp'
                  ? '4 Rounds. Progressive Difficulty. Each round builds on the last.'
                  : course.slug === 'live-project'
                  ? 'Four steps. Zero ambiguity about what happens after you pay.'
                  : 'Six modules running concurrently over 10–12 weeks — designed around your academic calendar.'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {detail.modules.map((mod, i) => (
                <div key={i} style={{
                  background: 'var(--white)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--radius-card)',
                  padding: '24px 20px',
                }}>
                  <div style={{ display: 'inline-block', background: 'var(--black)', color: 'var(--yellow)', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, marginBottom: 12 }}>
                    {mod.num}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.3 }}>{mod.name}</div>
                  <p style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.6, margin: 0 }}>{mod.desc}</p>
                  {mod.duration && (
                    <div style={{ marginTop: 14, fontSize: 11, fontWeight: 700, color: 'var(--purple)', background: '#f3eeff', borderRadius: 6, padding: '3px 8px', display: 'inline-block' }}>
                      {mod.duration}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── WHO THIS IS NOT FOR ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="not-for-heading">
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ background: 'var(--bg-main)', border: '2px solid var(--black)', borderRadius: 24, padding: '48px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: 'var(--yellow)' }}></div>
            <h2 id="not-for-heading" style={{ fontSize: 24, marginBottom: 16 }}>Who This Is <span style={{ color: 'var(--purple)', textDecoration: 'underline' }}>NOT</span> For</h2>
            <p style={{ color: 'var(--slate)', fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>We want to be upfront. This program requires serious commitment. Do not enroll if any of the following apply to you:</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                "You aren't willing to put in 4-5 hours per week of active effort.",
                "You already have a highly optimized CV and 3+ live projects.",
                "You expect a magic pill without practicing mock interviews.",
                "Your placement season is more than 12 months away (wait for the next cohort)."
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--navy)', lineHeight: 1.5 }}>
                  <span style={{ color: '#ef4444', fontWeight: 900, fontSize: 18, lineHeight: 1 }}>×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM (timeline view) ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="curriculum-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Week by Week</p>
            <h2 id="curriculum-heading">The Curriculum</h2>
            <p>Designed to fit inside a full-time MBA schedule without sacrificing depth.</p>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            {course.curriculum.map((c, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, padding: '28px 0', borderBottom: '1px solid var(--hairline)' }}>
                <div style={{ background: 'var(--black)', color: 'var(--yellow)', borderRadius: 12, padding: '8px 12px', fontSize: 12, fontWeight: 700, textAlign: 'center', alignSelf: 'flex-start' }}>{c.week}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16, marginBottom: 4 }}>{c.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      {detail.idealProfiles && (
        <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="ideal-heading">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Ideal Student Profile</p>
              <h2 id="ideal-heading">Who This Is For</h2>
              <p>Three student profiles this program is built around. If you recognise yourself in any of them, this is the right next step.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {detail.idealProfiles.map((prof, i) => (
                <div key={i} style={{
                  background: 'var(--white)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--radius-card)',
                  padding: 28,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ background: 'var(--yellow)', color: 'var(--navy)', borderRadius: 99, padding: '2px 9px', fontSize: 11 }}>{prof.label}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)', marginBottom: 12, lineHeight: 1.4, fontStyle: 'italic' }}>{prof.statement}</div>
                  <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.65, margin: 0 }}>{prof.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MENTORS ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="mentors-detail-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Your Mentors</p>
            <h2 id="mentors-detail-heading">Placed by the Best. Now Mentoring You.</h2>
            <p>Every mentor in this program placed at a company on your target list. Matched by domain and B-school profile within 48 hours of enrollment.</p>
          </div>
          <div className="mentors-grid">
            {MENTORS.map(m => (
              <article key={m.name} className="mentor-card">
                <div className="mentor-photo">
                  <Image src={m.img} alt={m.name} width={400} height={500} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
                <div className="mentor-info">
                  <div className="mentor-credential">{m.cred}</div>
                  <div className="mentor-name">{m.name}</div>
                  <span className="tag-domain">{m.domain}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {detail.testimonials && (
        <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="course-testimonials-heading">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Student Outcomes</p>
              <h2 id="course-testimonials-heading">{course.name} Alumni</h2>
              <p>Named, specific, verifiable outcomes — from students who enrolled in this exact program.</p>
            </div>
            <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {detail.testimonials.map((t, i) => (
                <article key={i} style={{
                  background: 'var(--white)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--radius-card)',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}>
                  <div style={{ display: 'inline-block', background: 'var(--black)', color: 'var(--yellow)', borderRadius: 99, padding: '5px 14px', fontSize: 11, fontWeight: 700 }}>
                    {t.badge}
                  </div>
                  <blockquote style={{ margin: 0, flex: 1 }}>
                    <p style={{ fontSize: 14, color: 'var(--navy)', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>{t.quote}</p>
                  </blockquote>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--purple)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--slate)' }}>{t.institution}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── GROUP PRICING ── */}
      {course.groupOffer && (
        <section id="group-pricing" style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="group-heading">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Enroll Together</p>
              <h2 id="group-heading">Group Pricing for {course.name}</h2>
              <p>The more batchmates join, the less each person pays. 2 to 5 people in a group.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', overflow: 'hidden', maxWidth: 700, margin: '0 auto 32px' }}>
              {[
                { size: '2 People', disc: 30, bg: 'var(--white)' },
                { size: '3 People', disc: 35, bg: 'var(--white)' },
                { size: '4 People', disc: 40, bg: 'var(--white)' },
                { size: '5 People', disc: 45, bg: 'var(--yellow)' },
              ].map((row, i) => {
                const perPerson = Math.round(course.price * (1 - row.disc / 100));
                return (
                  <div key={row.size} style={{ padding: '24px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--black)' : 'none', background: row.bg }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--purple)', marginBottom: 4 }}>{row.disc}% Off</div>
                    <div style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 600, marginBottom: 8 }}>{row.size}</div>
                    <div style={{ fontSize: 12, color: 'var(--slate)' }}>₹{perPerson.toLocaleString('en-IN')}/person</div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center' }}>
              <a href={`https://wa.me/917042732092?text=${encodeURIComponent(`Hi! My group wants to enroll in ${course.name}. Please share group pricing details.`)}`}
                target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Discuss Group Enrollment on WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── COMBO UPSELL ── */}
      {combo && (
        <section style={{ background: 'var(--purple)', padding: '80px 0' }} aria-label="Combo upsell">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
              <div>
                <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.2)', marginBottom: 12 }}>Better Together</p>
                <h2 style={{ color: 'var(--white)', marginBottom: 12 }}>Get More for Less with the {combo.name}</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>
                  {course.name} is already strong — but combined in the All-In-One, you save ₹{course.comboSavings?.toLocaleString('en-IN')} and get the Bootcamp + Live Project + Case Comp in one enrollment.
                </p>
                <Link href="/courses/all-in-one" className="btn btn-primary">See All-In-One Pricing →</Link>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-card)', padding: '28px 32px', textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Save up to</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--yellow)' }}>₹{course.comboSavings?.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>with the combo</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── BROCHURE DOWNLOAD ── */}
      {brochure?.url && (
        <section style={{ background: 'var(--navy)', padding: '56px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 60, height: 60, background: 'var(--yellow)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>📄</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginBottom: 4 }}>FREE DOWNLOAD</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>{brochure.label}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Full course details, fees, curriculum, and outcomes — all in one document</div>
                </div>
              </div>
              <a href={brochure.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flexShrink: 0 }}>
                ⬇ Open Brochure
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── PER-COURSE FAQ ── */}
      <CourseFAQ items={detail.faq} courseName={course.name} />

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0', textAlign: 'center' }} aria-labelledby="bottom-cta-heading">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Reserve Your Spot</p>
          <h2 id="bottom-cta-heading" style={{ color: 'var(--white)', marginBottom: 12, marginTop: 12, fontSize: 'clamp(24px,4vw,38px)' }}>
            Ready to Enroll in {course.name}?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 32 }}>Limited cohort seats · Next batch starting soon</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/917042732092?text=${whatsappMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '16px 32px', fontSize: 16 }}
            >
              Enroll in {course.shortName} →
            </a>
            <Link href="/courses/compare" className="btn btn-secondary-light">Compare Programs First</Link>
          </div>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span style={{ color: '#f59e0b', fontSize: 14 }}>★★★★★</span>
            <span style={{ fontWeight: 600, color: 'var(--white)' }}>4,200+</span> students enrolled
          </div>
        </div>
      </section>

      <ComboSavingsBanner />
    </>
  );
}
