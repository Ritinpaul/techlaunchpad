import Link from 'next/link';
import courses from '@/data/courses.json';
import testimonials from '@/data/testimonials.json';
import mentors from '@/data/mentors.json';
import USPPopup from '@/components/layout/USPPopup';
import ProgramWizard from '@/components/ui/ProgramWizard';
import FreeResourceKit from '@/components/ui/FreeResourceKit';
import MockCommunity from '@/components/ui/MockCommunity';
import CompetitorTable from '@/components/ui/CompetitorTable';
import SearchableFAQ from '@/components/ui/SearchableFAQ';
import PageScripts from '@/components/ui/PageScripts';
import { getInitials } from '@/lib/utils';

export const metadata = {
  title: 'MBA Partner — Programs for MBA Placements',
  description: 'MBA Partner helps current MBA students land Summer Internship Placements and Final Placements through Live Projects, Case Competitions, and a Placements Bootcamp.',
};

// Scroll-reveal injected client-side via PageScripts
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
  { num: '01', title: 'Choose Your Track',           desc: 'Pick from Placement Bootcamp, Case Competitions, Live Projects, or a Combo. Transparent pricing — no hidden fees.' },
  { num: '02', title: 'Onboard in 24 hrs',           desc: 'Get matched to your IIM alumni mentor aligned to your domain and target companies. Receive your full resource pack immediately.' },
  { num: '03', title: 'Build Your Profile',          desc: 'CV reviews, Live Projects, and Case Competition coaching. Real deliverables — not passive video watching.' },
  { num: '04', title: 'Mock & Prepare',              desc: 'Mock PIs, Mock GDs, domain prep sessions, psychometric assessments, and company-specific interview transcripts.' },
  { num: '05', title: 'Compete & Win',               desc: 'Enter case competitions with coaching from AIR 1, AIR 6, AIR 10. Add real wins to your CV before placement season.' },
  { num: '06', title: 'Land the Offer',              desc: 'Placement-verified outcomes. Avg package ₹38L+. Certificate, transcripts, and a track record ready for your dream company.' },
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

const COMPANIES = ['Tata Administrative Service', 'Times of India', 'Amazon', 'AB InBev', 'Deloitte', 'Titan', 'PwC', 'Accenture', 'Kotak', 'Nomura', 'Lodha', 'Axis Bank', 'L\'Oréal', 'HSBC', 'Media.net', 'Gulf Oil'];

// Wall of Fame — real placement data from Testimonials.xlsx
const WALL_OF_FAME = [
  { name: 'Ananyo Roy',         college: 'XLRI Jamshedpur',  company: 'TAS',            domain: 'HR',          year: '2024' },
  { name: 'Divyanshi Jaiswal',  college: 'NMIMS Mumbai',     company: 'Nomura',         domain: 'Finance',     year: '2024' },
  { name: 'Bolagani Premchand', college: 'IIM Lucknow',      company: 'Amazon',         domain: 'Marketing',   year: '2024' },
  { name: 'Aparna Sudhir',      college: 'SIBM Bangalore',   company: 'Deloitte',       domain: 'Consulting',  year: '2024' },
  { name: 'Akshita Satwal',     college: 'MDI Gurgaon',      company: 'Titan',          domain: 'Marketing',   year: '2024' },
  { name: 'Nikhil Gandhi',      college: 'NMIMS Mumbai',     company: 'AB InBev',       domain: 'Marketing',   year: '2024' },
  { name: 'Aayushi Gupta',      college: 'FMS Delhi',        company: 'Amazon',         domain: 'Operations',  year: '2025' },
  { name: 'Pavan Pawar',        college: 'SIBM Bangalore',   company: 'Ediglobe',       domain: 'Consulting',  year: '2025' },
  { name: 'Tanisha Sen',        college: 'IIM Ranchi',       company: 'Times of India', domain: 'Marketing',   year: '2025' },
  { name: 'Pradipto Mondal',    college: 'IIM Mumbai',       company: 'AAICLAS',        domain: 'Operations',  year: '2025' },
  { name: 'Yusuf Hasan',        college: 'XLRI Jamshedpur',  company: 'Deloitte',       domain: 'Consulting',  year: '2024' },
  { name: 'Madhumitha',         college: 'IIM Bangalore',    company: 'Accenture',      domain: 'Consulting',  year: '2025' },
];

const DOMAIN_COLORS = {
  'Consulting':          { bg: '#1a1a2e', accent: '#E8B86D' },
  'Finance':             { bg: '#0f1724', accent: '#60a5fa' },
  'Marketing':           { bg: '#1a0f0f', accent: '#f87171' },
  'HR':                  { bg: '#0f1a0f', accent: '#4ade80' },
  'Operations':          { bg: '#0f171a', accent: '#34d399' },
  'Product':             { bg: '#1a1000', accent: '#fbbf24' },
  'General Management':  { bg: '#1a1a1a', accent: '#a78bfa' },
};

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
          {/* MBA Student / CAT-OMET Mode Toggle */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            <Link href="/" style={{ padding: '7px 18px', borderRadius: 999, background: 'var(--navy)', color: 'var(--white)', fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '2px solid var(--navy)' }}>MBA Student</Link>
            <Link href="/cat-omet" style={{ padding: '7px 18px', borderRadius: 999, background: 'transparent', color: 'var(--navy)', fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '2px solid var(--navy)', opacity: 0.6 }}>Pre-MBA Aspirant</Link>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">India&apos;s Premier MBA Career Platform · IIM Alumni Founded · Since 2020</p>
              <h1 className="hero-h1" id="hero-h1">
                Get Mentored by the{' '}
                <span className="text-purple">Top 1%.</span><br/>
                Land Your Dream Placement.
              </h1>
              <p className="hero-sub">
                Committee PORs and graduation internships are no longer enough. Build a CV that actually clears the first cut — with IIM, XLRI and FMS mentors guiding every step.
              </p>

              <div className="hero-stat-strip" role="group" aria-label="Key statistics">
                {statsData.map(s => (
                  <div key={s.label} className="hero-stat-item">
                    <div className="hero-stat-num">{s.num}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Urgency badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff5f0', border: '1.5px solid #f97316', borderRadius: 999, padding: '6px 14px', marginBottom: 20, fontSize: 13, fontWeight: 700, color: '#c2410c' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                Next batch closing — 12 seats remaining
              </div>

              <div className="hero-ctas">
                <Link href="/courses" className="btn btn-primary">Explore Programs</Link>
                <Link href="/mentors" className="btn btn-secondary">Talk to a Mentor</Link>
              </div>
              <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 12 }}>Starting from ₹3,499 · EMI from ₹583/month · No cost EMI available</p>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-img-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="/images/mentor_student_session.jpg" alt="Mentoring session" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Cohort Snapshot Widget */}
              <div style={{ background: '#0d1117', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '20px 24px', marginTop: 16, color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>COHORT SNAPSHOT</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#4ade80', fontWeight: 700 }}>
                    <span style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
                    Live
                  </span>
                </div>
                {[
                  { label: 'Average student rating', value: '9.6', unit: '/10', color: '#f97316' },
                  { label: 'Placed in desired domain', value: '98.7', unit: '%', color: '#60a5fa' },
                  { label: 'Average package', value: '₹38L', unit: '+', color: '#4ade80' },
                  { label: 'Students mentored', value: '5,000', unit: '+', color: '#f97316' },
                  { label: 'Verified reviews', value: '700', unit: '+', color: '#facc15' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{row.label}</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: row.color }}>{row.value}<span style={{ fontSize: 12 }}>{row.unit}</span></span>
                  </div>
                ))}
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 12, textAlign: 'right' }}>Data verified · Updated batch 2024–25</p>
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
          <div className="marquee-wrapper" role="list">
            <div className="marquee-content">
              {/* First set of companies */}
              {COMPANIES.map((co) => (
                <div key={`set1-${co}`} className="marquee-item" role="listitem">
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{co}</span>
                </div>
              ))}
              {/* Second set of companies (for seamless loop) */}
              {COMPANIES.map((co) => (
                <div key={`set2-${co}`} className="marquee-item" role="listitem">
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{co}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 02.5 WIZARD ── */}
      <ProgramWizard />

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

      {/* ── 06 HOW IT WORKS — 6-step Career Roadmap ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="how-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">The Process</p>
            <h2 id="how-heading">Your MBA Career Roadmap</h2>
            <p>From enrollment to offer letter — 6 steps backed by IIM alumni who have done it themselves.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {steps.map((s, i) => {
              const accentColors = ['#fff3e0','#e3f2fd','#f3e5f5','#e8f5e9','#fff8e1','#fce4ec'];
              return (
                <div key={s.num} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px 24px', position: 'relative', overflow: 'hidden' }} className="card">
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: accentColors[i], borderRadius: '0 0 0 80px', opacity: 0.7 }} />
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: 'var(--purple)', marginBottom: 12, textTransform: 'uppercase' }}>STEP {s.num}</div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--navy)', marginBottom: 10 }}>{s.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              );
            })}
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
                  {m.photo ? (
                    <img src={m.photo} alt={`${m.name} - ${m.company}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="mentor-photo-placeholder">
                      <div className="mentor-avatar">{getInitials(m.name)}</div>
                    </div>
                  )}
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

      {/* ── 06.5 FREE RESOURCE KIT ── */}
      <FreeResourceKit />

      {/* ── 07.5 WALL OF FAME ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="wall-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Wall of Fame</p>
            <h2 id="wall-heading">Students Who Made It Big</h2>
            <p>Real students. Real companies. Real results.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {WALL_OF_FAME.map(p => {
              const color = DOMAIN_COLORS[p.domain] || '#f5f5f5';
              return (
                <div key={p.name + p.company} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '20px 20px 16px', transition: 'transform 200ms ease, box-shadow 200ms ease' }} className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, color: 'var(--navy)', flexShrink: 0, border: '2px solid var(--black)' }}>
                      {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--slate)' }}>{p.college}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--slate)', fontWeight: 600 }}>{p.year}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12, color: 'var(--slate)' }}>Placed at</span>
                      <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--navy)' }}>{p.company}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, background: color, color: 'var(--navy)', padding: '3px 10px', borderRadius: 999, border: '1.5px solid rgba(0,0,0,0.1)' }}>{p.domain}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/testimonials" className="btn btn-secondary">See All 70+ Placements →</Link>
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
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {featuredTestimonials[0].name}
                    {featuredTestimonials[0].linkedin && (
                      <a href={featuredTestimonials[0].linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', color: '#0a66c2', background: 'white', borderRadius: 2 }} title={`View ${featuredTestimonials[0].name} on LinkedIn`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </div>
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
                    <div className="testimonial-name" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {t.name}
                      {t.linkedin && (
                        <a href={t.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', color: '#0a66c2', background: 'white', borderRadius: 2 }} title={`View ${t.name} on LinkedIn`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                    </div>
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

      {/* ── VIDEO TESTIMONIALS ── */}
      <section id="video-testimonials" style={{ background: 'var(--navy)', padding: 'var(--section-gap) 0' }} aria-labelledby="video-testimonials-heading">
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
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/testimonials" className="btn btn-primary">Watch All Video Testimonials →</Link>
          </div>
        </div>
      </section>

      {/* ── 08.5 COMPETITOR TABLE ── */}
      <CompetitorTable />

      {/* ── 08.7 MOCK COMMUNITY ── */}
      <MockCommunity />

      {/* ── 09 FAQ ── */}
      <section id="faq" style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Questions & Answers</p>
            <h2 id="faq-heading">Before You Enroll</h2>
            <p>The six questions we hear most from students comparing options.</p>
          </div>
          <SearchableFAQ faqs={faqs} />
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

      {/* Scroll-reveal + FAQ — client component (no hydration issues) */}
      <PageScripts />
    </>
  );
}


