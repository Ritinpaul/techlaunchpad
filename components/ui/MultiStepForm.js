'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    domain: '',
    college: '',
    name: '',
    email: '',
    phone: ''
  });

  const domains = ['Consulting', 'Finance / IB', 'Product Management', 'Marketing', 'FMCG / Sales', 'General Management', 'HR'];

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const submitForm = (e) => {
    e.preventDefault();
    alert('Enquiry Submitted! We will reach out on WhatsApp.');
    setStep(4);
  };

  return (
    <div style={{ background: 'var(--white)', padding: 40, borderRadius: 'var(--radius-card)', border: '2px solid var(--black)', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
      
      {step < 4 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 6, background: step >= i ? 'var(--yellow)' : 'var(--hairline)', borderRadius: 3 }} />
          ))}
        </div>
      )}

      {step === 1 && (
        <div style={{ animation: 'fade-in-up 0.4s ease' }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>What is your target domain?</h1>
          <p style={{ color: 'var(--slate)', marginBottom: 24 }}>This helps us match you with the right mentor.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {domains.map(d => (
              <button 
                key={d} 
                className="btn" 
                style={{ 
                  background: formData.domain === d ? 'var(--navy)' : 'var(--white)', 
                  color: formData.domain === d ? 'var(--white)' : 'var(--navy)',
                  border: `2px solid ${formData.domain === d ? 'var(--navy)' : 'var(--hairline)'}`,
                  textAlign: 'left',
                  justifyContent: 'flex-start'
                }}
                onClick={() => { setFormData({...formData, domain: d}); nextStep(); }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ animation: 'fade-in-up 0.4s ease' }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>Where are you studying?</h1>
          <p style={{ color: 'var(--slate)', marginBottom: 24 }}>Enter your B-School or College name.</p>
          
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. IIM Bangalore, FMS Delhi"
            value={formData.college}
            onChange={(e) => setFormData({...formData, college: e.target.value})}
            style={{ marginBottom: 24 }}
          />
          
          <div style={{ display: 'flex', gap: 16 }}>
            <button className="btn btn-secondary" onClick={prevStep}>Back</button>
            <button className="btn btn-primary" onClick={nextStep} disabled={!formData.college}>Next Step</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={submitForm} style={{ animation: 'fade-in-up 0.4s ease' }}>
          <h1 style={{ fontSize: 24, marginBottom: 8 }}>Almost there!</h1>
          <p style={{ color: 'var(--slate)', marginBottom: 24 }}>Where should we send your customized roadmap?</p>
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp Number</label>
            <input type="tel" className="form-input" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91" />
          </div>
          
          <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
            <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit Details</button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div style={{ textAlign: 'center', animation: 'fade-in-up 0.4s ease' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(52, 211, 153, 0.2)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 24px' }}>
            ✓
          </div>
          <h1 style={{ fontSize: 24, marginBottom: 16 }}>Request Received!</h1>
          <p style={{ color: 'var(--slate)', marginBottom: 32, lineHeight: 1.6 }}>
            Thanks {formData.name}, we've received your details. One of our alumni mentors will review your target domain ({formData.domain}) and reach out on WhatsApp shortly.
          </p>
          <Link href="/" className="btn btn-secondary">Return to Home</Link>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
