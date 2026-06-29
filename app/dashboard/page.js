'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/lib/auth';
import courses from '@/data/courses.json';

// ── Tracker circle component ──
function TrackerCircle({ label, done, total, color = 'var(--purple)' }) {
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  const r     = 52;
  const circ  = 2 * Math.PI * r;
  const dash  = circ * (pct / 100);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 128, height: 128, margin: '0 auto 12px' }}>
        <svg width="128" height="128" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="10" />
          <circle
            cx="64" cy="64" r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{pct}%</span>
          <span style={{ fontSize: 11, color: 'var(--slate)', marginTop: 2 }}>{done}/{total}</span>
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{label}</div>
    </div>
  );
}

// ── Mock stat card ──
function StatCard({ icon, value, label, bg = 'var(--white)' }) {
  return (
    <div style={{ background: bg, border: '2px solid var(--black)', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ fontSize: 32, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: 'var(--slate)', marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}

// ── Upcoming session card ──
function SessionCard({ date, title, type, mentor, status }) {
  const isPast = status === 'completed';
  const isToday = status === 'today';
  const bg = isToday ? 'var(--yellow)' : isPast ? 'var(--bg-main)' : 'var(--white)';
  return (
    <div style={{ background: bg, border: `2px solid ${isToday ? 'var(--black)' : 'rgba(21,19,19,0.15)'}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ textAlign: 'center', minWidth: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{date.split(' ')[0]}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>{date.split(' ')[1]}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 3 }}>{type} · {mentor}</div>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--radius-tag)', border: '1.5px solid var(--black)', background: isPast ? 'var(--bg-main)' : isToday ? 'var(--orange)' : 'var(--purple)', color: isToday || !isPast ? 'var(--white)' : 'var(--slate)', whiteSpace: 'nowrap', flexShrink: 0 }}>
        {isPast ? 'Done' : isToday ? 'Today' : 'Upcoming'}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser]       = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    (async () => {
      const authData = localStorage.getItem('mba_mock_auth');
      if (!authData) { router.replace('/login?redirect=/dashboard'); return; }

      const parsed = JSON.parse(authData);
      setUser({ email: parsed.email, user_metadata: { full_name: parsed.name || parsed.email.split('@')[0] } });

      // Mock profile
      setProfile({
        id: 'mock-123',
        full_name: parsed.name || parsed.email.split('@')[0],
        email: parsed.email,
        college: 'IIM Mock',
        cv_sessions_done: 0,
        pi_sessions_done: 0,
        gd_sessions_done: 0,
        enrolled_course: 'bootcamp',
      });
      setLoading(false);
    })();
  }, []);

  async function handleSignOut() {
    localStorage.removeItem('mba_mock_auth');
    router.replace('/');
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '4px solid rgba(190,148,245,0.3)', borderTopColor: 'var(--purple)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--slate)', fontSize: 15 }}>Loading your dashboard…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Derive display data
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
  const course = courses.find(c => c.slug === (profile?.enrolled_course || 'bootcamp')) || courses[1];
  const tracker = course.tracker || { cv: 5, pi: 7, gd: 7 };
  const cvDone  = profile?.cv_sessions_done ?? 2;
  const piDone  = profile?.pi_sessions_done ?? 1;
  const gdDone  = profile?.gd_sessions_done ?? 1;

  // Mock sessions (replace with real Supabase query in production)
  const SESSIONS = [
    { date: 'Jun 24', title: 'PI Mock #1 — Walk me through your CV', type: 'PI Mock', mentor: 'Arjun Mehta', status: 'completed' },
    { date: 'Jun 28', title: 'CV Review Round 2 — STAR format feedback', type: 'CV Review', mentor: 'Priya Sharma', status: 'completed' },
    { date: 'Jul 02', title: 'PI Mock #2 — Leadership & Failure questions', type: 'PI Mock', mentor: 'Arjun Mehta', status: 'today' },
    { date: 'Jul 06', title: 'GD Simulation — Case GD: Indian EV market', type: 'GD Practice', mentor: 'Rahul Kapoor', status: 'upcoming' },
    { date: 'Jul 10', title: 'PI Mock #3 — Domain Knowledge Round', type: 'PI Mock', mentor: 'Arjun Mehta', status: 'upcoming' },
    { date: 'Jul 14', title: 'CV Review Round 3 — Final polish', type: 'CV Review', mentor: 'Priya Sharma', status: 'upcoming' },
  ];

  const MOCKS_DONE = [
    { id: 'mk1', title: 'Case Reasoning & Strategy', score: '17/20', pct: 85, date: 'Jun 25' },
    { id: 'mk2', title: 'Finance & Markets', score: '14/20', pct: 70, date: 'Jun 27' },
  ];

  const TABS = ['overview', 'tracker', 'sessions', 'mocks', 'materials'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingTop: 0 }}>

      {/* Dashboard nav */}
      <div style={{ background: 'var(--white)', borderBottom: '2px solid var(--black)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto' }}>
          
          {/* Logo for Dashboard */}
          <Link href="/" style={{ fontSize: 20, fontWeight: 900, color: 'var(--navy)', textDecoration: 'none', marginRight: 24, flexShrink: 0 }}>
            MBA Partner<span style={{ color: 'var(--purple)' }}>.</span>
          </Link>

          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '16px 20px',
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'capitalize',
                color: activeTab === tab ? 'var(--purple)' : 'var(--slate)',
                borderBottom: `3px solid ${activeTab === tab ? 'var(--purple)' : 'transparent'}`,
                background: 'none',
                border: 'none',
                borderBottom: `3px solid ${activeTab === tab ? 'var(--purple)' : 'transparent'}`,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 200ms ease',
                fontFamily: 'inherit',
              }}
            >
              {tab === 'overview' ? '📊 Overview' :
               tab === 'tracker'  ? '🎯 Tracker' :
               tab === 'sessions' ? '📅 Sessions' :
               tab === 'mocks'    ? '📝 Mocks' :
               '📚 Materials'}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button onClick={handleSignOut} style={{ padding: '8px 16px', fontSize: 13, color: 'var(--slate)', background: 'none', border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: 'var(--radius-btn)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div>
            {/* Welcome */}
            <div style={{ background: 'var(--purple)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '32px 40px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 700, marginBottom: 6 }}>Good to have you back,</p>
                <h2 style={{ color: 'var(--white)', fontSize: 'clamp(22px,4vw,32px)', marginBottom: 8 }}>{displayName} 👋</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>
                  Enrolled: <strong style={{ color: 'var(--yellow)' }}>{course.name}</strong>
                  {profile?.college && <> · {profile.college}</>}
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 16, padding: '16px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--yellow)', lineHeight: 1 }}>
                  {Math.round(((cvDone + piDone + gdDone) / (tracker.cv + tracker.pi + tracker.gd)) * 100)}%
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Program Complete</div>
              </div>
            </div>

            {/* Stats row */}
            <div className="dash-overview-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
              <StatCard icon="🎯" value={piDone} label="PI Mocks Done" bg="var(--yellow)" />
              <StatCard icon="🗣" value={gdDone} label="GD Sessions Done" />
              <StatCard icon="📄" value={cvDone} label="CV Reviews Done" />
              <StatCard icon="📝" value={MOCKS_DONE.length} label="Mocks Attempted" />
            </div>

            {/* Two columns: upcoming session + mock summary */}
            <div className="dash-overview-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Next session */}
              <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18 }}>Next Session</h3>
                  <button onClick={() => setActiveTab('sessions')} style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
                </div>
                {SESSIONS.filter(s => s.status !== 'completed').slice(0, 2).map((s, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <SessionCard {...s} />
                  </div>
                ))}
              </div>

              {/* Recent mock */}
              <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18 }}>Mock Results</h3>
                  <button onClick={() => setActiveTab('mocks')} style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
                </div>
                {MOCKS_DONE.map((m, i) => (
                  <div key={i} style={{ background: 'var(--bg-main)', borderRadius: 12, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{m.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 2 }}>{m.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: m.pct >= 70 ? 'var(--success)' : 'var(--orange)' }}>{m.score}</div>
                      <div style={{ fontSize: 11, color: 'var(--slate)' }}>{m.pct}%</div>
                    </div>
                    <Link href={`/mocks/${m.id}`} style={{ fontSize: 12, color: 'var(--purple)', fontWeight: 700 }}>Retake →</Link>
                  </div>
                ))}
                <Link href="/cat-omet/mocks" className="btn btn-secondary-light" style={{ width: '100%', justifyContent: 'center', marginTop: 8, height: 40, fontSize: 13 }}>
                  Try More Mocks →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── TRACKER TAB ── */}
        {activeTab === 'tracker' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Your Progress</p>
              <h2>Placement Prep Tracker</h2>
              <p style={{ color: 'var(--slate)', marginTop: 8 }}>Track your CV reviews, PI mocks, and GD practice against your program target.</p>
            </div>

            {/* Circles */}
            <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '48px', marginBottom: 24 }}>
              <div className="dash-tracker-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 48, justifyItems: 'center' }}>
                <TrackerCircle label="CV Reviews" done={cvDone} total={tracker.cv} color="var(--orange)" />
                <TrackerCircle label="PI Mock Interviews" done={piDone} total={tracker.pi} color="var(--purple)" />
                <TrackerCircle label="GD Practice" done={gdDone} total={tracker.gd} color="var(--yellow)" />
              </div>
            </div>

            {/* Progress details */}
            <div className="dash-tracker-detail" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {[
                { label: 'CV Reviews', done: cvDone, total: tracker.cv, color: 'var(--orange)', items: ['Resume structure & STAR stories', 'ATS optimisation pass', 'Domain-specific language', 'Final formatting review', 'Hiring-manager readiness check'] },
                { label: 'PI Mock Interviews', done: piDone, total: tracker.pi, color: 'var(--purple)', items: ['Walk me through your CV', 'Leadership story (STAR)', 'Failure / learnings', 'Why MBA / Why this firm?', 'Domain knowledge round', 'Stress interview round', 'Final mock (no prep time)'] },
                { label: 'GD Practice', done: gdDone, total: tracker.gd, color: 'var(--yellow)', items: ['Case GD — framework intro', 'Topic GD — current affairs', 'Abstract GD — creative thinking', 'High-pressure GD (contradictors)', 'Cross-batch GD simulation', 'Domain GD (consulting/finance)', 'Final B-School format GD'] },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '24px' }}>
                  <h3 style={{ fontSize: 16, marginBottom: 16 }}>{s.label}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {s.items.slice(0, s.total).map((item, i) => {
                      const isDone = i < s.done;
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${isDone ? s.color : 'rgba(0,0,0,0.15)'}`, background: isDone ? s.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {isDone && <span style={{ color: 'var(--white)', fontSize: 10, fontWeight: 700 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: 13, color: isDone ? 'var(--navy)' : 'var(--slate)', fontWeight: isDone ? 600 : 400 }}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Mentor CTA */}
            <div style={{ background: 'var(--navy)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px 32px', marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 }}>Your matched mentor</p>
                <h3 style={{ color: 'var(--white)', fontSize: 18 }}>Arjun Mehta — McKinsey | IIM Ahmedabad</h3>
              </div>
              <a href="https://wa.me/917042732092" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Message Mentor on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ── SESSIONS TAB ── */}
        {activeTab === 'sessions' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Schedule</p>
              <h2>Your Sessions</h2>
              <p style={{ color: 'var(--slate)', marginTop: 8 }}>All booked and completed mentoring sessions for your program.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SESSIONS.map((s, i) => <SessionCard key={i} {...s} />)}
            </div>
            <div style={{ background: 'var(--yellow)', border: '2px solid var(--black)', borderRadius: 16, padding: '20px 24px', marginTop: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)' }}>📅 Need to reschedule a session?</p>
                <p style={{ fontSize: 13, color: 'var(--navy-body)', marginTop: 4 }}>WhatsApp your mentor directly to reschedule or add an extra session.</p>
              </div>
              <a href="https://wa.me/917042732092" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                WhatsApp Mentor
              </a>
            </div>
          </div>
        )}

        {/* ── MOCKS TAB ── */}
        {activeTab === 'mocks' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Mock Tests</p>
              <h2>Your Mock Test History</h2>
              <p style={{ color: 'var(--slate)', marginTop: 8 }}>Your past attempts and live mocks available to take now.</p>
            </div>

            {/* Attempted */}
            <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px', marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, marginBottom: 20 }}>Attempted</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {MOCKS_DONE.map((m, i) => (
                  <div key={i} style={{ background: 'var(--bg-main)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{m.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--slate)', marginTop: 2 }}>Attempted {m.date}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 700, color: m.pct >= 70 ? 'var(--success)' : 'var(--orange)' }}>{m.score}</div>
                      <div style={{ fontSize: 12, color: 'var(--slate)' }}>{m.pct}%</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <Link href={`/mocks/${m.id}`} className="btn btn-primary" style={{ height: 36, fontSize: 13, padding: '0 16px' }}>Retake</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available mocks */}
            <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '28px' }}>
              <h3 style={{ fontSize: 18, marginBottom: 20 }}>Available Mocks</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {[
                  { id: 'mk1', title: 'Case Reasoning & Strategy', qs: 20, time: '20 min', done: true },
                  { id: 'mk2', title: 'Finance & Markets', qs: 20, time: '20 min', done: true },
                  { id: 'mk3', title: 'Marketing & Brand Management', qs: 20, time: '20 min', done: false },
                  { id: 'mk4', title: 'Operations & Supply Chain', qs: 20, time: '20 min', done: false },
                  { id: 'mk5', title: 'General Management', qs: 20, time: '20 min', done: false },
                ].map(m => (
                  <div key={m.id} style={{ border: '2px solid var(--black)', borderRadius: 16, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      {m.done && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--success)', display: 'block', marginBottom: 4 }}>✓ Attempted</span>}
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{m.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 4 }}>{m.qs} questions · {m.time}</div>
                    </div>
                    <Link href={`/mocks/${m.id}`} className="btn btn-primary" style={{ height: 40, fontSize: 13, width: '100%', justifyContent: 'center' }}>
                      {m.done ? 'Retake' : 'Start Mock →'}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MATERIALS TAB ── */}
        {activeTab === 'materials' && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Study Materials</p>
              <h2>Your Program Materials</h2>
              <p style={{ color: 'var(--slate)', marginTop: 8 }}>All resources for your enrolled program — session recordings, templates, and guides.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {[
                { icon: '📄', title: 'CV Templates Pack', desc: 'Consulting, Finance, and FMCG-specific CV templates used by placed students.', type: 'Template', status: 'available', link: '/free-material' },
                { icon: '🎯', title: 'PI Question Bank', desc: '50 most common PI questions for your target domain with STAR answer frameworks.', type: 'Guide', status: 'available', link: '/free-material' },
                { icon: '🗣', title: 'GD Strategy Guide', desc: 'Types of GDs, entry strategies, and how to handle dominant speakers.', type: 'Guide', status: 'available', link: '/free-material' },
                { icon: '📊', title: 'Domain Primer — Consulting', desc: 'Case types, frameworks, and mental models for consulting PI and GD rounds.', type: 'Primer', status: 'available', link: '/free-material' },
                { icon: '📹', title: 'Session Recording — PI Mock #1', desc: 'Your first PI mock recording for self-review. Added after the session.', type: 'Recording', status: 'locked', link: '#' },
                { icon: '📹', title: 'Session Recording — GD #1', desc: 'Group discussion recording. Access opens 48h after session completion.', type: 'Recording', status: 'locked', link: '#' },
                { icon: '📋', title: 'Mentor Feedback — CV Round 2', desc: 'Written feedback from your mentor on CV Round 2.', type: 'Feedback', status: 'available', link: '#' },
                { icon: '🔒', title: 'Live Project Brief', desc: 'Client brief and deliverables for your live project. Available at Week 3.', type: 'Project', status: 'coming', link: '#' },
              ].map((m, i) => (
                <div key={i} style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 12, opacity: m.status === 'locked' ? 0.6 : 1 }}>
                  <div style={{ fontSize: 32 }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: 'var(--bg-main)', color: 'var(--navy)', padding: '3px 10px', borderRadius: 'var(--radius-tag)', border: '1.5px solid var(--black)' }}>{m.type}</span>
                      {m.status === 'locked' && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate)', padding: '3px 10px', borderRadius: 'var(--radius-tag)', border: '1.5px solid rgba(0,0,0,0.15)' }}>🔒 Locked</span>}
                      {m.status === 'coming' && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--orange)', padding: '3px 10px', borderRadius: 'var(--radius-tag)', border: '1.5px solid var(--orange)' }}>Coming Week 3</span>}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{m.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--slate)', lineHeight: 1.6 }}>{m.desc}</p>
                  </div>
                  <Link
                    href={m.status === 'available' ? m.link : '#'}
                    className={m.status === 'available' ? 'btn btn-primary' : 'btn btn-secondary-light'}
                    style={{ width: '100%', justifyContent: 'center', height: 40, fontSize: 13, pointerEvents: m.status !== 'available' ? 'none' : 'auto' }}
                  >
                    {m.status === 'available' ? 'Open →' : m.status === 'locked' ? '🔒 Locked' : '⏳ Coming Soon'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
