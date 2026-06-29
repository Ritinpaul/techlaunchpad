'use client';
import { useState } from 'react';

export default function SearchableFAQ({ faqs }) {
  const [search, setSearch] = useState('');
  
  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(search.toLowerCase()) || 
    f.a.toLowerCase().includes(search.toLowerCase())
  );
  
  const half = Math.ceil(filteredFaqs.length / 2);
  const left = filteredFaqs.slice(0, half);
  const right = filteredFaqs.slice(half);

  // Toggle state
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (q) => {
    setOpenIndex(openIndex === q ? null : q);
  };

  return (
    <div>
      <div style={{ maxWidth: 600, margin: '0 auto 40px', position: 'relative' }}>
        <input 
          type="text" 
          placeholder="Search for an answer..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '16px 24px', borderRadius: 999, border: '2px solid var(--black)', fontSize: 16, outline: 'none' }}
        />
        <svg style={{ position: 'absolute', right: 20, top: 16, width: 20, height: 20, color: 'var(--slate)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      {filteredFaqs.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--slate)' }}>No FAQs match your search.</p>
      ) : (
        <div className="faq-grid">
          <div className="faq-col">
            {left.map((f, i) => (
              <div key={f.q} className={`faq-item ${openIndex === f.q ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggle(f.q)} aria-expanded={openIndex === f.q}>
                  {f.q}
                  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className="faq-answer">{f.a}</div>
              </div>
            ))}
          </div>
          <div className="faq-col">
            {right.map((f, i) => (
              <div key={f.q} className={`faq-item ${openIndex === f.q ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggle(f.q)} aria-expanded={openIndex === f.q}>
                  {f.q}
                  <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className="faq-answer">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
