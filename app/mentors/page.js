import Image from 'next/image';
import Link from 'next/link';
import mentors from '@/data/mentors.json';

export const metadata = {
  title: 'Our Mentors — IIM & Big 4 Alumni',
  description: 'MBA Partner mentors are IIM, XLRI, and SPJIMR alumni working at McKinsey, Goldman Sachs, Bain, Amazon, and HUL. Real practitioners, not instructors.',
};

const DOMAIN_COLORS = {
  'Consulting':         'var(--yellow)',
  'Finance':            'var(--purple)',
  'Investment Banking': 'var(--purple)',
  'Product':            'var(--blue)',
  'Marketing':          'var(--orange)',
  'FMCG':               'var(--orange)',
  'General Management': 'var(--bg-main)',
  'HR':                 'var(--blue)',
};

export default function MentorsPage() {
  const featured = mentors.filter(m => m.isFeatured);
  const all      = mentors;

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 64 }} aria-labelledby="mentors-h1">
        <div className="container">
          <p className="eyebrow hero-eyebrow">The Mentor Network</p>
          <h1 className="hero-h1" id="mentors-h1">
            Learn from People{' '}
            <span className="text-purple">Who Made the Placement</span>
          </h1>
          <p className="hero-sub">
            Our mentors are active practitioners — not coaches. They crack cases with you, review CVs like a hiring manager, and run GD simulations based on what they see in their own firms.
          </p>
          <div className="hero-ctas">
            <Link href="/courses/bootcamp" className="btn btn-primary">Get a Matched Mentor</Link>
            <a href="https://wa.me/917042732092" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Talk to Us on WhatsApp</a>
          </div>

          {/* Trust strip */}
          <div className="hero-stat-strip" style={{ marginTop: 40 }}>
            {[
              { num: '12+', label: 'IIM & Top B-School Alumni' },
              { num: '800+', label: 'Students Mentored' },
              { num: '4',   label: 'Avg. Mentor Rating / 5' },
              { num: '1:1', label: 'Matched Mentoring Format' },
            ].map(s => (
              <div key={s.label} className="hero-stat-item">
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENTOR CARDS ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="mentor-grid-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">The Network</p>
            <h2 id="mentor-grid-heading">Meet the Mentors</h2>
            <p>Each mentor is matched to students based on target domain and college. Your mentor has done exactly what you&apos;re aiming for.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {all.map((mentor, i) => {
              const accent = DOMAIN_COLORS[mentor.domains[0]] || 'var(--yellow)';
              const isTextDark = !['var(--purple)', 'var(--orange)'].includes(accent);
              return (
                <article key={mentor.id} className="card" style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
                  {/* Top accent banner + photo */}
                  <div style={{ background: accent, padding: '32px 28px 0', position: 'relative' }}>
                    {mentor.photo ? (
                      <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--black)', background: 'var(--bg-main)' }}>
                        <Image
                          src={mentor.photo}
                          alt={`${mentor.name} — mentor photo`}
                          width={100} height={100}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      </div>
                    ) : (
                      <div style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid var(--black)', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: 'var(--yellow)' }}>
                        {mentor.name[0]}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px 28px 28px' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{mentor.name}</h3>
                    <p style={{ fontSize: 13, color: 'var(--orange)', fontWeight: 700, marginBottom: 4 }}>{mentor.company} · {mentor.role}</p>
                    <p style={{ fontSize: 13, color: 'var(--slate)', fontWeight: 600, marginBottom: 16 }}>📚 {mentor.school}</p>
                    <p style={{ fontSize: 14, color: 'var(--navy-body)', lineHeight: 1.6, marginBottom: 20 }}>{mentor.bio}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                      {mentor.domains.map(d => (
                        <span key={d} style={{ fontSize: 12, fontWeight: 700, background: accent, color: isTextDark ? 'var(--navy)' : 'var(--white)', padding: '4px 12px', borderRadius: 'var(--radius-tag)', border: '1.5px solid var(--black)' }}>
                          {d}
                        </span>
                      ))}
                    </div>
                    <Link href="/courses/bootcamp" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Get Matched to a Mentor
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW MENTORING WORKS ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="how-it-works-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">The Process</p>
            <h2 id="how-it-works-heading">How Mentoring Works</h2>
            <p>Not just a name on a page. Every enrolled student gets a matched, active mentor relationship.</p>
          </div>
          <div className="mentors-how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            {[
              { num: '01', icon: '📋', title: 'Domain Matching', desc: 'You fill a profile: target domain, MBA college, timeline. We match you to the mentor with the closest background.' },
              { num: '02', icon: '📞', title: '1:1 Intro Call', desc: 'Your mentor does a 30-min intro call — understands where you are, and customises their approach for you.' },
              { num: '03', icon: '🎯', title: 'Live Practice', desc: 'PI mocks, GD simulations, case rounds — your mentor runs them live in scheduled sessions through the program.' },
              { num: '04', icon: '📝', title: 'CV & PI Review', desc: 'Mentor reviews every CV version and gives written PI feedback. No generic templates — real hiring-manager perspective.' },
            ].map((s, i) => (
              <div key={s.num} style={{ padding: '32px 24px', borderRight: i < 3 ? '1px solid var(--black)' : 'none', background: i === 3 ? 'var(--yellow)' : 'var(--white)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--purple)', marginBottom: 8 }}>{s.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOTCAMP FEATURE IMAGE ── */}
      <section style={{ background: 'var(--navy)', padding: 0, overflow: 'hidden' }} aria-label="Mentor session photo">
        <div className="mentors-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 420 }}>
          <div style={{ position: 'relative', minHeight: 420 }}>
            <Image
              src="/images/mentor_student_session.jpg"
              alt="MBA Partner mentor working with a student in a live session"
              fill
              style={{ objectFit: 'cover' }}
              sizes="50vw"
            />
          </div>
          <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', marginBottom: 20 }}>Real Practice, Not Theory</p>
            <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>Sessions That Mirror the Real Interview</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              Your mentor runs the PI exactly like their own firm does it. No softballs. Structured pushback, real-world case framing, and specific debrief feedback after every mock.
            </p>
            <Link href="/courses/bootcamp" className="btn btn-primary">Enroll in the Bootcamp →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--purple)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>Ready for a Mentor Who Has Done It?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32 }}>Mentor matching is included in the Bootcamp and All-In-One Combo.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses/bootcamp" className="btn btn-primary">Get a Mentor — Join Bootcamp</Link>
            <Link href="/courses" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)' }}>Compare Programs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
