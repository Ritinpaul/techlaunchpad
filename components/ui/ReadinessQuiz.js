'use client';
import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
  {
    id: 'cv',
    question: 'Does your CV have a real, verifiable project on it?',
    sub: 'Not committee work. A deliverable a recruiter can see.',
    options: [
      { label: 'Yes — a strong live project', value: 2 },
      { label: 'I have coursework but no real project', value: 1 },
      { label: 'No, my CV is mostly PORs and academics', value: 0 },
    ],
  },
  {
    id: 'mock',
    question: 'How many mock PI or GD sessions have you done?',
    sub: 'With someone who has actually sat on the other side of the table.',
    options: [
      { label: '5+ structured mock sessions', value: 2 },
      { label: '1–4 sessions with peers', value: 1 },
      { label: 'None yet', value: 0 },
    ],
  },
  {
    id: 'domain',
    question: 'Have you locked in your target domain?',
    sub: 'Consulting, Finance, Marketing, Product, Operations — not "open to anything".',
    options: [
      { label: 'Yes — 1 primary domain, 2 backup', value: 2 },
      { label: 'Leaning toward one but not sure', value: 1 },
      { label: 'Still figuring it out', value: 0 },
    ],
  },
  {
    id: 'company',
    question: 'Do you have a shortlist of 3–5 target companies?',
    sub: 'Companies you\'ve researched — culture, interview style, what they hire for.',
    options: [
      { label: 'Yes — researched and prioritized', value: 2 },
      { label: 'A rough list but no real research', value: 1 },
      { label: 'No clear target companies yet', value: 0 },
    ],
  },
];

const RESULTS = [
  {
    min: 0, max: 2,
    label: 'Just Getting Started',
    color: '#f97316',
    desc: 'You\'re at ground zero — and that\'s exactly the right time to start. The students who enroll earliest have the most time to build something real before placement season.',
    course: 'All-In-One Combo',
    courseHref: '/courses/all-in-one',
    reason: 'You need the full stack: a real project for your CV, structured mock interview coaching, and a mentor who knows your target domain.',
  },
  {
    min: 3, max: 5,
    label: 'Building Momentum',
    color: '#eab308',
    desc: 'You have a foundation, but there are critical gaps that recruiters will probe. A targeted program now bridges those gaps before season begins.',
    course: 'Placements Bootcamp',
    courseHref: '/courses/bootcamp',
    reason: 'You need structured PI mocks, GD practice, and domain-specific preparation — not more passive studying.',
  },
  {
    min: 6, max: 7,
    label: 'Almost Season-Ready',
    color: '#22c55e',
    desc: 'Strong foundation. Your final gap is probably interview execution — answering the hard questions, case GDs, and company-specific prep.',
    course: 'PI Mocks',
    courseHref: '/courses/mock-interview',
    reason: '7 domain-specific mock interviews with mentors who placed at your target company. The final 10% that separates shortlisted from selected.',
  },
  {
    min: 8, max: 8,
    label: 'Season-Ready',
    color: '#8b5cf6',
    desc: 'You\'re well-prepared — but the difference between good and great at placement season is often the quality of your CV bullets and one-more mock.',
    course: 'CV Reviews',
    courseHref: '/courses/cv-review',
    reason: '5 rounds of ATS-optimised review from IIM alumni who have reviewed 1,000+ placement CVs.',
  },
];

export default function ReadinessQuiz() {
  const [step, setStep]       = useState(0); // 0 = intro, 1-4 = questions, 5 = result
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const q = QUESTIONS[step - 1];
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const result = RESULTS.find(r => totalScore >= r.min && totalScore <= r.max) || RESULTS[0];

  function handleSelect(value) {
    setSelected(value);
  }

  function handleNext() {
    if (selected === null) return;
    const qId = QUESTIONS[step - 1].id;
    const newAnswers = { ...answers, [qId]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(5);
    }
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
    setSelected(null);
  }

  const progressPct = step >= 1 && step <= 4 ? ((step - 1) / QUESTIONS.length) * 100 : 0;

  return (
    <section
      id="readiness-quiz"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: 'var(--section-gap) 0', fontFamily: 'system-ui, -apple-system, sans-serif' }}
      aria-labelledby="quiz-heading"
    >
      <div className="container">
        <div className="section-header" style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)' }}>
            Placement Readiness Check
          </p>
          <h2 id="quiz-heading" style={{ color: 'var(--white)', fontFamily: 'inherit', letterSpacing: '-1px' }}>
            How Ready Are You?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)' }}>
            4 questions. 60 seconds. Get a personalised program recommendation.
          </p>
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* INTRO */}
          {step === 0 && (
            <div style={{ background: 'var(--white)', borderRadius: '24px', padding: '40px 32px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '16px', background: 'var(--yellow)', marginBottom: 20, transform: 'rotate(-3deg)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 style={{ color: 'var(--navy)', fontSize: 24, marginBottom: 12, fontWeight: 800, letterSpacing: '-0.5px', fontFamily: 'inherit' }}>
                Find Your Starting Point
              </h3>
              <p style={{ color: 'var(--slate)', fontSize: 15, lineHeight: 1.5, marginBottom: 28, maxWidth: 400, margin: '0 auto 28px' }}>
                Answer 4 quick questions about where you are right now. Get a straight recommendation for your exact situation.
              </p>
              <button
                onClick={() => setStep(1)}
                style={{ background: 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius-btn)', fontSize: 16, fontWeight: 700, padding: '14px 36px', cursor: 'pointer', display: 'inline-block' }}
              >
                Start the Quiz →
              </button>
              <p style={{ color: 'var(--slate)', opacity: 0.6, fontSize: 12, marginTop: 14 }}>
                Takes 60 seconds · No email required
              </p>
            </div>
          )}

          {/* QUESTIONS */}
          {step >= 1 && step <= 4 && (
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-card)', padding: '40px' }}>
              {/* Progress */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Question {step} of {QUESTIONS.length}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                    {Math.round(progressPct)}% complete
                  </span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                  <div style={{ height: '100%', background: 'var(--yellow)', borderRadius: 2, width: `${progressPct}%`, transition: 'width 400ms ease' }} />
                </div>
              </div>

              <h3 style={{ color: 'var(--white)', fontSize: 22, fontWeight: 800, marginBottom: 8, lineHeight: 1.3, fontFamily: 'inherit' }}>
                {q.question}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 28 }}>
                {q.sub}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {q.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelect(opt.value)}
                      style={{
                        textAlign: 'left',
                        padding: '16px 20px',
                        borderRadius: 12,
                        border: `2px solid ${isSelected ? 'var(--yellow)' : 'rgba(255,255,255,0.12)'}`,
                        background: isSelected ? 'rgba(252, 211, 77, 0.12)' : 'rgba(255,255,255,0.04)',
                        color: isSelected ? 'var(--yellow)' : 'rgba(255,255,255,0.8)',
                        fontSize: 15,
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        fontFamily: 'inherit',
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {step > 1 ? (
                  <button
                    onClick={() => { setStep(step - 1); setSelected(answers[QUESTIONS[step - 2].id] ?? null); }}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}
                  >
                    ← Back
                  </button>
                ) : <span />}
                <button
                  onClick={handleNext}
                  disabled={selected === null}
                  className="btn btn-primary"
                  style={{ opacity: selected === null ? 0.4 : 1, cursor: selected === null ? 'not-allowed' : 'pointer' }}
                >
                  {step < QUESTIONS.length ? 'Next Question →' : 'See My Result →'}
                </button>
              </div>
            </div>
          )}

          {/* RESULT */}
          {step === 5 && (
            <div>
              <div style={{ background: 'var(--white)', borderRadius: '24px', padding: '40px 32px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', marginBottom: 20 }}>
                
                {/* Score Circle Top Center */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: result.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 24, color: '#fff', boxShadow: `0 8px 24px ${result.color}40` }}>
                    {totalScore * 100 / 8 | 0}%
                  </div>
                </div>

                {/* Title */}
                <div style={{ color: result.color, fontWeight: 800, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Your Readiness Level
                </div>
                <h3 style={{ color: 'var(--navy)', fontWeight: 800, fontSize: 28, marginBottom: 20, fontFamily: 'inherit', letterSpacing: '-0.5px' }}>
                  {result.label}
                </h3>
                
                {/* Description */}
                <p style={{ color: 'var(--slate)', fontSize: 15, lineHeight: 1.6, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
                  {result.desc}
                </p>

                {/* Recommendation Box */}
                <div style={{ background: 'var(--bg-main)', borderRadius: '16px', padding: '28px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <p style={{ color: 'var(--slate)', opacity: 0.8, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                    Recommended for You
                  </p>
                  <div style={{ color: 'var(--navy)', fontWeight: 800, fontSize: 22, marginBottom: 12, fontFamily: 'inherit' }}>
                    {result.course}
                  </div>
                  <p style={{ color: 'var(--slate)', fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                    {result.reason}
                  </p>
                  <Link href={result.courseHref} style={{ background: 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: 'var(--radius-btn)', fontSize: 16, fontWeight: 700, padding: '14px 36px', display: 'inline-block', textDecoration: 'none' }}>
                    View {result.course} →
                  </Link>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleRestart}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}
                >
                  ← Retake the quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
