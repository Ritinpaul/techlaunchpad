'use client';
import { useState } from 'react';
import Link from 'next/link';
import catData from '@/data/cat-data.json';

export default function PercentileCalculator() {
  const [exam, setExam] = useState('cat');
  const [scores, setScores] = useState({ varc: '', dilr: '', qa: '' });
  const [ometScore, setOmetScore] = useState('');
  const [result, setResult] = useState(null);

  const data = catData[exam];

  function interpolatePercentile(score, table) {
    const sorted = [...table].sort((a, b) => b.score - a.score);
    if (score >= sorted[0].score) return sorted[0].percentile;
    if (score <= sorted[sorted.length - 1].score) return sorted[sorted.length - 1].percentile;
    for (let i = 0; i < sorted.length - 1; i++) {
      const high = sorted[i], low = sorted[i + 1];
      if (score <= high.score && score >= low.score) {
        const ratio = (score - low.score) / (high.score - low.score);
        return +(low.percentile + ratio * (high.percentile - low.percentile)).toFixed(1);
      }
    }
    return 50;
  }

  const calculate = () => {
    if (exam === 'cat') {
      const total = (parseFloat(scores.varc) || 0) + (parseFloat(scores.dilr) || 0) + (parseFloat(scores.qa) || 0);
      const percentile = interpolatePercentile(total, data.percentileTable);
      const eligible = data.colleges.filter(c => percentile >= (c.cutoff99 - 5));
      setResult({ percentile, total, eligible, exam: 'CAT' });
    } else {
      const total = parseFloat(ometScore) || 0;
      const percentile = interpolatePercentile(total, data.percentileTable);
      const eligible = data.colleges.filter(c => percentile >= (c.cutoff99 - 5));
      setResult({ percentile, total, eligible, exam: 'OMET' });
    }
  };

  const reset = () => { setResult(null); setScores({ varc: '', dilr: '', qa: '' }); setOmetScore(''); };

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ paddingBottom: 56 }} aria-labelledby="calc-h1">
        <div className="container">
          <div style={{ marginBottom: 16 }}>
            <Link href="/cat-omet" style={{ fontSize: 14, color: 'var(--slate)' }}>← CAT/OMET Hub</Link>
          </div>
          <p className="eyebrow hero-eyebrow">Free Tool</p>
          <h1 className="hero-h1" id="calc-h1">
            Percentile{' '}
            <span className="text-purple">Calculator</span>
          </h1>
          <p className="hero-sub">
            Enter your expected raw scores and get an estimated percentile using historical CAT / OMET data. See which IIMs your score opens doors to.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }}>
        <div className="container">
          <div className="calc-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

            {/* Input card */}
            <div style={{ background: 'var(--bg-main)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '40px' }}>
              <h2 style={{ fontSize: 24, marginBottom: 32 }}>Enter Your Scores</h2>

              {/* Exam toggle */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 32, background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-btn)', padding: 4 }}>
                {['cat', 'omet'].map(e => (
                  <button
                    key={e}
                    onClick={() => { setExam(e); setResult(null); }}
                    style={{
                      flex: 1, padding: '10px 0',
                      borderRadius: 'var(--radius-btn)',
                      background: exam === e ? 'var(--navy)' : 'transparent',
                      color: exam === e ? 'var(--white)' : 'var(--navy)',
                      border: 'none', fontWeight: 700, fontSize: 14,
                      cursor: 'pointer', transition: 'all 200ms ease',
                    }}
                  >
                    {e.toUpperCase()}
                  </button>
                ))}
              </div>

              {exam === 'cat' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { key: 'varc', label: 'VARC Score', max: 72, placeholder: 'e.g. 48 (out of 72)' },
                    { key: 'dilr', label: 'DILR Score', max: 60, placeholder: 'e.g. 40 (out of 60)' },
                    { key: 'qa',   label: 'QA Score',   max: 68, placeholder: 'e.g. 55 (out of 68)' },
                  ].map(f => (
                    <div key={f.key} className="form-group">
                      <label className="form-label" htmlFor={`score-${f.key}`}>{f.label} <span style={{ color: 'var(--slate)', fontWeight: 400 }}>(0–{f.max})</span></label>
                      <input
                        id={`score-${f.key}`}
                        className="form-input"
                        type="number"
                        min="0" max={f.max}
                        placeholder={f.placeholder}
                        value={scores[f.key]}
                        onChange={e => setScores(p => ({ ...p, [f.key]: e.target.value }))}
                      />
                      {/* Slider */}
                      <input
                        type="range" min="0" max={f.max}
                        value={scores[f.key] || 0}
                        onChange={e => setScores(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: '100%', accentColor: 'var(--purple)', marginTop: 6 }}
                      />
                    </div>
                  ))}
                  <div style={{ background: 'var(--white)', border: '1px solid var(--hairline)', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}>
                    <strong>Total Score: </strong>
                    {(parseFloat(scores.varc)||0) + (parseFloat(scores.dilr)||0) + (parseFloat(scores.qa)||0)} / 200
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label" htmlFor="omet-score">OMET Score <span style={{ color: 'var(--slate)', fontWeight: 400 }}>(0–100)</span></label>
                  <input
                    id="omet-score"
                    className="form-input"
                    type="number" min="0" max="100"
                    placeholder="e.g. 75 (out of 100)"
                    value={ometScore}
                    onChange={e => setOmetScore(e.target.value)}
                  />
                  <input
                    type="range" min="0" max="100"
                    value={ometScore || 0}
                    onChange={e => setOmetScore(e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--purple)', marginTop: 6 }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={calculate} className="btn btn-primary" style={{ flex: 2 }}>
                  Calculate Percentile
                </button>
                {result && <button onClick={reset} className="btn btn-secondary-light" style={{ flex: 1 }}>Reset</button>}
              </div>

              <p style={{ fontSize: 13, color: 'var(--slate)', marginTop: 12, lineHeight: 1.5 }}>
                *Estimates based on CAT 2024 historical data. Actual percentiles may vary.
              </p>
            </div>

            {/* Results panel */}
            <div>
              {!result ? (
                <div style={{ textAlign: 'center', padding: '60px 40px', background: 'var(--bg-main)', border: '2px dashed rgba(21,19,19,0.2)', borderRadius: 'var(--radius-card)' }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>📊</div>
                  <h3 style={{ color: 'var(--navy)', marginBottom: 8 }}>Enter your scores</h3>
                  <p style={{ color: 'var(--slate)', fontSize: 14 }}>Your estimated percentile and college predictions will appear here.</p>
                </div>
              ) : (
                <div>
                  {/* Percentile card */}
                  <div style={{ background: 'var(--purple)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '40px', textAlign: 'center', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Estimated {result.exam} Percentile</p>
                    <div style={{ fontSize: 80, fontWeight: 700, color: 'var(--yellow)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                      {result.percentile}
                    </div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>percentile | Total: {result.total} marks</p>
                    <div style={{ marginTop: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 16px', display: 'inline-block' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)' }}>
                        {result.percentile >= 99 ? '🏆 Top 1% — IIM A/B/C territory' :
                         result.percentile >= 97 ? '🎯 Top 3% — New IIMs + XLRI' :
                         result.percentile >= 90 ? '✅ Top 10% — Wide range of options' :
                         result.percentile >= 80 ? '📚 Keep pushing — Tier-2 options' :
                         '💪 Room to grow — Focus on weak sections'}
                      </span>
                    </div>
                  </div>

                  {/* Eligible colleges */}
                  {result.eligible.length > 0 && (
                    <div style={{ background: 'var(--bg-main)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 28 }}>
                      <h3 style={{ fontSize: 18, marginBottom: 20 }}>Colleges You May Qualify For</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {result.eligible.slice(0, 8).map(c => (
                          <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--white)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{c.name}</span>
                            <span style={{ fontSize: 13, color: 'var(--slate)' }}>Avg. ₹{c.avg_salary} LPA</span>
                          </div>
                        ))}
                        {result.eligible.length > 8 && (
                          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--slate)', marginTop: 8 }}>+{result.eligible.length - 8} more colleges match</p>
                        )}
                      </div>
                      <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--hairline)' }}>
                        <p style={{ fontSize: 13, color: 'var(--slate)', marginBottom: 12 }}>Got the score? Now prepare for GDPI with MBA Partner.</p>
                        <Link href="/courses/bootcamp" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                          Prep for GDPI →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }}>
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">How This Tool Works</p>
            <h2>Based on Historical CAT Data</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              { num: '01', title: 'Enter Raw Scores', desc: 'Enter your expected or mock-test scores per section. Sliders make it easy to explore different scenarios.' },
              { num: '02', title: 'Interpolated Estimate', desc: 'We interpolate your percentile from the historical CAT score-to-percentile conversion table — not a simple linear approximation.' },
              { num: '03', title: 'College Predictions', desc: 'Colleges where your estimated percentile exceeds the typical cutoff (±5%) are shown, with average salary context.' },
            ].map(s => (
              <div key={s.num} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--yellow)', marginBottom: 12 }}>{s.num}</div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--slate)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFILE EVALUATOR CTA ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'var(--white)', marginBottom: 16 }}>Percentile Only Tells Half the Story.</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, marginBottom: 32 }}>
            Profile strength — academics, work experience, extra-curriculars — determines whether you get shortlisted at top IIMs. Evaluate yours.
          </p>
          <Link href="/profile-evaluator" className="btn btn-primary">Evaluate My Full Profile →</Link>
        </div>
      </section>
    </>
  );
}
