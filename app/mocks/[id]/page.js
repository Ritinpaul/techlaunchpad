'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import mocksData from '@/data/mocks.json';

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
  'mk3': [
    { id: 'm1', q: 'A new FMCG brand wants to enter the premium skincare market. Which framework best guides the launch strategy?', opts: ['BCG Matrix', 'STP — Segmentation, Targeting, Positioning', 'McKinsey 7S', 'Ansoff Matrix'], ans: 1, exp: 'STP is the foundational marketing launch framework: segment the market, pick a target, and craft a positioning statement.' },
    { id: 'm2', q: 'What is the primary difference between a Push and Pull marketing strategy?', opts: ['Push uses social media; Pull uses TV ads', 'Push drives product through distribution channels to consumers; Pull attracts consumers to the product', 'Push is B2B; Pull is B2C', 'Push is cheaper; Pull is more effective'], ans: 1, exp: 'Push = manufacturer → retailer → consumer (trade promos, distributor incentives). Pull = brand → consumer demand (advertising, word-of-mouth).' },
    { id: 'm3', q: 'Brand equity is BEST defined as:', opts: ['The monetary value of a brand on the balance sheet', 'The premium consumers are willing to pay for a brand vs. an unbranded equivalent', 'The number of brand followers on social media', 'Total advertising spend over a brand\'s lifetime'], ans: 1, exp: 'Brand equity = the premium a brand commands. Measured by price premium, loyalty, awareness, and perceived quality.' },
    { id: 'm4', q: 'A company\'s NPS drops from +45 to +20 QoQ. The first diagnostic action is:', opts: ['Increase advertising spend', 'Segment detractors by reason (product, service, price, or experience)', 'Immediately launch a loyalty program', 'Hire a brand ambassador'], ans: 1, exp: 'NPS decline requires root cause segmentation — understanding WHY customers are detractors before prescribing a solution.' },
    { id: 'm5', q: 'A cola brand faces 15% market share loss over 2 years. The MOST likely root cause to investigate first is:', opts: ['Competitor advertising outspend', 'Distribution gap — not available in enough outlets', 'Product quality decline', 'Price increase vs. competitors'], ans: 1, exp: 'For FMCG, availability/distribution is the highest-leverage variable. You can\'t buy what isn\'t on the shelf.' },
    { id: 'm6', q: 'Customer Lifetime Value (CLV) is defined as:', opts: ['Average purchase value', 'Total revenue from a customer over their entire relationship with a brand', 'Revenue in the first year of a customer relationship', 'Revenue minus acquisition cost in year 1'], ans: 1, exp: 'CLV = (Average Purchase Value × Purchase Frequency × Average Customer Lifespan). It guides how much to spend on acquisition.' },
    { id: 'm7', q: 'A "challenger brand" strategy is BEST suited for:', opts: ['The market leader defending share', 'A brand with 10–25% share aiming to attack the leader\'s position', 'A new entrant with no brand recognition', 'A niche brand protecting a small segment'], ans: 1, exp: 'Challenger brands attack the market leader by differentiating on a dimension the leader can\'t easily copy (price, values, experience).' },
    { id: 'm8', q: 'Co-branding is a strategy that works BEST when:', opts: ['Both brands target completely different audiences', 'Both brands share similar values and their audiences overlap', 'The weaker brand wants to piggyback the stronger brand\'s recognition', 'Both brands have the same product category'], ans: 1, exp: 'Co-branding creates mutual value — both brands must be complementary (similar equity, compatible audiences) or it dilutes both.' },
    { id: 'm9', q: 'The 4 Ps of marketing are:', opts: ['People, Process, Presence, Promotion', 'Product, Price, Place, Promotion', 'Planning, Positioning, Pricing, Promotions', 'Product, Profit, Pipeline, People'], ans: 1, exp: 'The classic marketing mix: Product (what), Price (how much), Place (where), Promotion (how we communicate).' },
    { id: 'm10', q: 'A retail FMCG brand wants to increase basket size per transaction. Which lever is most direct?', opts: ['Launch a loyalty card', 'Cross-merchandising and in-store bundling', 'Increase brand advertising on TV', 'Hire more sales staff'], ans: 1, exp: 'Cross-merchandising (placing complementary products together) and bundles directly increase items per transaction at point of purchase.' },
    { id: 'm11', q: 'Which pricing strategy is Apple MOST known for?', opts: ['Penetration pricing', 'Price skimming and premium positioning', 'Competitive pricing (market rate)', 'Freemium pricing'], ans: 1, exp: 'Apple uses premium pricing + price skimming: launch at high prices for early adopters, maintain premium tier over time.' },
    { id: 'm12', q: 'A brand\'s "share of voice" measures:', opts: ['Market share of the brand', 'Brand\'s advertising spend as a % of total category advertising spend', 'Number of social media mentions', 'Brand recall in consumer surveys'], ans: 1, exp: 'Share of Voice (SOV) = Brand Ad Spend / Total Category Ad Spend. High SOV relative to market share (excess SOV) often predicts future market share gains.' },
    { id: 'm13', q: 'A company launches a product using a "freemium" model. The key business risk is:', opts: ['Product quality issues', 'Low conversion rate from free to paid users', 'Regulatory compliance', 'Manufacturing cost increases'], ans: 1, exp: 'Freemium only works if free users convert to paid. If conversion rate is low (typically 2–5% is target), the model burns cash on free users.' },
    { id: 'm14', q: 'What does "category management" mean in retail/FMCG?', opts: ['Managing a brand\'s social media categories', 'Managing an entire product category as a strategic business unit with the retailer', 'Organising products by SKU in a warehouse', 'Managing seasonal product categories only'], ans: 1, exp: 'Category management is a collaborative retailer-manufacturer approach where a category (e.g., "biscuits") is managed as a single business unit to maximise total category sales.' },
    { id: 'm15', q: 'A brand with 90% awareness but 30% trial rate has a problem in:', opts: ['Awareness building', 'Converting awareness to first purchase (the consideration-to-trial gap)', 'Post-purchase loyalty', 'Distribution reach'], ans: 1, exp: 'High awareness + low trial = the brand is known but not compelling enough to drive purchase. Diagnosis: messaging, pricing, or in-store activation failure.' },
    { id: 'm16', q: 'Which metric measures brand loyalty most directly?', opts: ['Net Promoter Score', 'Repeat Purchase Rate / Brand Loyalty Index', 'Market Share', 'Share of Voice'], ans: 1, exp: 'Repeat Purchase Rate measures how often buyers return — the most direct proxy for actual loyalty behaviour, not just stated preference.' },
    { id: 'm17', q: 'A D2C brand is growing rapidly but its Customer Acquisition Cost (CAC) is rising. The best lever to improve unit economics is:', opts: ['Increase marketing spend', 'Improve CLV via repeat purchase and cross-sell', 'Reduce product quality to lower COGS', 'Launch on a new social media platform'], ans: 1, exp: 'The CAC:CLV ratio drives D2C profitability. If CAC is rising, improving CLV (via retention, upsell) improves the ratio without increasing spend.' },
    { id: 'm18', q: 'What is the "halo effect" in marketing?', opts: ['A product\'s premium packaging increasing perceived quality', 'Positive feelings about one product/attribute spilling over to overall brand perception', 'The effect of celebrity endorsement on brand recall', 'Increased sales during festive seasons'], ans: 1, exp: 'Halo effect: one positive attribute (e.g., Apple\'s design excellence) creates a halo over all other brand perceptions (quality, reliability, innovation).' },
    { id: 'm19', q: 'FMCG companies typically measure "weighted distribution" rather than "numeric distribution" because:', opts: ['It is easier to calculate', 'It accounts for outlet size/importance — being in a big outlet counts more than a small one', 'Numeric distribution data is unavailable', 'SEBI mandates weighted distribution reporting'], ans: 1, exp: 'Weighted distribution = distribution weighted by each outlet\'s sales volume. Being in a large supermarket counts more than a small kiosk.' },
    { id: 'm20', q: 'A brand has high salience but low brand love. This means:', opts: ['Consumers buy it out of habit but don\'t emotionally connect with it', 'Consumers love it but don\'t know it exists', 'The brand is a niche luxury product', 'The brand has a PR crisis'], ans: 0, exp: 'High salience = easily recalled; low love = no emotional preference. Classic "default choice" brand — vulnerable to disruption by an emotionally resonant challenger.' },
  ],
  'mk4': [
    { id: 'o1', q: 'Which inventory management model minimises total holding + ordering costs?', opts: ['FIFO Model', 'Economic Order Quantity (EOQ) Model', 'Just-In-Time Model', 'ABC Analysis'], ans: 1, exp: 'EOQ = √(2DS/H) minimises the sum of ordering costs and holding costs. It gives the optimal order quantity.' },
    { id: 'o2', q: 'A supply chain\'s "bullwhip effect" refers to:', opts: ['Seasonal demand spikes in retail', 'Small demand fluctuations at retail level amplifying to large inventory fluctuations at manufacturer level', 'Just-in-time delivery failures', 'Supplier quality degradation over time'], ans: 1, exp: 'The bullwhip effect: small demand variability at retail gets amplified upstream — retailers overbuy, then wholesalers, then manufacturers overproduce.' },
    { id: 'o3', q: 'OTIF (On-Time In-Full) is a KPI that measures:', opts: ['Order processing speed', 'Whether deliveries reach the customer on the right date AND with the right quantity/quality', 'Inventory turnover rate', 'Supplier payment terms'], ans: 1, exp: 'OTIF = On Time (delivered by committed date) AND In Full (correct quantity and specification). It\'s the gold standard supply chain delivery KPI.' },
    { id: 'o4', q: 'A factory runs at 85% capacity utilisation. The decision to add capacity should be driven by:', opts: ['Reaching 80% utilisation', 'Sustained demand forecast growth AND inability to flex current capacity further', 'Competitor\'s capacity expansion', 'Employee headcount reaching a limit'], ans: 1, exp: 'Capacity expansion is driven by demand forecasts, not current utilisation alone. You need evidence of sustained demand that current operations can\'t serve.' },
    { id: 'o5', q: 'What is "Value Stream Mapping"?', opts: ['Mapping a product\'s distribution network', 'A lean tool that visualises every step in a process to identify waste and flow bottlenecks', 'Mapping customer value perception vs. price', 'A financial tool for tracking value creation'], ans: 1, exp: 'Value Stream Mapping (VSM) is a lean tool — it maps all steps in a process (value-adding + non-value-adding) to identify waste and optimise flow.' },
    { id: 'o6', q: 'In a manufacturing context, "Takt Time" is:', opts: ['Time taken to complete one batch', 'The rate at which products must be completed to meet customer demand', 'The time a machine is idle', 'Total cycle time including setup'], ans: 1, exp: 'Takt Time = Available Production Time / Customer Demand Rate. It\'s the production drumbeat — how fast you need to make products to meet demand.' },
    { id: 'o7', q: 'Which lean principle directly addresses overproduction waste?', opts: ['Kaizen', 'Just-In-Time (JIT) production', 'Poka-Yoke', '5S methodology'], ans: 1, exp: 'JIT produces only what is needed, when it\'s needed — directly eliminating overproduction, which is the #1 waste in Toyota\'s lean system.' },
    { id: 'o8', q: 'A 3PL (Third-Party Logistics) provider is used when a company wants to:', opts: ['Build its own logistics infrastructure', 'Outsource logistics operations to specialised providers to reduce cost and complexity', 'Expand into new geographies without a partner', 'Manage inventory in-house more efficiently'], ans: 1, exp: '3PL outsources warehousing, transportation, and fulfilment to specialists — freeing core capital and expertise for the company\'s primary business.' },
    { id: 'o9', q: 'Net Promoter Score has no role in Operations. True or False?', opts: ['True — NPS is purely a marketing metric', 'False — NPS reflects operational delivery quality and impacts customer retention', 'True — Operations is measured by efficiency, not customer satisfaction', 'False — NPS is used only in HR operations'], ans: 1, exp: 'Operations drives NPS: late deliveries, product defects, and poor fulfilment are leading causes of customer detraction. Ops and NPS are deeply linked.' },
    { id: 'o10', q: 'ABC inventory analysis classifies stock as:', opts: ['Available, Backordered, Critical', 'High-value (A), Medium-value (B), Low-value (C) by cumulative revenue contribution', 'Active, Backlogged, Cancelled', 'Automated, Batch, Custom'], ans: 1, exp: 'ABC: A items = top 20% of SKUs driving ~80% of revenue. B = next 30%, C = remaining 50%. Helps prioritise inventory management effort.' },
    { id: 'o11', q: 'Six Sigma aims to reduce defects to:', opts: ['1 in 100', '3.4 defects per million opportunities (99.99966% quality)', '1 in 1,000', '5% defect rate'], ans: 1, exp: 'Six Sigma = 3.4 DPMO (Defects Per Million Opportunities) — statistically equivalent to 6 standard deviations from the mean.' },
    { id: 'o12', q: 'A company\'s Days Inventory Outstanding (DIO) increases from 30 to 55 days. This indicates:', opts: ['Improved inventory management', 'Inventory is sitting longer — possible overstocking, demand slowdown, or poor planning', 'Faster sales velocity', 'Better supplier terms'], ans: 1, exp: 'Higher DIO = inventory taking longer to sell. Warning sign of demand weakness, excess purchasing, or product mix issues.' },
    { id: 'o13', q: 'The primary goal of "Total Productive Maintenance" (TPM) is:', opts: ['Replacing all old machinery', 'Maximising equipment effectiveness (OEE) by eliminating downtime, defects, and speed losses', 'Reducing maintenance staff costs', 'Implementing predictive maintenance only'], ans: 1, exp: 'TPM maximises OEE (Overall Equipment Effectiveness) = Availability × Performance × Quality. It involves operators in machine upkeep.' },
    { id: 'o14', q: 'A "make or buy" decision is primarily driven by:', opts: ['Employee preference', 'Cost comparison, core competency, and strategic control considerations', 'Government policy', 'Stock market conditions'], ans: 1, exp: 'Make vs. buy: compare internal cost vs. market price, consider whether the activity is core to competitive advantage, and assess supply chain risk.' },
    { id: 'o15', q: 'Cross-docking in logistics means:', opts: ['Loading goods from one truck to another at a dock without warehousing', 'Storing goods at a cross-border facility', 'Using two different logistics providers simultaneously', 'A customs clearance process'], ans: 0, exp: 'Cross-docking: inbound goods are transferred directly to outbound transport with minimal or zero storage time — eliminates warehousing cost.' },
    { id: 'o16', q: 'DMAIC in Six Sigma stands for:', opts: ['Define, Measure, Analyse, Improve, Control', 'Design, Manufacture, Assemble, Inspect, Complete', 'Develop, Market, Assess, Implement, Calculate', 'Diagnose, Monitor, Adjust, Integrate, Close'], ans: 0, exp: 'DMAIC: Define the problem → Measure current performance → Analyse root causes → Improve → Control to sustain gains.' },
    { id: 'o17', q: 'Safety stock is held in inventory to:', opts: ['Reduce purchasing costs', 'Buffer against demand variability and supply disruptions', 'Avoid paying taxes on idle assets', 'Increase warehouse utilisation'], ans: 1, exp: 'Safety stock = buffer inventory held above expected demand to cover variability in demand or supply lead times — prevents stockouts.' },
    { id: 'o18', q: 'A bottleneck in a production process is:', opts: ['The fastest machine in the line', 'The constraint that limits total system throughput — determines the maximum output rate', 'A machine that produces defective output', 'A process step that requires the most workers'], ans: 1, exp: 'Theory of Constraints: the bottleneck = the step with lowest capacity. System throughput is limited by the bottleneck — it must be elevated first.' },
    { id: 'o19', q: 'Return on Assets (ROA) is most relevant to which operations decision?', opts: ['Hiring decisions', 'Capital investment decisions — should we invest in this asset given the return it will generate?', 'Marketing budget allocation', 'Supply chain partner selection'], ans: 1, exp: 'ROA = Net Income / Average Total Assets. Ops managers use it to evaluate whether capital investments (new machinery, warehouses) justify their cost.' },
    { id: 'o20', q: 'Which metric directly measures a factory\'s equipment performance?', opts: ['EBITDA', 'OEE — Overall Equipment Effectiveness', 'OTIF', 'DIO'], ans: 1, exp: 'OEE = Availability × Performance × Quality. It measures how effectively a manufacturing operation uses its equipment.' },
  ],
  'mk5': [
    { id: 'g1', q: 'A CEO asks: "Should we expand to Southeast Asia?" The FIRST question you should answer is:', opts: ['What is the GDP of Southeast Asian countries?', 'Why do we want to expand — growth, diversification, or following customers?', 'Who are our competitors there?', 'What language do they speak?'], ans: 1, exp: 'Always start with the "why" — the strategic rationale shapes the entire analysis. Market entry without a clear rationale is the #1 reason expansions fail.' },
    { id: 'g2', q: 'Which of the following is a "lagging indicator" of business performance?', opts: ['Customer satisfaction scores', 'Sales pipeline value', 'Net Profit', 'Employee engagement'], ans: 2, exp: 'Lagging indicators measure past outcomes (Net Profit is reported after the period). Leading indicators (pipeline, engagement) predict future performance.' },
    { id: 'g3', q: 'Corporate governance primarily refers to:', opts: ['HR policies and employee management', 'The system of rules, practices, and accountability mechanisms by which a company is directed and controlled', 'Government regulations a company must comply with', 'A company\'s internal audit function'], ans: 1, exp: 'Corporate governance = the structures and processes ensuring companies are directed in the interest of all stakeholders (shareholders, employees, customers).' },
    { id: 'g4', q: 'A General Manager is accountable for a P&L. This means they own:', opts: ['Only revenue targets', 'Only cost targets', 'Both revenue generation AND cost management — and therefore net profit', 'Only the balance sheet'], ans: 2, exp: 'P&L ownership = full accountability for both the top line (revenue) and cost management. The GM must drive profitability, not just revenue or efficiency alone.' },
    { id: 'g5', q: 'Organisational design is most critical during:', opts: ['Stable growth periods', 'Strategic pivots, rapid scale, or post-M&A integration', 'Annual budget cycles', 'Performance review cycles'], ans: 1, exp: 'Structure follows strategy. Org design decisions are most consequential during transformation — when old structures don\'t fit new strategic requirements.' },
    { id: 'g6', q: 'The "hockey stick" growth pattern in a business plan means:', opts: ['Consistent, linear growth', 'Flat initial growth followed by sudden, steep acceleration', 'Seasonal fluctuations in revenue', 'Declining revenues followed by recovery'], ans: 1, exp: 'Hockey stick: slow early growth (investment phase) followed by rapid acceleration. Investors are sceptical without clear catalysts driving the inflection.' },
    { id: 'g7', q: 'A company faces a "talent war" in hiring. The most sustainable long-term response is:', opts: ['Increase salaries above market to attract talent', 'Build a strong employer brand and internal talent development pipeline', 'Use recruitment agencies for all hiring', 'Reduce headcount requirements through automation immediately'], ans: 1, exp: 'Sustainable talent strategy = employer branding (why join) + L&D (why stay) + internal mobility. Salary inflation alone creates a cycle.' },
    { id: 'g8', q: 'What is the primary purpose of a "business case" document?', opts: ['A marketing brochure for a product launch', 'A structured justification for a decision — problem, options, recommendation, financial impact', 'An annual financial report', 'A project management plan'], ans: 1, exp: 'A business case answers: What is the problem? What options exist? What do we recommend? What is the financial/strategic impact? It enables decisions.' },
    { id: 'g9', q: 'Span of control refers to:', opts: ['The number of products a manager oversees', 'The number of direct reports a manager supervises', 'A manager\'s budget authority', 'The geographic area a manager manages'], ans: 1, exp: 'Span of control = how many people report directly to one manager. Wide span = flat org; narrow span = tall/hierarchical org. Trade-offs in each.' },
    { id: 'g10', q: 'A "matrix organisational structure" means an employee reports to:', opts: ['Only a functional manager', 'Both a functional manager and a project/business manager simultaneously', 'Only a project manager', 'The CEO directly'], ans: 1, exp: 'Matrix structure: employees have dual reporting — functional head (e.g., Finance Director) AND business unit head. Creates complexity but enables resource sharing.' },
    { id: 'g11', q: 'What does "ESOP" stand for and why does it matter for employees?', opts: ['Early Salary Option Plan — bonus paid early', 'Employee Stock Ownership Plan — gives employees a stake in company equity', 'Emergency Severance Operations Procedure', 'External Stakeholder Operations Plan'], ans: 1, exp: 'ESOPs give employees the right to buy company stock at a fixed price. When the company grows, employees profit — aligning their interests with shareholders.' },
    { id: 'g12', q: 'Horizontal integration in strategy means:', opts: ['A company expanding into adjacent activities in its value chain', 'A company acquiring or merging with a competitor at the same level of the value chain', 'A company diversifying into unrelated industries', 'A company restructuring its internal hierarchy'], ans: 1, exp: 'Horizontal integration = acquiring competitors (same level, same industry). E.g., Facebook acquiring Instagram. Contrasts with vertical integration (up/down the value chain).' },
    { id: 'g13', q: 'A company\'s "burn rate" is most relevant in which context?', opts: ['Large profitable conglomerates', 'Early-stage startups or businesses in investment/growth phase with negative cash flow', 'Mature FMCG companies', 'Government enterprises'], ans: 1, exp: 'Burn rate = monthly cash outflow in excess of income. Startups track it to understand how many months of runway remain before cash runs out.' },
    { id: 'g14', q: 'The BCG Growth-Share Matrix classifies businesses into:', opts: ['Strengths, Weaknesses, Opportunities, Threats', 'Stars, Cash Cows, Question Marks, Dogs', 'Market Leaders, Challengers, Followers, Nichers', 'Profitable, Break-Even, Loss-Making, Investment'], ans: 1, exp: 'BCG Matrix: Stars (high growth, high share), Cash Cows (low growth, high share), Question Marks (high growth, low share), Dogs (low growth, low share).' },
    { id: 'g15', q: 'The primary role of a "Board of Directors" is:', opts: ['Day-to-day operational management', 'Strategic oversight, governance, and accountability of the management team on behalf of shareholders', 'Customer relationship management', 'Product development'], ans: 1, exp: 'The Board provides strategic oversight, hires/fires the CEO, approves major decisions, and ensures the company operates in shareholders\' interests.' },
    { id: 'g16', q: 'What is the difference between leadership and management?', opts: ['Leadership is for senior people; management is for junior people', 'Leadership inspires direction and change; management executes processes and maintains stability', 'They are synonymous terms in a business context', 'Leadership is short-term; management is long-term'], ans: 1, exp: 'Kotter\'s distinction: Managers cope with complexity (planning, organising, controlling); leaders cope with change (setting direction, aligning, motivating).' },
    { id: 'g17', q: 'A RACI matrix in project management defines:', opts: ['Revenue, Assets, Cost, Income', 'Responsible, Accountable, Consulted, Informed — roles for each task in a project', 'Risk, Assumptions, Constraints, Issues', 'Roadmap, Activities, Controls, Inputs'], ans: 1, exp: 'RACI: R=does the work, A=ultimately accountable (one person only), C=gives input before decision, I=notified after decision. Eliminates accountability confusion.' },
    { id: 'g18', q: 'Why is "stakeholder mapping" done at the start of a major project?', opts: ['To identify all potential customers', 'To understand who has influence/interest, so communication and engagement strategies are targeted correctly', 'To calculate project cost', 'To define the project timeline'], ans: 1, exp: 'Stakeholder mapping (power vs. interest grid) identifies who can block or enable the project — ensuring high-power stakeholders are managed proactively.' },
    { id: 'g19', q: 'A company\'s EBITDA margin is 18% but net margin is 2%. The most likely explanation is:', opts: ['Very high revenue', 'High depreciation, interest, or tax charges between EBITDA and net profit', 'Low gross margin', 'Accounting fraud'], ans: 1, exp: 'EBITDA-to-net-margin gap is explained by D&A, interest expense (debt-heavy capital structure), and tax. High D&A + high interest can collapse margins.' },
    { id: 'g20', q: 'Which of the following BEST describes "disruptive innovation" (Christensen)?', opts: ['A major breakthrough in technology that all companies adopt simultaneously', 'An initially inferior, simpler, cheaper product that targets underserved segments and eventually displaces incumbents', 'A luxury product that creates a new premium market', 'A government-mandated industry transformation'], ans: 1, exp: 'Disruptive innovation: starts in low-end or new markets (ignored by incumbents), improves over time, and eventually takes the mainstream market. Classic examples: Netflix vs. Blockbuster, Jio vs. existing telcos.' },
  ],
};

// Coming Soon placeholder for unlive mocks (mk6-mk50, OMET mocks)
// These return null so the engine shows the Coming Soon UI
const MOCK_META = {
  'mk1': { title: 'Case Reasoning & Strategy',     section: 'Consulting', questions: 20, duration: 20 },
  'mk2': { title: 'Finance & Markets',              section: 'Finance',    questions: 20, duration: 20 },
  'mk3': { title: 'Marketing & Brand Management',   section: 'Marketing',  questions: 20, duration: 20 },
  'mk4': { title: 'Operations & Supply Chain',      section: 'Operations', questions: 20, duration: 20 },
  'mk5': { title: 'General Management',             section: 'GM',         questions: 20, duration: 20 },
};

function padTime(n) { return String(n).padStart(2, '0'); }

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function ComingSoonScreen({ mockInfo }) {
  const releaseFormatted = formatDate(mockInfo?.releaseDate);
  const waText = encodeURIComponent(`Hi! I'd like to be notified when ${mockInfo?.title || 'this mock'} goes live on MBA Partner.`);
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center', background: 'var(--bg-main)' }}>
      <div style={{ background: 'var(--white)', border: '2px solid var(--black)', borderRadius: 24, padding: '48px 40px', maxWidth: 480, width: '100%', boxShadow: '4px 4px 0 var(--black)' }}>
        <div style={{ width: 72, height: 72, background: 'var(--yellow)', border: '2px solid var(--black)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>🔓</div>
        {mockInfo?.section && (
          <span style={{ fontSize: 11, fontWeight: 700, background: 'var(--purple)', color: 'var(--white)', padding: '4px 12px', borderRadius: 20, letterSpacing: '0.08em', display: 'inline-block', marginBottom: 16 }}>
            {mockInfo.section.toUpperCase()}
          </span>
        )}
        <h2 style={{ fontSize: 22, marginBottom: 8, color: 'var(--navy)' }}>{mockInfo?.title || 'Mock Coming Soon'}</h2>
        {releaseFormatted && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--yellow)', border: '1.5px solid var(--black)', borderRadius: 10, padding: '8px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 16 }}>📅</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--navy)' }}>Releases {releaseFormatted}</span>
          </div>
        )}
        <p style={{ color: 'var(--slate)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
          This mock hasn&apos;t gone live yet. We release new mocks every week — {mockInfo?.questionCount || 20} questions, {mockInfo?.duration || 20} minutes.
        </p>
        <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
          <a
            href={`https://wa.me/917042732092?text=${waText}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            🔔 Notify Me on WhatsApp
          </a>
          <Link href="/cat-omet/mocks" className="btn btn-secondary-light" style={{ width: '100%', justifyContent: 'center' }}>
            ← View Live Mocks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MockTestEngine({ params }) {
  const { id } = params;
  const meta = MOCK_META[id];
  const mockInfo = mocksData.find(m => m.id === id);
  const questions = (QUESTION_BANK[id] || []).slice(0, 20);

  if (!meta || questions.length === 0) {
    return <ComingSoonScreen mockInfo={mockInfo} />;
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
