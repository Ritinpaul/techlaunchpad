export default function CompetitorTable() {
  const features = [
    { name: '1:1 Matched IIM Mentor', us: true, them: false },
    { name: 'Live Client Project for CV', us: true, them: false },
    { name: 'AIR 1 Case Comp Coaching', us: true, them: false },
    { name: 'Domain-Specific Mocks', us: true, them: 'Generic' },
    { name: 'CV Review by Hiring Managers', us: true, them: false },
    { name: 'Focus', us: 'Placements', them: 'Academic Concepts' },
  ];

  return (
    <section style={{ background: 'var(--bg-main)', padding: 'var(--section-gap) 0' }} aria-labelledby="comp-table-heading">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Not Your Average MBA Prep</p>
          <h2 id="comp-table-heading">Why Top Students Choose Us</h2>
        </div>
        
        <div style={{ maxWidth: 800, margin: '0 auto', background: 'var(--white)', borderRadius: 'var(--radius-card)', border: '2px solid var(--black)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--navy)', color: 'var(--white)' }}>
                <th style={{ padding: '20px', fontSize: 16, borderRight: '1px solid rgba(255,255,255,0.1)' }}>Feature</th>
                <th style={{ padding: '20px', fontSize: 16, borderRight: '1px solid rgba(255,255,255,0.1)', color: 'var(--yellow)', width: '30%', textAlign: 'center' }}>MBA Partner</th>
                <th style={{ padding: '20px', fontSize: 16, width: '30%', textAlign: 'center', opacity: 0.8 }}>Traditional Prep</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} style={{ borderBottom: i < features.length - 1 ? '1px solid var(--hairline)' : 'none' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--navy)' }}>{f.name}</td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', borderLeft: '1px solid var(--hairline)', borderRight: '1px solid var(--hairline)', background: 'rgba(52, 211, 153, 0.1)' }}>
                    {f.us === true ? <span style={{ color: '#059669', fontWeight: 800, fontSize: 18 }}>✓</span> : <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{f.us}</span>}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    {f.them === false ? <span style={{ color: 'var(--slate)', fontWeight: 800 }}>—</span> : <span style={{ color: 'var(--slate)', fontWeight: 600 }}>{f.them}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
