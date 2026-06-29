'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/lib/auth';

// ── Mega-nav dropdown data ──
const NAV_ITEMS = [
  {
    label: 'Programs',
    href: '/courses',
    mega: true,
    cols: 2,
    sections: [
      {
        title: 'Our Courses',
        items: [
          { icon: '🚀', href: '/courses/all-in-one',     label: 'All-In-One Combo',       desc: 'The complete placement stack'   },
          { icon: '⚡', href: '/courses/bootcamp',       label: 'Placements Bootcamp',    desc: 'CV · PI · GD in 6 weeks'        },
          { icon: '📁', href: '/courses/live-project',   label: 'Live Project',           desc: 'Real client deliverable for CV' },
          { icon: '🎯', href: '/courses/mock-interview', label: 'PI Mocks',               desc: '7 domain-specific interviews'   },
          { icon: '🗣', href: '/courses/gd-practice',   label: 'GD Practice',            desc: '7 guided group discussions'     },
          { icon: '📄', href: '/courses/cv-review',      label: 'CV Reviews',             desc: '5 ATS-optimised review rounds'  },
        ],
      },
    ],
    footer: { label: 'Compare all programs →', href: '/courses/compare' },
  },
  {
    label: 'CAT / OMET',
    href: '/cat-omet',
    mega: true,
    cols: 2,
    sections: [
      {
        title: 'Tools & Prep',
        items: [
          { icon: '📝', href: '/cat-omet/mocks',           label: 'Sectional Mocks',          desc: '50 topic-wise mock tests' },
          { icon: '📊', href: '/cat-omet/calculator',      label: 'Percentile Calculator',    desc: 'IIM cutoff predictor'     },
          { icon: '🏆', href: '/profile-evaluator',        label: 'Profile Evaluator',        desc: '4-step admits analysis'   },
          { icon: '📚', href: '/free-material',            label: 'Free Study Material',      desc: 'Notes, guides & templates'},
        ],
      },
    ],
    footer: { label: 'Go to CAT/OMET Hub →', href: '/cat-omet' },
  },
  {
    label: 'Why Us',
    href: '/mentors',
    mega: false,
    items: [
      { icon: '🎓', href: '/mentors',        label: 'Our Mentors',         desc: 'IIM alumni from top firms'  },
      { icon: '⭐', href: '/testimonials',   label: 'Student Outcomes',    desc: '200+ placed students'       },
      { icon: '🏛', href: '/college-collab', label: 'College Tie-ups',     desc: '12 partner colleges'        },
    ],
  },
];

// ── Dropdown component ──
function MegaDropdown({ item, onClose }) {
  if (item.mega) {
    return (
      <div className={`mega-dropdown mega-dropdown-wide`}>
        {item.sections.map((sec) => (
          sec.items.map((di, i) => (
            <Link key={i} href={di.href} className="mega-dropdown-item" onClick={onClose}>
              <div className="mega-dropdown-item-icon" style={{ background: 'var(--bg-main)' }}>{di.icon}</div>
              <div className="mega-dropdown-item-text">
                <strong>{di.label}</strong>
                <span>{di.desc}</span>
              </div>
            </Link>
          ))
        ))}
        {item.footer && (
          <>
            <hr className="mega-dropdown-divider" />
            <div className="mega-dropdown-footer">
              <div>
                <span>Not sure which to pick?</span>
                <strong>Compare all programs side-by-side</strong>
              </div>
              <Link href={item.footer.href} onClick={onClose}>{item.footer.label}</Link>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mega-dropdown" style={{ minWidth: 260 }}>
      {item.items.map((di, i) => (
        <Link key={i} href={di.href} className="mega-dropdown-item" onClick={onClose}>
          <div className="mega-dropdown-item-icon" style={{ background: 'var(--bg-main)' }}>{di.icon}</div>
          <div className="mega-dropdown-item-text">
            <strong>{di.label}</strong>
            <span>{di.desc}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // item label
  const [session, setSession]       = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();
  const closeTimer = useRef(null);

  const isLoginPage = pathname?.startsWith('/login');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown on route change
  useEffect(() => { setOpenDropdown(null); setMenuOpen(false); }, [pathname]);

  async function handleSignOut() {
    setUserMenuOpen(false);
    await signOut();
    router.push('/');
  }

  function handleDropdownEnter(label) {
    clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }

  function handleDropdownLeave() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  if (isLoginPage) return null;

  const displayName = session?.user?.user_metadata?.full_name
    || session?.user?.email?.split('@')[0]
    || 'Account';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header id="nav" className={scrolled ? 'scrolled' : ''} role="banner">
      <div className="container">
        <nav className="nav-inner" aria-label="Main navigation">

          {/* Logo */}
          <Link href="/" className="nav-brand" aria-label="MBA Partner home">
            <span className="nav-wordmark">MBA Partner</span>
            <span className="nav-tagline">Initiative by Alumni of Old IIM</span>
          </Link>

          {/* Desktop mega nav */}
          <ul className="nav-links" id="nav-links" role="list" style={menuOpen ? { display: 'flex' } : {}}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} style={{ position: 'relative' }}
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <span style={{ fontSize: 9, opacity: 0.6, transition: 'transform 200ms', display: 'inline-block', transform: openDropdown === item.label ? 'rotate(180deg)' : 'none' }}>▼</span>
                </Link>
                {openDropdown === item.label && (
                  <div onMouseEnter={() => handleDropdownEnter(item.label)} onMouseLeave={handleDropdownLeave}>
                    <MegaDropdown item={item} onClose={() => setOpenDropdown(null)} />
                  </div>
                )}
              </li>
            ))}
            <li><Link href="/free-material" onClick={() => setMenuOpen(false)}>Free Material</Link></li>
          </ul>

          {/* Auth area */}
          <div style={{ display: 'none', alignItems: 'center', gap: 10 }} id="nav-auth-area">
            {session ? (
              <div style={{ position: 'relative' }}>
                <button
                  id="user-avatar-btn"
                  onClick={() => setUserMenuOpen(o => !o)}
                  aria-label="Account menu"
                  aria-expanded={userMenuOpen}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--purple)', border: '2px solid var(--black)', borderRadius: 'var(--radius-btn)', padding: '8px 16px', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--black)', flexShrink: 0 }}>
                    {initials}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)' }}>Dashboard</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginLeft: 2 }}>▼</span>
                </button>

                {userMenuOpen && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 198 }} onClick={() => setUserMenuOpen(false)} />
                    <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 16, padding: '8px', minWidth: 200, zIndex: 199, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                      <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>{displayName}</div>
                        <div style={{ fontSize: 11, color: 'var(--slate)', marginTop: 2 }}>{session.user.email}</div>
                      </div>
                      {[
                        { href: '/dashboard', label: '📊 Dashboard' },
                        { href: '/cat-omet/mocks', label: '📝 Mock Tests' },
                        { href: '/free-material', label: '📚 Free Material' },
                      ].map(l => (
                        <Link key={l.href} href={l.href} onClick={() => setUserMenuOpen(false)}
                          style={{ display: 'block', padding: '10px 12px', fontSize: 14, fontWeight: 600, color: 'var(--navy)', borderRadius: 8, transition: 'background 150ms' }}
                          onMouseOver={e => e.currentTarget.style.background = 'var(--bg-main)'}
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >{l.label}</Link>
                      ))}
                      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: 4, paddingTop: 4 }}>
                        <button onClick={handleSignOut}
                          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', fontSize: 14, fontWeight: 600, color: 'var(--orange)', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                          onMouseOver={e => e.currentTarget.style.background = 'var(--bg-main)'}
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >Sign Out</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" id="nav-login-btn"
                  style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', padding: '8px 16px', border: '2px solid rgba(21,19,19,0.2)', borderRadius: 'var(--radius-btn)', transition: 'background 200ms ease' }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--white)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >Log In</Link>
                <Link href="/courses" className="btn btn-primary" id="nav-cta">Enroll Now</Link>
              </>
            )}
          </div>

          <style>{`
            @media (min-width: 641px) { #nav-auth-area { display: flex !important; } }
          `}</style>

          {/* Hamburger */}
          <button
            className="nav-mobile-toggle"
            id="mobile-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
          </button>
        </nav>
      </div>
    </header>
  );
}
