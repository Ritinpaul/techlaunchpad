import { notFound } from 'next/navigation';
import Link from 'next/link';
import courses from '@/data/courses.json';
import ComboSavingsBanner from '@/components/courses/ComboSavingsBanner';
import GroupEnrollModal from '@/components/courses/GroupEnrollModal';
import { formatRupees } from '@/lib/utils';

// Generate static routes for all course slugs
export async function generateStaticParams() {
  return courses.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = courses.find(c => c.slug === slug);
  if (!course) return {};
  return {
    title: course.name,
    description: course.outcomes,
  };
}

const DOMAIN_TAGS = {
  'bootcamp':     { bg: 'var(--purple)', text: 'var(--white)' },
  'live-project': { bg: 'var(--yellow)', text: 'var(--black)' },
  'case-comp':    { bg: 'var(--blue)',   text: 'var(--black)' },
  'all-in-one':   { bg: 'var(--black)', text: 'var(--white)' },
  'excel-cert':   { bg: 'var(--bg-main)', text: 'var(--black)' },
  'powerbi-cert': { bg: 'var(--bg-main)', text: 'var(--black)' },
};

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = courses.find(c => c.slug === slug);
  if (!course) notFound();

  const colors = DOMAIN_TAGS[course.slug] || { bg: 'var(--purple)', text: 'var(--white)' };
  const combo = courses.find(c => c.id === course.comboId);

  const whatsappMsg = encodeURIComponent(`Hi! I'd like to enroll in ${course.name}. Price: ₹${course.price.toLocaleString('en-IN')}`);

  return (
    <>
      {/* ── COURSE HERO ── */}
      <section className="hero-section" style={{ background: colors.bg, paddingBottom: 64 }} aria-labelledby="course-h1">
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <Link href="/courses" style={{ color: colors.text, opacity: 0.7, fontSize: 14 }}>← All Programs</Link>
          </div>
          <span className="tag-category" style={{ background: 'rgba(255,255,255,0.2)', color: colors.text, border: '1.5px solid rgba(255,255,255,0.4)', marginBottom: 20, display: 'inline-block' }}>
            {course.category}
          </span>
          <div className="course-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
            <div>
              {course.isFlagship && <span className="tag-most-chosen" style={{ marginBottom: 16, display: 'inline-block' }}>Most Chosen</span>}
              <h1 id="course-h1" style={{ color: colors.text, marginBottom: 12 }}>{course.name}</h1>
              <p style={{ color: colors.text, opacity: 0.85, fontSize: 18, lineHeight: 1.6, maxWidth: 580, marginBottom: 32 }}>{course.outcomes}</p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
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
                  id={`enroll-${course.slug}`}
                >
                  Enroll Now — ₹{course.price.toLocaleString('en-IN')}
                </a>
                {course.groupOffer && (
                  <Link href="#group-pricing" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: colors.text, border: `2px solid rgba(255,255,255,0.4)` }}>
                    👥 Group Pricing
                  </Link>
                )}
              </div>
              <p style={{ color: colors.text, opacity: 0.6, fontSize: 13, marginTop: 12 }}>
                🔥 Limited cohort · Next batch starting soon
              </p>
            </div>

            {/* Price box */}
            <div style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-card)', padding: '32px', textAlign: 'center', minWidth: 200, flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: colors.text, opacity: 0.7, letterSpacing: '0.08em', marginBottom: 8 }}>COHORT PRICE</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--yellow)', marginBottom: 4 }}>₹{course.price.toLocaleString('en-IN')}</div>
              {course.originalPrice && <div style={{ fontSize: 14, color: colors.text, opacity: 0.5, textDecoration: 'line-through', marginBottom: 16 }}>₹{course.originalPrice.toLocaleString('en-IN')}</div>}
              <div style={{ fontSize: 13, color: colors.text, opacity: 0.7 }}>One-time · All sessions included</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="features-heading">
        <div className="container">
          <div className="course-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 16 }}>What&apos;s Included</p>
              <h2 id="features-heading" style={{ marginBottom: 32 }}>Exactly What You Get</h2>
              <ul className="feature-list">
                {course.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>

            {/* Tracker summary */}
            {(course.tracker.cv + course.tracker.pi + course.tracker.gd > 0) && (
              <div>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Your Bootcamp Tracker</p>
                <h3 style={{ marginBottom: 24 }}>Progress You Can See</h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'CV Reviews', val: course.tracker.cv, color: 'var(--purple)', bg: '#f3eeff' },
                    { label: 'PI Mocks', val: course.tracker.pi, color: 'var(--yellow)', bg: 'var(--yellow)' },
                    { label: 'GD Sessions', val: course.tracker.gd, color: 'var(--blue)', bg: 'var(--blue)' },
                  ].filter(t => t.val > 0).map(t => (
                    <div key={t.label} style={{ background: t.bg, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '20px 24px', textAlign: 'center', flex: 1, minWidth: 120 }}>
                      <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--navy)' }}>{t.val}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.label}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 16 }}>Track every session in your student dashboard after enrollment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="curriculum-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Week by Week</p>
            <h2 id="curriculum-heading">The Curriculum</h2>
            <p>Designed to fit inside a full-time MBA schedule without sacrificing depth.</p>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {course.curriculum.map((c, i) => (
              <div key={i} className="grid-curriculum" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, padding: '28px 0', borderBottom: '1px solid var(--hairline)' }}>
                <div style={{ background: 'var(--black)', color: 'var(--yellow)', borderRadius: 12, padding: '8px 12px', fontSize: 12, fontWeight: 700, textAlign: 'center', alignSelf: 'flex-start' }}>{c.week}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16, marginBottom: 4 }}>{c.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROUP PRICING ── */}
      {course.groupOffer && (
        <section id="group-pricing" style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="group-heading">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Enroll Together</p>
              <h2 id="group-heading">Group Pricing for {course.name}</h2>
              <p>The more batchmates join, the less each person pays. 2 to 5 people in a group.</p>
            </div>
            <div className="courses-group-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', overflow: 'hidden', maxWidth: 700, margin: '0 auto 32px' }}>
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
              <a href={`https://wa.me/917042732092?text=${encodeURIComponent(`Hi! My group wants to enroll in ${course.name}. Please share group pricing details.`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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
            <div className="course-combo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
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

      {/* ── BOTTOM ENROLL ── */}
      <section style={{ background: 'var(--bg-main)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: 12 }}>Ready to Enroll in {course.name}?</h2>
          <p style={{ color: 'var(--slate)', fontSize: 16, marginBottom: 32 }}>Limited cohort seats · Next batch starting soon</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/917042732092?text=${whatsappMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Enroll on WhatsApp — ₹{course.price.toLocaleString('en-IN')}
            </a>
            <Link href="/courses/compare" className="btn btn-secondary-light">Compare Programs First</Link>
          </div>
        </div>
      </section>

      <ComboSavingsBanner />
    </>
  );
}
