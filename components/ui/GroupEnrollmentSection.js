'use client';
import { useState } from 'react';
import courses from '@/data/courses.json';
import { formatRupees } from '@/lib/utils';

export default function GroupEnrollmentSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [groupSize, setGroupSize] = useState(2);
  const [selectedCourse, setSelectedCourse] = useState('all-in-one');
  
  const course = courses.find(c => c.id === selectedCourse);
  const basePrice = course?.price || 14999;
  
  // Calculate discount based on size
  let discountPercent = 0;
  if (groupSize === 2) discountPercent = 30;
  else if (groupSize === 3) discountPercent = 35;
  else if (groupSize === 4) discountPercent = 40;
  else if (groupSize >= 5) discountPercent = 45;
  
  const discountedPrice = Math.round(basePrice * (1 - (discountPercent / 100)));
  const totalSavings = (basePrice - discountedPrice) * groupSize;

  return (
    <>
      <section style={{ background: 'var(--white)', padding: 'var(--section-gap) 0' }} aria-labelledby="pricing-heading">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Group Pricing</p>
            <h2 id="pricing-heading">Enroll With Batchmates, Save Together</h2>
            <p>Two to five students enrolling as a group get 30–45% off. The group discount stacks with the combo pricing.</p>
          </div>

          <div className="courses-group-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            {[
              { size: '2 Students', disc: '30% Off' },
              { size: '3 Students', disc: '35% Off' },
              { size: '4 Students', disc: '40% Off' },
              { size: '5+ Students', disc: '45% Off' },
            ].map((row, i) => (
              <div key={row.size} style={{ padding: '28px 20px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--black)' : 'none', background: i === 3 ? 'var(--yellow)' : 'var(--white)' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--purple)', marginBottom: 4 }}>{row.disc}</div>
                <div style={{ fontSize: 14, color: 'var(--navy)' }}>{row.size}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button onClick={() => setIsOpen(true)} className="btn btn-primary" style={{ fontSize: 16 }}>Calculate & Apply for Group Discount</button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}>
        <div className="modal" style={{ maxWidth: 640 }}>
          <button className="modal-close" onClick={() => setIsOpen(false)} aria-label="Close modal">×</button>
          <h2 className="modal-title" style={{ fontSize: 24 }}>Group Enrollment Request</h2>
          <p style={{ color: 'var(--slate)', marginBottom: 24 }}>Lock in your group discount. You&apos;ll receive separate payment links for each member.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div className="form-group">
              <label className="form-label">Program</label>
              <select className="form-select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.shortName} (₹{c.price})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Group Size</label>
              <select className="form-select" value={groupSize} onChange={(e) => setGroupSize(Number(e.target.value))}>
                {[2,3,4,5].map(n => (
                  <option key={n} value={n}>{n} Students</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: 12, padding: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--navy)', fontWeight: 600 }}>Discount Applied:</span>
              <span style={{ color: '#059669', fontWeight: 700 }}>{discountPercent}% OFF</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--navy)', fontWeight: 600 }}>New Price Per Student:</span>
              <span style={{ color: 'var(--purple)', fontWeight: 800, fontSize: 18 }}>{formatRupees(discountedPrice)}</span>
            </div>
            <div style={{ borderTop: '1px dashed rgba(52, 211, 153, 0.3)', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--slate)', fontSize: 13 }}>Total group savings:</span>
              <span style={{ color: '#059669', fontWeight: 700, fontSize: 13 }}>{formatRupees(totalSavings)}</span>
            </div>
          </div>

          <form className="modal-form" onSubmit={(e) => { e.preventDefault(); alert('Group request submitted!'); setIsOpen(false); }}>
            <div className="form-group">
              <label className="form-label">Lead Student Name</label>
              <input type="text" className="form-input" required placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label className="form-label">Lead Student WhatsApp</label>
              <input type="tel" className="form-input" required placeholder="+91" />
            </div>
            
            <div style={{ marginTop: 8 }}>
              <label className="form-label">Other Members (Emails)</label>
              <textarea className="form-textarea" style={{ height: 80, resize: 'none' }} placeholder={`Enter ${groupSize - 1} email addresses, separated by commas`} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Submit Group Request</button>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--slate)', marginTop: 8 }}>Our team will verify and send individual discounted payment links within 2 hours.</p>
          </form>
        </div>
      </div>
    </>
  );
}
