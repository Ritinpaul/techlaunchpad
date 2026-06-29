'use client';
import { useState } from 'react';
import Link from 'next/link';
import catData from '@/data/cat-data.json';

const FACTORS = catData.profileFactors;

const DOMAINS = ['Finance', 'Consulting', 'Product Management', 'Marketing / FMCG', 'Operations', 'General Management', 'HR'];
const BSCHOOL_TARGETS = ['IIM A/B/C', 'IIM L/K', 'IIM New Gen', 'XLRI', 'SPJIMR', 'MDI', 'NMIMS', 'IMT'];

export default function ProfileEvaluator() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    acad10: '', acad12: '', ugScore: '', work: '', extra: '', catPct: '',
    domain: '', bschool: '',
  });
  const [result, setResult] = useState(null);

  const set = (key, val) => setValues(prev => ({ ...prev, [key]: val }));

  const calcScore = () => {
    let weighted = 0;
    FACTORS.forEach(f => {
      const raw = parseFloat(values[f.id]) || 0;
      const normalised = Math.min(raw / f.scale, 1);
      weighted += normalised * f.weight;
    });
    const score = Math.round(weighted * 100);

    const tier = score >= 80 ? 'Strong' : score >= 60 ? 'Competitive' : score >= 40 ? 'Average' : 'Needs Work';

    const allColleges = catData.cat.colleges;
    const catPct = parseFloat(values.catPct) || 0;
    const matched = allColleges.filter(c => catPct >= c.cutoff99 - 8);

    const tips = [];
    if ((parseFloat(values.work) || 0) < 12) tips.push("Work experience under 12 months is below IIM averages — a Live Project can fill this gap significantly.");
    if ((parseFloat(values.extra) || 0) < 6)  tips.push("Extra-curriculars below 6/10 — leadership roles, competitions, or a verifiable project boost this score.");
    if ((parseFloat(values.ugScore) || 0) < 70) tips.push("UG percentage below 70% can be flagged in some IIM WAT-PI calls — strong CAT score can partially compensate.");
    if ((parseFloat(values.catPct) || 0) < 95)  tips.push("Target percentile of 95+ opens a significantly wider college funnel — use our mocks and resources.");

    return { score, tier, matched, tips };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(calcScore());
    setStep(3);
  };

  const progressPct = (step - 1) / 2 * 100;

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 56 }} aria-labelledby="profile-h1">
        <div className="container">
          <p className="eyebrow hero-eyebrow">Free Tool · No Sign-In Required</p>
          <h1 className="hero-h1" id="profile-h1">
            Profile Strength{' '}
            <span className="text-purple">Evaluator</span>
          </h1>
          <p className="hero-sub">
            A weighted score across 6 factors — the same framework top IIM screeners use — tells you exactly where your profile is strong and where you need work.
          </p>
        </div>
      </section>

      {/* ── EVALUATOR ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }}>
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }}>

            {/* Progress */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13, color: 'var(--slate)' }}>
                <span>Step {step} of 3</span>
                <span>{Math.round(progressPct)}% complete</span>
              </div>
              <div style={{ background: 'var(--bg-main)', borderRadius: 4, height: 6 }}>
                <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--purple)', borderRadius: 4, transition: 'width 400ms ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                {['Academics', 'Experience', 'Results'].map((l, i) => (
                  <span key={l} style={{ fontSize: 12, fontWeight: 600, color: step > i ? 'var(--purple)' : 'var(--slate)' }}>{l}</span>
                ))}
              </div>
            </div>

            {/* ── STEP 1 ── Academics */}
            {step === 1 && (
              <div>
                <h2 style={{ marginBottom: 8 }}>Academic Background</h2>
                <p style={{ color: 'var(--slate)', marginBottom: 32 }}>Enter your marks as-is — no rounding up, please.</p>
                <div className="profile-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[
                    { key: 'acad10',  label: 'Class X %',                      placeholder: 'e.g. 92.4' },
                    { key: 'acad12',  label: 'Class XII %',                     placeholder: 'e.g. 88.0' },
                    { key: 'ugScore', label: 'UG % or CGPA (convert to %)',     placeholder: 'e.g. 74.5' },
                    { key: 'catPct',  label: 'Target / Actual CAT Percentile',  placeholder: 'e.g. 97.5' },
                  ].map(f => (
                    <div key={f.key} className="form-group">
                      <label className="form-label" htmlFor={`pf-${f.key}`}>{f.label}</label>
                      <input id={`pf-${f.key}`} className="form-input" type="number" step="0.1" placeholder={f.placeholder} value={values[f.key]} onChange={e => set(f.key, e.target.value)} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="btn btn-primary" style={{ marginTop: 32 }} disabled={!values.acad10 || !values.acad12 || !values.ugScore}>
                  Next: Experience →
                </button>
              </div>
            )}

            {/* ── STEP 2 ── Experience */}
            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: 8 }}>Experience &amp; Profile</h2>
                <p style={{ color: 'var(--slate)', marginBottom: 32 }}>Work experience and extra-curriculars carry significant weight in IIM shortlisting.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pf-work">Full-Time Work Experience (months)</label>
                    <input id="pf-work" className="form-input" type="number" placeholder="e.g. 18 (0 if fresher)" value={values.work} onChange={e => set('work', e.target.value)} />
                    <input type="range" min="0" max="48" value={values.work || 0} onChange={e => set('work', e.target.value)} style={{ width: '100%', accentColor: 'var(--purple)', marginTop: 6 }} />
                    <span style={{ fontSize: 12, color: 'var(--slate)' }}>{values.work || 0} months = {Math.round((values.work || 0) / 12 * 10) / 10} years</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pf-extra">Extra-curriculars Strength (0–10)</label>
                    <p style={{ fontSize: 13, color: 'var(--slate)', marginBottom: 8 }}>0 = none, 5 = active participant, 10 = national-level achievement</p>
                    <input type="range" min="0" max="10" id="pf-extra" value={values.extra || 0} onChange={e => set('extra', e.target.value)} style={{ width: '100%', accentColor: 'var(--purple)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--slate)', marginTop: 4 }}>
                      <span>None (0)</span><span style={{ fontWeight: 700, color: 'var(--purple)' }}>{values.extra || 0}/10</span><span>National (10)</span>
                    </div>
                  </div>
                  <div className="profile-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="pf-domain">Target Domain</label>
                      <select id="pf-domain" className="form-select" value={values.domain} onChange={e => set('domain', e.target.value)}>
                        <option value="">Select domain</option>
                        {DOMAINS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="pf-bschool">Target B-School Tier</label>
                      <select id="pf-bschool" className="form-select" value={values.bschool} onChange={e => set('bschool', e.target.value)}>
                        <option value="">Select target</option>
                        {BSCHOOL_TARGETS.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                  <button type="button" onClick={() => setStep(1)} className="btn btn-secondary-light">← Back</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Evaluate My Profile →</button>
                </div>
              </form>
            )}

            {/* ── STEP 3 ── Results */}
            {step === 3 && result && (
              <div>
                <h2 style={{ marginBottom: 32 }}>Your Profile Report</h2>

                {/* Score circle + tier */}
                <div className="profile-results-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                  <div style={{
                    background: result.tier === 'Strong' ? 'var(--purple)' : result.tier === 'Competitive' ? 'var(--yellow)' : result.tier === 'Average' ? 'var(--blue)' : 'var(--bg-main)',
                    border: '2px solid var(--black)',
                    borderRadius: 'var(--radius-card)',
                    padding: '36px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1, color: result.tier === 'Strong' ? 'var(--white)' : 'var(--navy)' }}>
                      {result.score}
                    </div>
                    <div style={{ fontSize: 13, color: result.tier === 'Strong' ? 'rgba(255,255,255,0.7)' : 'var(--slate)', marginTop: 4 }}>out of 100</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: result.tier === 'Strong' ? 'var(--yellow)' : 'var(--navy)', marginTop: 16 }}>
                      {result.tier === 'Strong' ? '🏆 Strong Profile' :
                       result.tier === 'Competitive' ? '✅ Competitive' :
                       result.tier === 'Average' ? '📈 Average — Scope to Grow' :
                       '💪 Needs Work'}
                    </div>
                  </div>

                  {/* Factor breakdown */}
                  <div style={{ background: 'var(--bg-main)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px' }}>
                    <h4 style={{ marginBottom: 16, fontSize: 15 }}>Weight Breakdown</h4>
                    {FACTORS.map(f => {
                      const raw = parseFloat(values[f.id]) || 0;
                      const pct = Math.min(raw / f.scale, 1);
                      return (
                        <div key={f.id} style={{ marginBottom: 10 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                            <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{f.label}</span>
                            <span style={{ color: 'var(--slate)' }}>{Math.round(pct * f.weight * 100)}pts</span>
                          </div>
                          <div style={{ background: 'var(--white)', borderRadius: 4, height: 5 }}>
                            <div style={{ width: `${pct * 100}%`, height: '100%', background: pct > 0.75 ? 'var(--purple)' : pct > 0.5 ? 'var(--yellow)' : 'var(--orange)', borderRadius: 4 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Improvement tips */}
                {result.tips.length > 0 && (
                  <div style={{ background: 'var(--yellow)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 28, marginBottom: 24 }}>
                    <h3 style={{ fontSize: 17, marginBottom: 16 }}>📌 How to Strengthen Your Profile</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {result.tips.map((t, i) => (
                        <li key={i} style={{ fontSize: 14, color: 'var(--navy)', lineHeight: 1.6, paddingLeft: 20, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0 }}>→</span>{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Matched colleges */}
                {result.matched.length > 0 && (
                  <div style={{ background: 'var(--bg-main)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 28, marginBottom: 24 }}>
                    <h3 style={{ fontSize: 17, marginBottom: 16 }}>🎯 Colleges Likely In Range</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {result.matched.map(c => (
                        <span key={c.name} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-tag)', padding: '6px 16px', fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div style={{ background: 'var(--purple)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 32 }}>
                  <h3 style={{ fontSize: 18, color: 'var(--white)', marginBottom: 8 }}>The Next Step: GDPI Preparation</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Your profile opens doors — now you need to close them in the GDPI. The Bootcamp prepares you for exactly that.</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Link href="/courses/bootcamp" className="btn btn-primary">Explore Bootcamp</Link>
                    <button onClick={() => { setStep(1); setResult(null); setValues({ acad10:'',acad12:'',ugScore:'',work:'',extra:'',catPct:'',domain:'',bschool:'' }); }}
                      className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)' }}>
                      Re-evaluate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FACTORS EXPLAINED ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }}>
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Methodology</p>
            <h2>How the Score Is Calculated</h2>
            <p>6 factors, weighted by how IIM shortlisting committees actually prioritise them.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {FACTORS.map(f => (
              <div key={f.id} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                  {Math.round(f.weight * 100)}%
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--slate)' }}>Weight in overall score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
