import Link from 'next/link';

export default function Footer() {
  return (
    <footer aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-wordmark">MBA Partner</div>
            <p>Post-admission, pre-placement career acceleration for current MBA students. Initiative by Alumni of Old IIM.</p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="WhatsApp community">W</a>
              <a href="#" className="social-link" aria-label="Telegram channel">T</a>
              <a href="#" className="social-link" aria-label="LinkedIn page">in</a>
              <a href="#" className="social-link" aria-label="Instagram profile">ig</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Programs</h4>
            <ul>
              <li><Link href="/courses/all-in-one">All-In-One Combo</Link></li>
              <li><Link href="/courses/bootcamp">Placements Bootcamp</Link></li>
              <li><Link href="/courses/live-project">Live Projects</Link></li>
              <li><Link href="/courses/case-comp">Case Competition</Link></li>
              <li><Link href="/courses/excel-cert">Certifications</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/mentors">Mentors</Link></li>
              <li><Link href="/testimonials">Outcomes</Link></li>
              <li><Link href="/cat-omet">CAT/OMET</Link></li>
              <li><Link href="/free-material">Free Material</Link></li>
              <li><Link href="/college-collab">College Collab</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:bharat.kapoor@prodmarkconsulting.in">bharat.kapoor@</a></li>
              <li><a href="tel:+917042732092">+91 70427 32092</a></li>
              <li><a href="#">WhatsApp Community</a></li>
              <li><Link href="/login">Student Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MBA Partner · Prodmark Consultants Pvt. Ltd. All rights reserved.</p>
          <nav className="footer-legal" aria-label="Legal links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
