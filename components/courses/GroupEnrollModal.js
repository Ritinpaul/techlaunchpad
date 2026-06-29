'use client';
import { useState } from 'react';
import { formatRupees, calcGroupPrice, makeWhatsAppLink } from '@/lib/utils';

export default function GroupEnrollModal({ course, open, onClose }) {
  const [groupSize, setGroupSize] = useState(2);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const pricing = calcGroupPrice(course.price, groupSize);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Submit lead to API
    try {
      await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone,
          program: course.name,
          groupSize,
          source: 'group_modal',
        }),
      });
    } catch (_) {}

    // WhatsApp redirect
    const msg = encodeURIComponent(
      `Hi! I'd like to enroll in ${course.name} as a group of ${groupSize}. My name: ${name}, WhatsApp: ${phone}. Group price quoted: ${formatRupees(pricing.perPerson)}/person`
    );
    window.open(`https://wa.me/917042732092?text=${msg}`, '_blank');

    setLoading(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-labelledby="group-modal-title">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <p className="eyebrow modal-eyebrow">Group Discount</p>
        <h2 className="modal-title" id="group-modal-title">Enroll Together, Save More</h2>
        <p className="modal-subtitle">{course.name}</p>

        {/* Group size selector */}
        <div style={{ marginBottom: 24 }}>
          <div className="form-label" style={{ marginBottom: 12 }}>How many people are enrolling?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setGroupSize(n)}
                style={{
                  flex: 1, height: 48, borderRadius: 12,
                  border: '2px solid ' + (groupSize === n ? 'var(--purple)' : 'var(--hairline)'),
                  background: groupSize === n ? 'var(--purple)' : 'var(--white)',
                  color: groupSize === n ? 'var(--white)' : 'var(--navy)',
                  fontWeight: 700, fontSize: 16, cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Savings display */}
        <div style={{
          background: 'var(--yellow)',
          border: '2px solid var(--black)',
          borderRadius: 16, padding: '20px 24px', marginBottom: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>
              {pricing.discountPct}% Group Discount Applied
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--black)' }}>
              {formatRupees(pricing.perPerson)}<span style={{ fontSize: 14, fontWeight: 500 }}>/person</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--navy)', marginTop: 2 }}>
              Total: {formatRupees(pricing.total)} for {groupSize} people
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'var(--navy)', textDecoration: 'line-through' }}>
              {formatRupees(course.price * groupSize)} without discount
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--black)', marginTop: 4 }}>
              You save {formatRupees(pricing.savings)} 🎉
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="g-name">Your Full Name</label>
            <input className="form-input" id="g-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="g-phone">WhatsApp Number</label>
            <input className="form-input" id="g-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
          </div>

          <button type="submit" className={`modal-submit${loading ? ' is-loading' : ''}`}>
            {!loading && `Enroll ${groupSize} People on WhatsApp →`}
          </button>
          <p className="modal-note">Our team confirms group enrollment within 4 hours on WhatsApp.</p>
        </form>
      </div>
    </div>
  );
}
