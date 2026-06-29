import Link from 'next/link';
import courses from '@/data/courses.json';
import testimonials from '@/data/testimonials.json';
import mentors from '@/data/mentors.json';
import USPPopup from '@/components/layout/USPPopup';
import { getInitials } from '@/lib/utils';

export const metadata = {
  title: 'MBA Partner — Programs for MBA Placements',
  description: 'MBA Partner helps current MBA students land Summer Internship Placements and Final Placements through Live Projects, Case Competitions, and a Placements Bootcamp.',
};

// Scroll-reveal injected client-side via script
const statsData = [
  { num: '9.6/10', label: 'Avg. Mentor Rating' },
  { num: '5,000+', label: 'Student Network' },
  { num: '98.7%',  label: 'Placed in Desired Domain' },
];

const metricsData = [
  { target: '9.6',  suffix: '/10',  label: 'Average Mentor Rating' },
  { target: '5000', suffix: '+',    label: 'Student Network' },
  { target: '98.7', suffix: '%',    label: 'Placed in Desired Domain' },
  { target: '40',   suffix: '+',    label: 'Mentors From Top B-Schools' },
];

const pathCards = [
  { letter: 'A', title: '"I have no real project on my CV."', desc: 'Recruiters see committee work and coursework — no output, no proof of skill. A graded, client-live project is the fastest way to close that gap before placement season.', href: '/courses/live-project', cta: 'Explore Live Projects →' },
  { letter: 'B', title: '"I freeze in placement interviews."', desc: 'Domain-specific mock interviews with mentors who sat in the same room as your recruiters. Finance, Consulting, Product, Marketing — chosen before you start, not assigned randomly.', href: '/courses/bootcamp', cta: 'View the Placements Bootcamp →' },
  { letter: 'C', title: '"I want the complete package."', desc: 'One enrollment covers a Live Project, Case Competition preparation, and the full Bootcamp — the same combination most students assemble piecemeal at a higher total cost.', href: '/courses/all-in-one', cta: 'See the All-In-One Combo →' },
];

const steps = [
  { num: '01', title: 'Enroll & Onboard',               desc: 'Choose your program and domain track. Immediate access to the student community and onboarding call.' },
  { num: '02', title: 'Get Matched to a Mentor',         desc: 'Matched by domain and B-school profile within 48 hours. Your mentor placed at a company on your target list.' },
  { num: '03', title: 'Execute & Build',                  desc: 'Live Project with real client output, Case Competition rounds, and domain Bootcamp modules — all running concurrently.' },
  { num: '04', title: 'Mock Interviews & Placement Support', desc: 'Domain-specific mock interviews, CV review, and 1:1 sessions timed to your campus placement calendar.' },
];

const faqs = [
  { q: 'How much time does this take alongside coursework?', a: 'The Live Project requires 6–10 hours per week for 4–6 weeks. Bootcamp sessions are scheduled around your academic calendar — typically evenings and weekends. The All-In-One Combo is designed to run concurrently, not consecutively, so total additional time per week stays under 12 hours at peak.' },
  { q: 'Is there a placement guarantee?', a: "We do not make a placement guarantee — any platform that does is misrepresenting how campus placements work. What the 98.7% figure reflects is the proportion of our students who landed a role in their chosen domain (not just any offer). Our job is to make sure preparation isn't the reason you don't get shortlisted." },
  { q: 'Do I get 1:1 mentor access, or is it group only?', a: 'The Bootcamp includes scheduled 1:1 mock interview sessions with your matched mentor. The All-In-One Combo includes these plus group workshops and async feedback on Live Project deliverables.' },
  { q: 'Can I enroll in the All-In-One Combo if SIP season is 3 months away?', a: 'Yes — 3 months is the ideal enrollment window. It allows the Live Project to complete and be written up for your CV before campus season begins, and leaves 4–6 weeks for mock interview prep.' },
  { q: 'Can I switch domains after enrolling?', a: 'For the Bootcamp and Live Project, domain selection is confirmed at enrollment because mentor matching and project allocation are immediate. Switches are handled case by case within the first 72 hours.' },
  { q: "What's the difference between a Live Project and a Case Competition?", a: 'A Live Project is a real client engagement with a verifiable output (a deliverable you can show on your CV and discuss in interviews). A Case Competition is structured practice — high-pressure, timed problem solving that builds the analytical and presentation muscle consulting recruiters test for explicitly.' },
];

const faqLeft = faqs.slice(0, 3);
const faqRight = faqs.slice(3);

const COMPANIES = ['Accenture', 'KPMG', 'Kearney', 'Reliance', 'Pine Labs', 'JM Financial', 'Times of India', 'Media.net'];

export default function HomePage() {
  const featuredCourses = courses.slice(0, 3);
  const featuredTestimonials = testimonials.filter(t => t.isFeatured).slice(0, 3);
  const featuredMentors = mentors.filter(m => m.isFeatured).slice(0, 4);

  return (
    <>
      <USPPopup />

      {/* ── 01 HERO ── */}
      <section className="hero-section" aria-labelledby="hero-h1">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">For MBA Students Heading Into Placements</p>
              <h1 className="hero-h1" id="hero-h1">
                Committee Roles Don&apos;t Get You&nbsp;Shortlisted.{' '}
                <span className="text-purple">Outcomes Do.</span>
              </h1>
              <p className="hero-sub">
                Live Projects, Case Competitions, and a Placements Bootcamp — the three credentials that turn a thin CV into a shortlist.
              </p>

              <div className="hero-stat-strip" role="group" aria-label="Key statistics">
                {statsData.map(s => (
                  <div key={s.label} className="hero-stat-item">
                    <div className="hero-stat-num">{s.num}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="hero-ctas">
                <Link href="/courses" className="btn btn-primary">Explore Programs</Link>
                <Link href="/mentors" className="btn btn-secondary">Talk to a Mentor</Link>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-img-wrap" style={{ background: 'linear-gradient(160deg, var(--purple) 0%, #531BFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.9)', padding: 40 }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>🎓</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>Placement-Ready</div>
                  <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>in 10-12 weeks</div>
                </div>
              </div>
              <div className="hero-proof-card">
                <div className="hero-proof-num">700+</div>
                <div className="hero-proof-label">Students Mentored to&nbsp;Placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 TRUST BAR ── */}
      <div style={{ background: 'var(--white)', borderTop: '2px solid var(--black)', borderBottom: '2px solid var(--black)', padding: '28px 0' }} aria-label="Recruiters our students work at">
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 20 }}>
            Our Students Now Work At
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, overflowX: 'auto', flexWrap: 'nowrap' }} role="list">
            {COMPANIES.map((co, i) => (
              <div key={co} role="listitem" style={{ flexShrink: 0, padding: '8px 28px', borderRight: i < COMPANIES.length - 1 ? '1px solid var(--black)' : 'none' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{co}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 03 METRICS BAND ── */}
      <section className="metrics-band" aria-label="Placement outcome statistics">
        <div className="container">
          <div className="metrics-grid" role="group">
            {metricsData.map(m => (
              <div key={m.label} className="metric-tile">
                <div className="metric-num">{m.target}{m.suffix}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 PATH FINDER ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="path-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Find Your Starting Point</p>
            <h2 id="path-heading">Where Are You Starting From?</h2>
            <p>Three different students. Three different gaps. One platform built around all of them.</p>
          </div>
          <div className="cat-tools-grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {pathCards.map(c => (
              <article key={c.letter} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '36px 28px', display: 'flex', flexDirection: 'column', transition: 'transform 200ms ease, box-shadow 200ms ease' }} className="card">
                <div style={{ fontFamily: "'Kodchasan',sans-serif", fontSize: 32, fontWeight: 600, color: 'var(--yellow)', marginBottom: 16 }}>{c.letter}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.3 }}>{c.title}</div>
                <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.6, marginBottom: 20, flexGrow: 1 }}>{c.desc}</p>
                <Link href={c.href} className="text-link">{c.cta}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 FEATURED PROGRAMS ── */}
      <section id="programs" style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="programs-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Program Catalog</p>
            <h2 id="programs-heading">Programs Built Around Placement Season</h2>
            <p>Each program maps to a specific gap in your placement profile — not a generic curriculum.</p>
          </div>
          <div className="programs-grid">
            {featuredCourses.map(course => (
              <article key={course.id} className={`program-card${course.isFlagship ? ' flagship' : ''}`} aria-label={`${course.name} program`}>
                <div className="program-card-top">
                  <span className="tag-category">{course.category}</span>
                  {course.isFlagship && <span className="tag-most-chosen">Most Chosen</span>}
                </div>
                <h3 className="program-name">{course.tagline || course.name}</h3>
                <p className="program-outcome">{course.outcomes}</p>
                <div className="program-meta">
                  <span className="meta-item">{course.duration}</span>
                  <span className="meta-dot">·</span>
                  <span className="meta-item">{course.format}</span>
                  <span className="meta-dot">·</span>
                  <span className="meta-item">{course.domains}</span>
                </div>
                <div className="program-price-row">
                  <span className="price-label">Cohort Price</span>
                  <span className="price-value">₹{course.price.toLocaleString('en-IN')}</span>
                  {course.originalPrice && <span className="price-original">₹{course.originalPrice.toLocaleString('en-IN')}</span>}
                </div>
                <Link href={course.href} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>View Program</Link>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/courses" className="btn btn-secondary">See All Programs →</Link>
          </div>
        </div>
      </section>

      {/* ── 06 HOW IT WORKS ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="how-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">The Process</p>
            <h2 id="how-heading">From Enrollment to Placement</h2>
            <p>Four steps, zero ambiguity about what happens after you pay.</p>
          </div>
          <div className="steps-track" role="list">
            {steps.map(s => (
              <div key={s.num} className="step" role="listitem">
                <div className="step-num" aria-hidden="true">{s.num}</div>
                <div>
                  <div className="step-title">{s.title}</div>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 MENTOR SPOTLIGHT ── */}
      <section id="mentors" style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="mentors-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Mentors</p>
            <h2 id="mentors-heading">Placed by the Best. Now Mentoring You.</h2>
            <p>Every mentor placed at a company you are targeting. Credentials first.</p>
          </div>
          <div className="mentors-grid">
            {featuredMentors.map(m => (
              <article key={m.id} className="mentor-card">
                <div className="mentor-photo">
                  <div className="mentor-photo-placeholder">
                    <div className="mentor-avatar">{getInitials(m.name)}</div>
                  </div>
                </div>
                <div className="mentor-info">
                  <div className="mentor-credential">{m.school} · {m.role}, {m.company}</div>
                  <div className="mentor-name">{m.name}</div>
                  <span className="tag-domain">{m.domains[0]}</span>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/mentors" className="btn btn-secondary">Meet All Mentors →</Link>
          </div>
        </div>
      </section>

      {/* ── 08 TESTIMONIALS ── */}
      <section id="testimonials" style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Student Outcomes</p>
            <h2 id="testimonials-heading">The Proof Is in the Placement</h2>
            <p>Named, specific, verifiable — not anonymous satisfaction scores.</p>
          </div>

          {/* Featured quote */}
          {featuredTestimonials[0] && (
            <div style={{ textAlign: 'center', background: 'var(--bg-main)', border: '2px solid var(--black)', padding: 48, borderRadius: 'var(--radius-card)', marginBottom: 48, maxWidth: 900, margin: '0 auto 48px' }}>
              <div className="outcome-badge" style={{ justifyContent: 'center', marginBottom: 24 }}>
                <span className="outcome-badge-text">{featuredTestimonials[0].domain} → {featuredTestimonials[0].companyPlaced}</span>
              </div>
              <blockquote>
                <p style={{ fontSize: 18, color: 'var(--navy-body)', lineHeight: 1.7, fontStyle: 'italic' }}>
                  &ldquo;{featuredTestimonials[0].quote}&rdquo;
                </p>
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: 700, fontSize: 16 }}>
                  {getInitials(featuredTestimonials[0].name)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{featuredTestimonials[0].name}</div>
                  <div style={{ fontSize: 13, color: 'var(--slate)' }}>{featuredTestimonials[0].college} · {featuredTestimonials[0].program}</div>
                </div>
              </div>
            </div>
          )}

          <div className="testimonials-grid">
            {featuredTestimonials.slice(1).map(t => (
              <article key={t.id} className="testimonial-card">
                <div className="outcome-badge">
                  <span className="outcome-badge-text">{t.domain} → {t.companyPlaced}</span>
                </div>
                <blockquote>
                  <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{getInitials(t.name)}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-institution">{t.college}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/testimonials" className="btn btn-secondary">Read All Outcomes →</Link>
          </div>
        </div>
      </section>

      {/* ── 09 FAQ ── */}
      <section id="faq" style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Questions & Answers</p>
            <h2 id="faq-heading">Before You Enroll</h2>
            <p>The six questions we hear most from students comparing options.</p>
          </div>
          <FAQAccordion left={faqLeft} right={faqRight} />
        </div>
      </section>

      {/* ── 10 FINAL CTA ── */}
      <section style={{ background: 'var(--purple)', padding: 'var(--section-gap) 0', textAlign: 'center' }} aria-labelledby="cta-heading">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--white)', background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '6px 16px', borderRadius: 'var(--radius-tag)', marginBottom: 20 }}>Enroll Now</p>
          <h2 id="cta-heading" style={{ color: 'var(--white)', marginBottom: 16 }}>Placement Season Doesn&apos;t Wait. Neither Should You.</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, marginBottom: 40 }}>The students who land their target domain start preparing before everyone else does.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn btn-primary">Enroll Now</Link>
            <Link href="/courses/compare" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)' }}>Compare Programs</Link>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 24 }}>Trusted by 5,000+ MBA students · Secure checkout</p>
        </div>
      </section>

      {/* Scroll-reveal + FAQ script */}
      <FAQScript />
      <RevealScript />
    </>
  );
}

// FAQ Accordion (server-renderable, hydrated by script below)
function FAQAccordion({ left, right }) {
  return (
    <div className="faq-grid">
      <div className="faq-col">
        {left.map((f, i) => (
          <div key={i} className="faq-item">
            <button className="faq-question" aria-expanded="false">
              {f.q}
              <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="faq-answer">{f.a}</div>
          </div>
        ))}
      </div>
      <div className="faq-col">
        {right.map((f, i) => (
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
  );
}

// Inline scripts (only for progressive enhancement — no client boundary needed)
function FAQScript() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.faq-item');
          const isOpen = item.classList.contains('open');
          item.classList.toggle('open', !isOpen);
          btn.setAttribute('aria-expanded', !isOpen);
        });
      });
    ` }} />
  );
}

function RevealScript() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const els = document.querySelectorAll('.program-card, .mentor-card, .testimonial-card, .step, .faq-item, .card');
        els.forEach(el => el.classList.add('reveal'));
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
      }
    ` }} />
  );
}
