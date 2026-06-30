import Link from 'next/link';
import courses from '@/data/courses.json';
import CourseCard from '@/components/courses/CourseCard';
import ComboSavingsBanner from '@/components/courses/ComboSavingsBanner';
import GroupEnrollmentSection from '@/components/ui/GroupEnrollmentSection';
import PageScripts from '@/components/ui/PageScripts';

export const metadata = {
  title: 'All Programs',
  description: 'Live Projects, Placements Bootcamp, Case Competition Prep, and Certifications — programs built around the specific gaps MBA recruiters test for.',
};

const filterTabs = ['All', 'Bootcamp', 'Live Project', 'Case Competition', 'Certification', 'All-In-One Combo'];

export default function CoursesPage() {
  const flagship = courses.find(c => c.isFlagship);
  const others = courses.filter(c => !c.isFlagship);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 64 }} aria-labelledby="courses-h1">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 16 }}>Program Catalog</p>
          <h1 className="hero-h1" id="courses-h1">
            Programs for Every{' '}
            <span className="text-purple">Placement Gap</span>
          </h1>
          <p className="hero-sub">
            No generic curriculum. Each program maps directly to what recruiters test for — your CV, your PI, your GD, and your analytical thinking.
          </p>
          <div className="hero-ctas" style={{ marginTop: 0 }}>
            <Link href="/courses/compare" className="btn btn-secondary">Compare Programs Side-by-Side</Link>
            <Link href="/courses/all-in-one" className="btn btn-primary">See Best Value Combo</Link>
          </div>
        </div>
      </section>

      {/* ── COMBO HERO ── */}
      {flagship && (
        <section style={{ background: 'var(--purple)', padding: '64px 0' }} aria-label="Featured combo program">
          <div className="container">
            <div className="courses-flagship-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 32 }}>
              <div>
                <span className="tag-most-chosen" style={{ marginBottom: 16, display: 'inline-block' }}>Most Chosen · Best Value</span>
                <h2 style={{ color: 'var(--white)', marginBottom: 12 }}>{flagship.name}</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 24 }}>{flagship.outcomes}</p>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
                  {flagship.features.slice(0, 4).map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                      <span style={{ color: 'var(--yellow)', fontWeight: 700 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/courses/all-in-one" className="btn btn-primary">View All-In-One Details</Link>
                  <a
                    href={`https://wa.me/917042732092?text=${encodeURIComponent('Hi! I want to enroll in the All-In-One Combo.')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn"
                    style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)' }}
                  >Enroll on WhatsApp</a>
                  <Link href="/courses/compare" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)' }}>Compare with Others</Link>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-card)', padding: '32px 40px', textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', marginBottom: 8 }}>COHORT PRICE</div>
                <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--yellow)', marginBottom: 4 }}>₹{flagship.price.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'line-through', marginBottom: 16 }}>₹{flagship.originalPrice?.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 13, color: 'var(--yellow)', fontWeight: 600 }}>👥 Group discounts from 30% off</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ALL PROGRAMS GRID ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="all-programs-heading">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <h2 id="all-programs-heading" style={{ fontSize: 'clamp(22px,3vw,28px)' }}>All Programs</h2>
            <Link href="/courses/compare" className="text-link">Compare side-by-side →</Link>
          </div>

          <div className="programs-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {others.map(course => (
              <CourseCard key={course.id} course={course} showComboHint={true} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW PRICING WORKS ── */}
      <GroupEnrollmentSection />

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="cfaq-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Quick Answers</p>
            <h2 id="cfaq-heading">Before You Choose</h2>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { q: "Can I enroll in multiple programs?", a: "Yes — you can enroll in any combination. The All-In-One Combo is already the most cost-effective combination. If you have individual programs in mind, talk to us on WhatsApp to check if a custom combo discount is possible." },
              { q: "Are programs live or self-paced?", a: "Live Projects and the Bootcamp are live-format with scheduled sessions and mentor interactions. Certifications (Excel, Power BI) are self-paced with lifetime access. The All-In-One Combo includes both formats." },
              { q: "Can I join mid-semester?", a: "Yes, but enrollment timing matters. For SIP preparation, we recommend enrolling at least 10–12 weeks before your campus placement season starts. We can tell you whether the timing works for your college calendar." },
            ].map((f, i) => (
              <div key={i} className="faq-item">
                <button className="faq-question" aria-expanded="false">
                  {f.q}
                  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className="faq-answer">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: 'var(--purple)', padding: '80px 0', textAlign: 'center' }} aria-labelledby="courses-cta">
        <div className="container">
          <h2 id="courses-cta" style={{ color: 'var(--white)', marginBottom: 16 }}>Not Sure Which Program to Pick?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32 }}>Use the comparison tool or WhatsApp us — we&apos;ll match you to the right program for your timeline and domain.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses/compare" className="btn btn-primary">Compare Programs</Link>
            <a href="https://wa.me/917042732092" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      <ComboSavingsBanner />
      <PageScripts enableReveal={false} />
    </>
  );
}

