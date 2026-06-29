'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ProgramWizard() {
  const [answers, setAnswers] = useState({
    background: 'student', // 'student' or 'aspirant'
    placements: null,
    caseComps: null,
    liveProjects: null,
    catPrep: null,
  });

  const handleSelect = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const getRecommendations = () => {
    // CAT Aspirant path
    if (answers.background === 'aspirant') {
      return [
        { id: 'cat-combo', title: 'CAT Mastery Combo', desc: 'Complete prep for CAT & OMETs', href: '/cat-omet', tag: 'RECOMMENDED FOR YOU' }
      ];
    }

    // MBA Student path — use explicit answer values
    const wantsPlacements = answers.placements === 'yes';
    const wantsCaseComps = answers.caseComps === 'yes';
    const wantsLiveProjects = answers.liveProjects === 'yes';
    const noLiveProjects = answers.liveProjects === 'no';
    const noCaseComps = answers.caseComps === 'no';

    // All three — best value: all-in-one
    if (wantsPlacements && wantsCaseComps && wantsLiveProjects) {
      return [
        { id: 'all-in-one', title: 'All-In-One Combo', desc: 'The complete MBA Career OS — best value bundle', href: '/courses/all-in-one', tag: 'BEST MATCH' },
        { id: 'bootcamp', title: 'Placement Bootcamp', desc: 'Land your dream Day-Zero offer', href: '/courses/bootcamp', tag: 'ALSO GOOD' }
      ];
    }

    // Placements + Case Comps, no Live Projects
    if (wantsPlacements && wantsCaseComps && noLiveProjects) {
      return [
        { id: 'bootcamp', title: 'Placement Bootcamp', desc: 'Land your dream Day-Zero offer', href: '/courses/bootcamp', tag: 'BEST MATCH' },
        { id: 'case-comp', title: 'Case Competition Accelerator', desc: 'Win AIRs at India\'s biggest case comps', href: '/courses/case-competition', tag: 'ADD-ON' }
      ];
    }

    // Placements + Live Projects, no Case Comps
    if (wantsPlacements && wantsLiveProjects && noCaseComps) {
      return [
        { id: 'bootcamp', title: 'Placement Bootcamp', desc: 'Land your dream Day-Zero offer', href: '/courses/bootcamp', tag: 'BEST MATCH' },
        { id: 'live-project', title: 'Live Projects', desc: 'Real industry projects, real CV impact', href: '/courses/live-project', tag: 'CV BUILDER' }
      ];
    }

    // Placements only, no live projects, no case comps
    if (wantsPlacements && noLiveProjects && noCaseComps) {
      return [
        { id: 'bootcamp', title: 'Placement Bootcamp', desc: 'Land your dream Day-Zero offer', href: '/courses/bootcamp', tag: 'BEST MATCH' }
      ];
    }

    // Placements only (case comps / live projects not yet answered)
    if (wantsPlacements && answers.caseComps === null && answers.liveProjects === null) {
      return [
        { id: 'bootcamp', title: 'Placement Bootcamp', desc: 'Land your dream Day-Zero offer', href: '/courses/bootcamp', tag: 'BEST MATCH' }
      ];
    }

    // Only Live Projects (no placements, no case comps)
    if (wantsLiveProjects && !wantsPlacements) {
      return [
        { id: 'live-project', title: 'Live Projects', desc: 'Real industry projects, real CV impact', href: '/courses/live-project', tag: 'BEST MATCH' }
      ];
    }

    // Only Case Comps (no placements, no live projects)
    if (wantsCaseComps && !wantsPlacements) {
      return [
        { id: 'case-comp', title: 'Case Competition Accelerator', desc: 'Win AIRs at India\'s biggest case comps', href: '/courses/case-competition', tag: 'BEST MATCH' }
      ];
    }

    // All "no" — guide them to the overview
    if (answers.placements === 'no' && noLiveProjects && noCaseComps) {
      return [
        { id: 'all-in-one', title: 'All-In-One Combo', desc: 'Not sure? Our bundle covers everything at the best price.', href: '/courses/all-in-one', tag: 'RECOMMENDED FOR YOU' }
      ];
    }

    // Default — no answers yet or partial
    return [
      { id: 'all-in-one', title: 'All-In-One Combo', desc: 'The complete MBA Career OS', href: '/courses/all-in-one', tag: 'RECOMMENDED FOR YOU' }
    ];
  };

  const recommendations = getRecommendations();

  return (
    <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="wizard-heading">
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <h2 id="wizard-heading" style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--navy)', marginBottom: 12 }}>Premium audience selection</h2>
          <p style={{ fontSize: 18, color: 'var(--slate)', maxWidth: 600 }}>Choose your background and we'll show the most relevant MBA Partner journey immediately.</p>
        </div>

        <div className="wizard-layout">
          {/* Main Recommendations Panel */}
          <div className="wizard-results">
            {recommendations.map(rec => (
              <div key={rec.id} className="wizard-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <span className="wizard-tag">MBA PATHWAY</span>
                    <h3 style={{ fontSize: 24, color: 'var(--purple)', marginTop: 8 }}>{rec.title}</h3>
                  </div>
                  <div className="wizard-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                </div>
                <p style={{ color: 'var(--slate)', marginBottom: 24 }}>{rec.desc}</p>
                <Link href={rec.href} className="btn" style={{ width: '100%', textAlign: 'center', background: 'rgba(0,0,0,0.05)', color: 'var(--navy)', border: '1px solid rgba(0,0,0,0.1)' }}>
                  Explore →
                </Link>
                {rec.tag === 'BEST MATCH' && (
                  <div style={{ position: 'absolute', top: -12, left: 24, background: 'var(--yellow)', color: 'var(--navy)', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    {rec.tag}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar Questionnaire */}
          <div className="wizard-sidebar">
            <h4 style={{ color: 'var(--yellow)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Which Program is Right For You?</h4>
            
            <div className="wizard-question-group">
              <div className="wizard-question">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                MBA Student or CAT Aspirant?
              </div>
              <div className="wizard-options">
                <button className={`wizard-opt ${answers.background === 'student' ? 'active' : ''}`} onClick={() => handleSelect('background', 'student')}>MBA Student</button>
                <button className={`wizard-opt ${answers.background === 'aspirant' ? 'active' : ''}`} onClick={() => handleSelect('background', 'aspirant')}>CAT / OMET Aspirant</button>
              </div>
            </div>

            {answers.background === 'student' && (
              <>
                <div className="wizard-question-group">
                  <div className="wizard-question">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M9 9h6M9 13h6M9 17h6M4 17h16"></path></svg>
                    Looking for Placements?
                  </div>
                  <div className="wizard-options-sm">
                    <button className={`wizard-opt-sm ${answers.placements === 'yes' ? 'active' : ''}`} onClick={() => handleSelect('placements', 'yes')}>Yes</button>
                    <button className={`wizard-opt-sm ${answers.placements === 'no' ? 'active' : ''}`} onClick={() => handleSelect('placements', 'no')}>No</button>
                  </div>
                </div>

                <div className="wizard-question-group">
                  <div className="wizard-question">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                    Interested in Case Competitions?
                  </div>
                  <div className="wizard-options-sm">
                    <button className={`wizard-opt-sm ${answers.caseComps === 'yes' ? 'active' : ''}`} onClick={() => handleSelect('caseComps', 'yes')}>Yes</button>
                    <button className={`wizard-opt-sm ${answers.caseComps === 'no' ? 'active' : ''}`} onClick={() => handleSelect('caseComps', 'no')}>No</button>
                  </div>
                </div>

                <div className="wizard-question-group" style={{ borderBottom: 'none' }}>
                  <div className="wizard-question">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                    Need Live Projects?
                  </div>
                  <div className="wizard-options-sm">
                    <button className={`wizard-opt-sm ${answers.liveProjects === 'yes' ? 'active' : ''}`} onClick={() => handleSelect('liveProjects', 'yes')}>Yes</button>
                    <button className={`wizard-opt-sm ${answers.liveProjects === 'no' ? 'active' : ''}`} onClick={() => handleSelect('liveProjects', 'no')}>No</button>
                  </div>
                </div>
              </>
            )}

            {answers.background === 'aspirant' && (
              <div className="wizard-question-group" style={{ borderBottom: 'none' }}>
                <div className="wizard-question">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                  Preparing for CAT?
                </div>
                <div className="wizard-options-sm">
                  <button className={`wizard-opt-sm ${answers.catPrep === 'yes' ? 'active' : ''}`} onClick={() => handleSelect('catPrep', 'yes')}>Yes</button>
                  <button className={`wizard-opt-sm ${answers.catPrep === 'no' ? 'active' : ''}`} onClick={() => handleSelect('catPrep', 'no')}>No</button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      <style jsx>{`
        .wizard-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: stretch;
        }

        .wizard-results {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .wizard-card {
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: var(--radius-card);
          padding: 32px;
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .wizard-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          background: var(--white);
        }

        .wizard-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--slate);
          text-transform: uppercase;
        }

        .wizard-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--navy);
        }

        .wizard-icon svg {
          width: 20px;
          height: 20px;
        }

        .wizard-sidebar {
          background: var(--navy);
          border-radius: var(--radius-card);
          padding: 32px;
          color: var(--white);
        }

        .wizard-question-group {
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .wizard-question {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .wizard-question svg {
          width: 18px;
          height: 18px;
          color: rgba(255,255,255,0.6);
        }

        .wizard-options {
          display: flex;
          gap: 12px;
        }

        .wizard-opt {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--white);
          padding: 10px 16px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .wizard-options-sm {
          display: flex;
          gap: 12px;
        }

        .wizard-opt-sm {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--white);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .wizard-opt:hover, .wizard-opt-sm:hover {
          background: rgba(255,255,255,0.2);
        }

        .wizard-opt.active, .wizard-opt-sm.active {
          background: var(--purple);
          border-color: var(--purple);
        }

        @media (max-width: 992px) {
          .wizard-layout {
            grid-template-columns: 1fr;
          }
          .wizard-sidebar {
            order: -1; /* Move questionnaire to top on mobile */
          }
        }
      `}</style>
    </section>
  );
}
