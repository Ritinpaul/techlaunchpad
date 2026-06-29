'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ── MOCK QUESTION BANK (embedded for Phase 3 — will move to Supabase in Phase 4) ──
const QUESTION_BANK = {
  'mk1': [
    { id: 'q1', q: 'A consulting client reports profitability is down 20% YoY despite flat revenues. What is your primary hypothesis?', opts: ['Market share loss to competitors', 'Increase in total costs (fixed + variable)', 'Decrease in product quality', 'Regulatory compliance costs'], ans: 1, exp: 'If revenues are flat but profitability is down 20%, costs must have increased. Always follow the P&L tree: Revenue – Costs = Profit.' },
    { id: 'q2', q: 'Which framework is most appropriate for evaluating whether to enter a new market?', opts: ['SWOT Analysis', 'Porter\'s Five Forces', 'McKinsey 7S', 'Balanced Scorecard'], ans: 1, exp: 'Porter\'s Five Forces evaluates industry attractiveness and competitive dynamics — the core of a market entry decision.' },
    { id: 'q3', q: 'A client wants to increase market share by 5% in 12 months. Which lever is typically fastest to execute?', opts: ['New product development', 'Pricing and promotions', 'M&A of a competitor', 'Geographic expansion'], ans: 1, exp: 'Pricing and promotions are the fastest revenue lever. New products, M&A, and expansion all have 12–24 month execution cycles.' },
    { id: 'q4', q: 'In a cost optimisation case, which cost is most controllable in the short term?', opts: ['Depreciation', 'Variable costs (COGS)', 'Fixed costs (rent, salaries)', 'Interest expense'], ans: 1, exp: 'Variable costs move with volume and can be optimised quickly through procurement, operations, or volume changes.' },
    { id: 'q5', q: 'A client\'s revenue is growing but net profit margin is shrinking. The most likely culprit is:', opts: ['Revenue growing slower than the market', 'COGS or operating expenses growing faster than revenue', 'Customer acquisition cost decreasing', 'Working capital cycle shortening'], ans: 1, exp: 'Margin compression with revenue growth almost always means costs are outpacing revenue growth.' },
    { id: 'q6', q: 'Which qualitative factor matters MOST when evaluating an M&A target?', opts: ['Revenue size of target', 'Cultural and operational fit', 'Brand recognition of target', 'Number of target employees'], ans: 1, exp: 'Studies consistently show that cultural and operational misalignment is the primary reason M&A deals destroy value post-integration.' },
    { id: 'q7', q: 'A private equity firm asks: "Is this business a good LBO candidate?" What is the first screen?', opts: ['High market share', 'Predictable, stable free cash flows', 'Rapid revenue growth', 'Strong brand equity'], ans: 1, exp: 'LBOs rely on debt repayment from cash flows. Predictability and stability of FCF is the foundational screen — everything else is secondary.' },
    { id: 'q8', q: 'MECE stands for:', opts: ['Most Efficient, Cost Effective', 'Mutually Exclusive, Collectively Exhaustive', 'Market Entry, Competitive Edge', 'Margin Expansion, Cost Efficiency'], ans: 1, exp: 'MECE is the foundational McKinsey framework for structuring problems — no overlap, no gaps. It ensures completeness and clarity.' },
    { id: 'q9', q: 'A retailer\'s same-store sales are declining. What is the FIRST decomposition you should use?', opts: ['Revenue = Price × Volume', 'Revenue = Number of stores × Revenue per store', 'Revenue = Market size × Market share', 'Revenue = B2B + B2C'], ans: 0, exp: 'For same-store sales, decompose into price and volume (transactions). This immediately tells you if it\'s a pricing or traffic/basket problem.' },
    { id: 'q10', q: 'A consultant is hired to advise on a pricing strategy. Which approach gives the MOST defensible long-term margin?', opts: ['Cost-plus pricing', 'Competitive pricing (match the market)', 'Value-based pricing', 'Penetration pricing'], ans: 2, exp: 'Value-based pricing captures maximum willingness to pay and creates the most durable margin — it\'s not anchored to cost or competition.' },
    { id: 'q11', q: 'Which of the following best describes a "zero-based budgeting" approach?', opts: ['Carry forward last year\'s budget with inflation adjustment', 'Start every budget cycle from zero and justify every cost', 'Set budgets based on competitor benchmarking', 'Use AI to forecast revenues and auto-set budgets'], ans: 1, exp: 'ZBB requires justifying every expense from scratch each cycle — not incrementing prior-year numbers.' },
    { id: 'q12', q: 'A client has strong revenues but poor cash flow. The most likely cause is:', opts: ['Low gross margin', 'Poor working capital management (long receivables cycle)', 'High depreciation', 'Low customer satisfaction scores'], ans: 1, exp: 'Accrual revenues can be high while cash is trapped in receivables. Working capital (AR, inventory, AP) is the cash flow lever.' },
    { id: 'q13', q: 'When a client asks "Should we build, buy, or partner?", what is the primary decision variable?', opts: ['Time to market vs. cost vs. capability gap size', 'Number of potential acquisition targets', 'Board preference for organic vs. inorganic growth', 'Stock price of potential targets'], ans: 0, exp: 'Build-buy-partner is a classic strategic options framework. The key variables are speed, cost, and depth of capability needed.' },
    { id: 'q14', q: 'In a market sizing question, bottom-up sizing means:', opts: ['Starting from the total population and narrowing down', 'Building up from the number of addressable customers × spend per customer', 'Using industry reports as the base', 'Sizing from the largest competitor\'s known revenue'], ans: 1, exp: 'Bottom-up = number of units × price per unit. Top-down = total market × share. Both are valid; examiners prefer seeing both.' },
    { id: 'q15', q: 'A company\'s NPS is -10 and improving YoY. This is:', opts: ['A critical warning sign requiring immediate intervention', 'Positive momentum — direction matters more than absolute value', 'Irrelevant — NPS doesn\'t affect financials', 'A sign that the company is losing customers'], ans: 1, exp: 'Trajectory matters. An improving NPS suggests structural fixes are working. An NPS of -10 alone is concerning, but improvement is positive signal.' },
    { id: 'q16', q: 'Which of the following is NOT a fixed cost?', opts: ['Factory rent', 'Salaries of production staff on hourly wages', 'Software license fees', 'CEO compensation'], ans: 1, exp: 'Hourly wages are variable — they scale with hours worked (output). The others are fixed regardless of volume.' },
    { id: 'q17', q: 'Porter\'s generic strategies are:', opts: ['Cost leadership, Differentiation, Focus', 'Growth, Stability, Retrenchment', 'Market development, Product development, Diversification', 'Innovation, Execution, Scale'], ans: 0, exp: 'Porter\'s three generic strategies: Cost Leadership, Differentiation, and Focus (cost focus or differentiation focus).' },
    { id: 'q18', q: 'A private hospital wants to increase capacity. Before recommending capital investment, you should first check:', opts: ['Competitor hospital capacities', 'Current occupancy rates and utilisation', 'Government healthcare policy changes', 'Patient satisfaction scores'], ans: 1, exp: 'Always check current utilisation before recommending more capacity. Low utilisation means operational fixes, not capital investment.' },
    { id: 'q19', q: 'A company launches a product at a premium price to target early adopters, then gradually reduces prices. This is:', opts: ['Penetration pricing', 'Price skimming', 'Value-based pricing', 'Freemium pricing'], ans: 1, exp: 'Price skimming: high price at launch to extract max WTP from early adopters, then lower price to reach the mass market.' },
    { id: 'q20', q: 'What does "synergy" mean in M&A context?', opts: ['Target company\'s market share', '2+2=5: combined entity value exceeds sum of parts', 'Cultural alignment between acquirer and target', 'Reduction in head count post-merger'], ans: 1, exp: 'Synergies are the incremental value created by combining two companies — revenue synergies (cross-sell) or cost synergies (shared functions).' },
  ],
  'mk2': [
    { id: 'f1', q: 'If a company\'s P/E ratio is 25x and EPS is ₹40, what is the market price per share?', opts: ['₹625', '₹1,000', '₹800', '₹500'], ans: 1, exp: 'Market Price = P/E × EPS = 25 × ₹40 = ₹1,000.' },
    { id: 'f2', q: 'Which of the following best defines EBITDA?', opts: ['Net income after all expenses', 'Earnings before Interest, Taxes, Depreciation, and Amortisation', 'Operating cash flow minus capex', 'Revenue minus COGS'], ans: 1, exp: 'EBITDA = EBIT + D&A. It\'s a proxy for operating cash generation before financial structure and non-cash charges.' },
    { id: 'f3', q: 'A bond trades at a premium when:', opts: ['Its coupon rate is below the market rate', 'Its coupon rate is above the market rate', 'Its maturity is very long', 'The issuer has low credit rating'], ans: 1, exp: 'If coupon > market rate, the bond is more attractive → price rises above par (premium). Bond prices and yields move inversely.' },
    { id: 'f4', q: 'In DCF valuation, terminal value is typically calculated using:', opts: ['The current P/E multiple', 'Gordon Growth Model or Exit Multiple', 'Book value of assets', 'Revenue × industry multiple'], ans: 1, exp: 'Terminal value (which often accounts for 60–80% of DCF value) uses either the Gordon Growth Model (FCF/(r-g)) or an exit multiple.' },
    { id: 'f5', q: 'Working capital is defined as:', opts: ['Total assets minus total liabilities', 'Current assets minus current liabilities', 'Cash plus inventory', 'Revenue minus operating expenses'], ans: 1, exp: 'Working capital = Current Assets – Current Liabilities. It measures short-term liquidity and operational efficiency.' },
    { id: 'f6', q: 'A rights issue allows existing shareholders to:', opts: ['Sell shares at market price', 'Buy additional shares at a discounted price before the public', 'Receive bonus shares for free', 'Convert bonds to equity'], ans: 1, exp: 'A rights issue offers existing shareholders the right (not obligation) to buy additional shares at a discount, proportional to their holding.' },
    { id: 'f7', q: 'Which ratio measures how efficiently a company uses its assets to generate revenue?', opts: ['Return on Equity', 'Debt-to-Equity', 'Asset Turnover Ratio', 'Current Ratio'], ans: 2, exp: 'Asset Turnover = Revenue / Average Total Assets. It shows how much revenue is generated per rupee of assets.' },
    { id: 'f8', q: 'Net Present Value (NPV) is positive when:', opts: ['The project generates any cash flow', 'The discount rate equals IRR', 'PV of future cash flows exceeds initial investment', 'The payback period is under 3 years'], ans: 2, exp: 'NPV > 0 means the project creates value — the PV of future cash inflows exceeds the upfront investment.' },
    { id: 'f9', q: 'The Sharpe ratio measures:', opts: ['Total portfolio return', 'Risk-adjusted return (return per unit of risk taken)', 'Correlation between two assets', 'Beta of a stock'], ans: 1, exp: 'Sharpe Ratio = (Return – Risk-free Rate) / Standard Deviation. Higher Sharpe = better risk-adjusted return.' },
    { id: 'f10', q: 'If a company\'s debt/equity ratio is 2:1, and equity is ₹50 crore, total debt is:', opts: ['₹25 crore', '₹50 crore', '₹100 crore', '₹150 crore'], ans: 2, exp: 'D/E = 2 → Debt = 2 × Equity = 2 × 50 = ₹100 crore.' },
    { id: 'f11', q: 'Beta of 1.5 means a stock:', opts: ['Moves at exactly the market rate', 'Moves 50% more than the market in either direction', 'Has 50% less risk than the market', 'Returns 1.5% per year above market'], ans: 1, exp: 'Beta > 1 = more volatile than market. Beta 1.5 means if market rises/falls 10%, stock rises/falls ~15%.' },
    { id: 'f12', q: 'WACC is used in DCF as the discount rate because:', opts: ['It\'s the easiest rate to calculate', 'It represents the opportunity cost of capital for the firm\'s investors', 'It equals the risk-free rate', 'It\'s mandated by SEBI for listed companies'], ans: 1, exp: 'WACC = blended cost of debt and equity, weighted by capital structure. It represents the minimum return investors require.' },
    { id: 'f13', q: 'A quick ratio of 0.7 indicates:', opts: ['The company is highly liquid', 'The company may struggle to meet short-term obligations without selling inventory', 'The company has too much cash', 'Excellent working capital management'], ans: 1, exp: 'Quick Ratio = (Cash + Receivables) / Current Liabilities. Below 1 means current liabilities exceed liquid assets — liquidity concern.' },
    { id: 'f14', q: 'EV/EBITDA is preferred over P/E for cross-company comparison because:', opts: ['It\'s easier to calculate', 'It is capital structure-neutral — unaffected by leverage differences', 'It includes depreciation', 'It uses book value not market value'], ans: 1, exp: 'EV/EBITDA compares companies regardless of how they\'re financed — unlike P/E, which is distorted by debt and tax rates.' },
    { id: 'f15', q: 'The yield curve inverts when:', opts: ['Short-term rates exceed long-term rates', 'Long-term rates exceed short-term rates', 'Central bank cuts interest rates', 'Inflation rises above 6%'], ans: 0, exp: 'Inverted yield curve = short-term rates > long-term. It historically precedes recessions (investors expect future rate cuts).' },
    { id: 'f16', q: 'Free Cash Flow to Equity (FCFE) is:', opts: ['Operating cash flow minus taxes', 'Cash flow available to equity holders after debt payments and capex', 'EBITDA minus depreciation', 'Net income plus amortisation'], ans: 1, exp: 'FCFE = Net Income + D&A – Capex – ΔNWC – Debt Repayment + New Debt. It\'s what\'s left for equity shareholders.' },
    { id: 'f17', q: 'Dividend Discount Model (DDM) values a stock based on:', opts: ['Future earnings per share', 'Present value of expected future dividends', 'Book value per share', 'Price-to-book ratio'], ans: 1, exp: 'DDM: P = D₁/(r-g). Stock value = PV of all future expected dividends, discounted at the required rate of return.' },
    { id: 'f18', q: 'What happens to bond price when interest rates rise?', opts: ['Bond price rises', 'Bond price falls', 'Bond price is unaffected', 'Bond price doubles'], ans: 1, exp: 'Inverse relationship: when market rates rise, existing bonds (with lower coupons) become less attractive → price falls.' },
    { id: 'f19', q: 'Gross Profit Margin = ?', opts: ['Net Profit / Revenue', '(Revenue – COGS) / Revenue', 'EBIT / Revenue', 'Operating Cash Flow / Revenue'], ans: 1, exp: 'Gross Margin = (Revenue – Cost of Goods Sold) / Revenue × 100. It shows the profitability before operating expenses.' },
    { id: 'f20', q: 'In LBO modelling, the primary return driver is:', opts: ['Revenue growth alone', 'Combination of EBITDA growth, multiple expansion, and debt paydown', 'Interest rate environment', 'Management team quality'], ans: 1, exp: 'LBO returns come from 3 levers: EBITDA improvement, exit multiple expansion, and the leverage effect (debt paydown increases equity value).' },
  ],
};

// Fill remaining mock IDs with placeholder questions
['mk3','mk4','mk5'].forEach(id => {
  QUESTION_BANK[id] = QUESTION_BANK['mk1'].map((q, i) => ({
    ...q, id: `${id}_q${i}`,
    q: `[${id.toUpperCase()} Sample] ` + q.q,
  }));
});

const MOCK_META = {
  'mk1': { title: 'Case Reasoning & Strategy',      section: 'Consulting',  questions: 20, duration: 20 },
  'mk2': { title: 'Finance & Markets',               section: 'Finance',     questions: 20, duration: 20 },
  'mk3': { title: 'Marketing & Brand Management',    section: 'Marketing',   questions: 20, duration: 20 },
  'mk4': { title: 'Operations & Supply Chain',       section: 'Operations',  questions: 20, duration: 20 },
  'mk5': { title: 'General Management',              section: 'GM',          questions: 20, duration: 20 },
};

function padTime(n) { return String(n).padStart(2, '0'); }

export default function MockTestEngine({ params }) {
  const { id } = params;
  const meta = MOCK_META[id];
  const questions = (QUESTION_BANK[id] || []).slice(0, 20);

  if (!meta || questions.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔒</div>
        <h2 style={{ marginBottom: 12 }}>Mock Not Available Yet</h2>
        <p style={{ color: 'var(--slate)', marginBottom: 24 }}>This mock is coming soon. Check back after the release date.</p>
        <Link href="/cat-omet/mocks" className="btn btn-primary">View Live Mocks</Link>
      </div>
    );
  }

  const [phase, setPhase]       = useState('intro'); // intro | test | review | result
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState({});
  const [marked, setMarked]     = useState({});
  const [timeLeft, setTimeLeft] = useState(meta.duration * 60);
  const [showExp, setShowExp]   = useState({});
  const timerRef = useRef(null);

  const startTest = () => {
    setPhase('test');
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); submitTest(); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const submitTest = useCallback(() => {
    clearInterval(timerRef.current);
    setPhase('result');
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const selectAnswer = (qIdx, optIdx) => {
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const toggleMark = (qIdx) => {
    setMarked(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  // Calculate score
  const score = questions.filter((q, i) => answers[i] === q.ans).length;
  const pct   = Math.round((score / questions.length) * 100);

  const mins  = Math.floor(timeLeft / 60);
  const secs  = timeLeft % 60;
  const urgency = timeLeft < 120;

  // ── INTRO ──
  if (phase === 'intro') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingTop: 100, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <Link href="/cat-omet/mocks" style={{ fontSize: 14, color: 'var(--slate)', display: 'block', marginBottom: 24 }}>← Back to Mocks</Link>
          <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '48px' }}>
            <span className="tag-category" style={{ marginBottom: 20, display: 'inline-block' }}>{meta.section}</span>
            <h1 style={{ fontSize: 'clamp(24px,4vw,32px)', color: 'var(--navy)', marginBottom: 12 }}>{meta.title}</h1>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
              {[
                { icon: '📝', text: `${meta.questions} Questions` },
                { icon: '⏱', text: `${meta.duration} Minutes` },
                { icon: '📊', text: 'Instant Scoring' },
                { icon: '💡', text: 'Answer Explanations' },
              ].map(m => (
                <div key={m.text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--navy-body)', fontWeight: 600 }}>
                  <span>{m.icon}</span><span>{m.text}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--yellow)', border: '2px solid var(--black)', borderRadius: 16, padding: '16px 20px', marginBottom: 32 }}>
              <p style={{ fontSize: 14, color: 'var(--black)', fontWeight: 600, margin: 0 }}>
                📋 Instructions: Read each question carefully. Mark for review if unsure. Timer starts when you click Begin. The mock auto-submits when time runs out.
              </p>
            </div>
            <button onClick={startTest} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>
              Begin Mock Test →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ──
  if (phase === 'result') {
    const attempted = Object.keys(answers).length;
    const correct   = score;
    const wrong     = attempted - correct;
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingTop: 100, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {/* Score card */}
          <div style={{ background: pct >= 70 ? 'var(--purple)' : pct >= 50 ? 'var(--yellow)' : 'var(--bg-main)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '48px', textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: pct >= 70 ? 'rgba(255,255,255,0.7)' : 'var(--slate)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
              {meta.title}
            </div>
            <div style={{ fontSize: 80, fontWeight: 700, color: pct >= 70 ? 'var(--yellow)' : 'var(--purple)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              {score}/{meta.questions}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: pct >= 70 ? 'var(--white)' : 'var(--navy)', marginTop: 8 }}>{pct}%</div>
            <div style={{ fontSize: 16, color: pct >= 70 ? 'rgba(255,255,255,0.8)' : 'var(--slate)', marginTop: 8 }}>
              {pct >= 90 ? '🏆 Exceptional — Leaderboard territory' :
               pct >= 70 ? '✅ Strong performance — Well above average' :
               pct >= 50 ? '📈 Average — Review explanations to improve' :
               '💪 Below average — Study the explanations carefully'}
            </div>
          </div>

          {/* Stats */}
          <div className="mock-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 32 }}>
            {[
              { label: 'Attempted', val: attempted, col: 'var(--blue)' },
              { label: 'Correct',   val: correct,   col: 'var(--yellow)' },
              { label: 'Wrong',     val: wrong,     col: 'var(--orange)' },
              { label: 'Skipped',   val: meta.questions - attempted, col: 'var(--bg-main)' },
            ].map(s => (
              <div key={s.label} style={{ background: s.col, border: '2px solid var(--black)', borderRadius: 16, padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--navy)' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Review answers toggle */}
          <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 28, marginBottom: 32 }}>
            <h3 style={{ marginBottom: 24 }}>Review All Answers</h3>
            {questions.map((q, i) => {
              const userAns   = answers[i];
              const isCorrect = userAns === q.ans;
              const isSkipped = userAns === undefined;
              return (
                <div key={q.id} style={{ borderBottom: '1px solid var(--hairline)', paddingBottom: 20, marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: isSkipped ? 'var(--slate)' : isCorrect ? 'var(--success)' : 'var(--error)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.5 }}>{q.q}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingLeft: 40 }}>
                    {q.opts.map((opt, oi) => {
                      const isAnswer = oi === q.ans;
                      const isUser   = oi === userAns;
                      let bg = 'var(--white)', border = '1px solid rgba(0,0,0,0.1)', color = 'var(--navy-body)';
                      if (isAnswer) { bg = 'rgba(16,185,129,0.1)'; border = '2px solid var(--success)'; color = 'var(--success)'; }
                      if (isUser && !isAnswer) { bg = 'rgba(239,68,68,0.1)'; border = '2px solid var(--error)'; color = 'var(--error)'; }
                      return (
                        <div key={oi} style={{ background: bg, border, borderRadius: 8, padding: '8px 12px', fontSize: 13, color }}>
                          {isAnswer ? '✓ ' : isUser ? '✗ ' : ''}{opt}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: 10, paddingLeft: 40 }}>
                    <button onClick={() => setShowExp(p => ({ ...p, [i]: !p[i] }))} style={{ fontSize: 13, color: 'var(--purple)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                      {showExp[i] ? '▲ Hide' : '▼ Show'} Explanation
                    </button>
                    {showExp[i] && (
                      <p style={{ fontSize: 13, color: 'var(--navy-body)', lineHeight: 1.6, marginTop: 8, background: 'var(--blue)', border: '1px solid var(--black)', borderRadius: 8, padding: '10px 14px' }}>
                        💡 {q.exp}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => { setPhase('intro'); setCurrent(0); setAnswers({}); setMarked({}); setTimeLeft(meta.duration * 60); }} className="btn btn-secondary-light">
              Retake Mock
            </button>
            <Link href="/cat-omet/mocks" className="btn btn-primary">View All Mocks →</Link>
            <Link href="/courses/bootcamp" className="btn btn-secondary">Prep for GDPI →</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── TEST ──
  const q = questions[current];
  const userAns = answers[current];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingTop: 80 }}>
      {/* Test header */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--white)', borderBottom: '2px solid var(--black)',
        padding: '0 24px', height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{meta.title}</div>
          <span style={{ fontSize: 13, color: 'var(--slate)' }}>Q {current + 1} / {questions.length}</span>
        </div>

        {/* Timer */}
        <div style={{
          fontFamily: 'monospace', fontSize: 22, fontWeight: 700,
          color: urgency ? 'var(--error)' : 'var(--purple)',
          background: urgency ? 'rgba(239,68,68,0.1)' : 'var(--purple)',
          color: urgency ? 'var(--error)' : 'var(--white)',
          padding: '8px 20px', borderRadius: 'var(--radius-btn)',
          border: `2px solid ${urgency ? 'var(--error)' : 'var(--purple)'}`,
          animation: urgency && timeLeft % 2 === 0 ? 'none' : 'none',
        }}>
          {padTime(mins)}:{padTime(secs)}
        </div>

        <button onClick={submitTest} className="btn btn-primary" style={{ height: 40, fontSize: 13 }}>
          Submit Test
        </button>
      </div>

      <div className="container" style={{ maxWidth: 900, paddingTop: 24, paddingBottom: 80 }}>
        <div className="mock-engine-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 24 }}>

          {/* Question card */}
          <div>
            <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: '40px', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <span className="tag-category">Question {current + 1}</span>
                <button
                  onClick={() => toggleMark(current)}
                  style={{ fontSize: 13, fontWeight: 600, color: marked[current] ? 'var(--orange)' : 'var(--slate)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  {marked[current] ? '🔖 Marked' : '📌 Mark for Review'}
                </button>
              </div>
              <p style={{ fontSize: 17, color: 'var(--navy)', lineHeight: 1.65, fontWeight: 500, marginBottom: 32 }}>{q.q}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {q.opts.map((opt, oi) => {
                  const isSelected = userAns === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => selectAnswer(current, oi)}
                      style={{
                        padding: '16px 20px',
                        border: `2px solid ${isSelected ? 'var(--purple)' : 'var(--hairline)'}`,
                        background: isSelected ? 'rgba(190,148,245,0.1)' : 'var(--white)',
                        borderRadius: 12,
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: 15,
                        color: isSelected ? 'var(--purple)' : 'var(--navy-body)',
                        fontWeight: isSelected ? 700 : 400,
                        transition: 'all 150ms ease',
                        display: 'flex', alignItems: 'center', gap: 12,
                      }}
                    >
                      <span style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${isSelected ? 'var(--purple)' : 'var(--hairline)'}`, background: isSelected ? 'var(--purple)' : 'transparent', color: isSelected ? 'var(--white)' : 'var(--slate)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {['A','B','C','D'][oi]}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <button onClick={() => setCurrent(c => Math.max(0, c - 1))} className="btn btn-secondary-light" disabled={current === 0}>
                ← Previous
              </button>
              {current < questions.length - 1 ? (
                <button onClick={() => setCurrent(c => c + 1)} className="btn btn-primary">
                  Next →
                </button>
              ) : (
                <button onClick={submitTest} className="btn btn-primary">
                  Submit Test ✓
                </button>
              )}
            </div>
          </div>

          {/* Question palette */}
          <div>
            <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 'var(--radius-card)', padding: 20, position: 'sticky', top: 84 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Question Palette</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, marginBottom: 16 }}>
                {questions.map((_, qi) => {
                  const isAnswered = answers[qi] !== undefined;
                  const isMarked   = marked[qi];
                  const isCurrent  = qi === current;
                  let bg = 'var(--bg-main)', border = '1px solid rgba(0,0,0,0.15)', color = 'var(--slate)';
                  if (isCurrent)  { bg = 'var(--purple)'; color = 'var(--white)'; border = 'none'; }
                  else if (isMarked)   { bg = 'var(--orange)'; color = 'var(--white)'; border = 'none'; }
                  else if (isAnswered) { bg = 'var(--success)'; color = 'var(--white)'; border = 'none'; }
                  return (
                    <button key={qi} onClick={() => setCurrent(qi)} style={{ width: '100%', aspectRatio: '1', borderRadius: 8, background: bg, border, color, fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 100ms ease' }}>
                      {qi + 1}
                    </button>
                  );
                })}
              </div>
              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
                {[
                  { col: 'var(--success)', label: 'Answered' },
                  { col: 'var(--orange)',  label: 'Marked for Review' },
                  { col: 'var(--bg-main)', label: 'Not Visited' },
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 14, height: 14, borderRadius: 4, background: l.col, border: '1px solid rgba(0,0,0,0.15)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--slate)' }}>{l.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--hairline)' }}>
                <div style={{ fontSize: 12, color: 'var(--slate)' }}>
                  <div>Answered: <strong style={{ color: 'var(--success)' }}>{Object.keys(answers).length}</strong></div>
                  <div>Marked: <strong style={{ color: 'var(--orange)' }}>{Object.keys(marked).filter(k => marked[k]).length}</strong></div>
                  <div>Remaining: <strong style={{ color: 'var(--navy)' }}>{questions.length - Object.keys(answers).length}</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
