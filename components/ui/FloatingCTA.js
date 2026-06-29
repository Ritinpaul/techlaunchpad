'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="floating-cta-container">
      <a 
        href="https://t.me/mbapartner" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-cta-btn telegram"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-18 8a2.25 2.25 0 0 0 .126 4.123l4.669 1.556 1.838 5.513c.125.376.5.6.892.573a1.002 1.002 0 0 0 .764-.374l3.167-3.693 5.378 4.033a2.25 2.25 0 0 0 3.593-1.63L23.498 3.53a2.25 2.25 0 0 0-2.3-1.097z"/>
        </svg>
        <span className="cta-text">
          <span className="small-text">COMMUNITY</span>
          Telegram
        </span>
      </a>
      
      <a 
        href="https://wa.me/917042732092" 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-cta-btn booking"
      >
        <span className="status-dot"></span>
        Book Free Counseling
      </a>

      <style jsx>{`
        .floating-cta-container {
          position: fixed;
          bottom: 32px;
          right: 112px;
          display: flex;
          gap: 12px;
          z-index: 100;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .floating-cta-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .floating-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        }

        .telegram {
          background: #2AABEE;
          color: white;
        }

        .cta-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .small-text {
          font-size: 10px;
          letter-spacing: 0.05em;
          opacity: 0.9;
        }

        .booking {
          background: var(--yellow);
          color: var(--black);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        @media (max-width: 768px) {
          .floating-cta-container {
            bottom: 112px;
            right: 24px;
            flex-direction: column;
            align-items: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
