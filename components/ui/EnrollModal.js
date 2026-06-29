'use client';
import { useState } from 'react';
import Link from 'next/link';
import { formatRupees } from '@/lib/utils';

export default function EnrollModal({ course, open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open || !course) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className={`modal-overlay open`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: 480, width: '100%' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(52, 211, 153, 0.2)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 24px' }}>
              ✓
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Enquiry Received!</h2>
            <p style={{ color: 'var(--slate)', marginBottom: 24, lineHeight: 1.5 }}>
              Thanks! We have received your request for <strong>{course.name}</strong>. Our counselor will contact you via WhatsApp with the next steps.
            </p>
            <button className="btn btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>Close</button>
          </div>
        ) : (
          <>
            <h2 className="modal-title" style={{ fontSize: 24 }}>Enroll in {course.name}</h2>
            <p style={{ color: 'var(--slate)', marginBottom: 24 }}>
              Leave your details below and we will send you the final payment link and onboarding details for {course.name}.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
              <span style={{ fontWeight: 600, color: 'var(--navy)' }}>Program Price</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--purple)' }}>{formatRupees(course.price)}</span>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" required placeholder="Your Name" />
              </div>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" required placeholder="you@example.com" />
              </div>
              <div className="form-group" style={{ marginBottom: 24 }}>
                <label className="form-label">WhatsApp Number</label>
                <input type="tel" className="form-input" required placeholder="+91" />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Submitting...' : 'Request Enrollment Link'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
