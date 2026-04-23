/* Server Component — all content is SSR'd for crawlers */

import { faqQuestions, glossaryTerms } from '@/lib/flip-calculator/seo-data';

export default function ContentSections() {
  return (
    <article className="calc-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* ── Key Takeaways ── */}
      <aside aria-label="Key takeaways" className="content-callout my-10">
        <h2 className="text-base font-bold text-calc-heading mb-3">Key Takeaways</h2>
        <ul className="space-y-2 text-sm text-calc-text">
          <li>The 70% rule caps your offer at <strong>ARV × 0.70 minus rehab</strong>.</li>
          <li>A-grade flips hit <strong>40%+ annualized ROI</strong> and <strong>20%+ profit margin</strong>.</li>
          <li>Budget <strong>10–20% contingency</strong> on rehab costs — never skip this.</li>
          <li>Hard money rates typically run <strong>10–13% with 2–3 points</strong>.</li>
          <li>Selling costs average <strong>7–9% of ARV</strong> (agent + closing + transfer tax).</li>
          <li>Hold periods over <strong>9 months</strong> usually kill annualized returns.</li>
          <li>Break-even analysis reveals your <strong>minimum viable sale price</strong>.</li>
        </ul>
      </aside>

      {/* ── Table of Contents ── */}
      <nav aria-label="On this page" className="content-toc my-10">
        <h2 className="sr-only">Table of contents</h2>
        <p className="text-xs font-semibold text-calc-muted uppercase tracking-wider mb-3">On this page</p>
        <ol className="columns-2 gap-x-8 space-y-1.5 text-sm">
          <li><a href="#what-is" className="text-calc-accent hover:underline">What is a fix and flip calculator?</a></li>
          <li><a href="#how-to-use" className="text-calc-accent hover:underline">How to use this calculator</a></li>
          <li><a href="#seventy-percent-rule" className="text-calc-accent hover:underline">The 70% rule explained</a></li>
          <li><a href="#costs" className="text-calc-accent hover:underline">Every cost in a flip</a></li>
          <li><a href="#grading" className="text-calc-accent hover:underline">Deal grading methodology</a></li>
          <li><a href="#financing" className="text-calc-accent hover:underline">Financing comparison</a></li>
          <li><a href="#examples" className="text-calc-accent hover:underline">Example deals</a></li>
          <li><a href="#faq" className="text-calc-accent hover:underline">FAQ</a></li>
          <li><a href="#glossary" className="text-calc-accent hover:underline">Glossary</a></li>
          <li><a href="#about" className="text-calc-accent hover:underline">About this calculator</a></li>
        </ol>
      </nav>

      {/* ═══ What Is ═══ */}
      <section id="what-is" aria-labelledby="what-is-heading" className="content-section">
        <h2 id="what-is-heading">What Is a Fix and Flip Calculator?</h2>
        <p>A fix and flip calculator is a financial modeling tool that estimates net profit, return on investment, and deal viability for real estate rehab projects. You enter the purchase price, After Repair Value (ARV), rehab costs, financing terms, and hold period. The calculator computes total project cost, cash required, profit margin, and deal grade in real time.</p>
        <p>Unlike a simple spreadsheet, this analyzer models the interaction between financing leverage, hold period, and cost categories. It runs sensitivity analysis across ARV and rehab scenarios, showing how small changes cascade through your returns. Every input change instantly recalculates all outputs — no formulas to maintain, no cells to break.</p>
      </section>

      {/* ═══ How to Use ═══ */}
      <section id="how-to-use" aria-labelledby="how-to-use-heading" className="content-section">
        <h2 id="how-to-use-heading">How to Use This Calculator</h2>
        <p>To analyze a fix and flip deal, follow these six steps. Each step maps to an input section in the calculator above. As you enter numbers, the dashboard updates instantly with profit, ROI, and deal grade.</p>
        <ol className="content-steps">
          <li>
            <strong>Estimate After Repair Value (ARV).</strong> Research comparable sold properties within 0.5 miles, sold within 90 days, with similar size and condition. Average the top 3–5 comps. This is the most important number in your analysis.
          </li>
          <li>
            <strong>Scope the rehab and add contingency.</strong> Walk the property with a contractor. List every repair line item, sum them, and add 10–20% contingency. Enter the base rehab cost and contingency percentage separately.
          </li>
          <li>
            <strong>Apply the 70% rule for your maximum offer.</strong> The calculator automatically computes MAO as ARV × 0.70 minus total rehab. Compare this to your actual purchase price to see if you are within safe margins.
          </li>
          <li>
            <strong>Model financing costs.</strong> Select your financing type (hard money, private, conventional, or cash). Enter the interest rate, origination points, LTC ratio, and LTV/ARV cap. The calculator determines the lower of the two loan limits.
          </li>
          <li>
            <strong>Add holding and selling costs.</strong> Enter annual property taxes, insurance, monthly utilities, HOA, agent commission percentage, seller closing costs, transfer tax, and staging. These are often underestimated — they typically consume 12–18% of ARV.
          </li>
          <li>
            <strong>Review deal grade and profit margin.</strong> Check the dashboard for your deal grade (A through F), net profit, total ROI, annualized ROI, and the sensitivity heatmap. A-grade deals have annualized ROI above 40% and profit margins above 20%.
          </li>
        </ol>
      </section>

      {/* ═══ 70% Rule ═══ */}
      <section id="seventy-percent-rule" aria-labelledby="seventy-pct-heading" className="content-section">
        <h2 id="seventy-pct-heading">The 70% Rule Explained</h2>
        <p>The 70% rule states that a flipper should pay no more than 70% of the After Repair Value (ARV) minus estimated rehab costs. This formula — <strong>MAO = ARV × 0.70 − Rehab</strong> — reserves 30% of ARV to cover financing, holding costs, selling costs, and profit margin.</p>
        <h3>Worked Example</h3>
        <p>Consider a single-family home with an ARV of <strong>$300,000</strong> and rehab costs of <strong>$40,000</strong>:</p>
        <ul>
          <li>ARV × 0.70 = $300,000 × 0.70 = <strong>$210,000</strong></li>
          <li>MAO = $210,000 − $40,000 = <strong>$170,000</strong></li>
        </ul>
        <p>If you can purchase the property at or below $170,000, the deal passes the 70% rule. The remaining $90,000 spread (30% of ARV) covers your financing costs, holding costs, selling costs, and profit.</p>
        <h3>When to Adjust the Rule</h3>
        <p>In highly competitive markets with fast appreciation, some investors use <strong>75%</strong>. In declining or uncertain markets, conservative investors use <strong>65%</strong>. New investors should always start at 70% — it provides enough margin to absorb mistakes while still finding deals.</p>
      </section>

      {/* ═══ Costs ═══ */}
      <section id="costs" aria-labelledby="costs-heading" className="content-section">
        <h2 id="costs-heading">Understanding Every Cost in a Fix and Flip</h2>
        <p>Total project cost in a fix and flip spans five categories: purchase, rehab, financing, holding, and selling. Most failed flips underestimate at least two of these categories. This calculator models all five to prevent surprises.</p>

        <h3>Purchase Costs</h3>
        <p>Purchase costs include the acquisition price plus buyer closing costs (typically <strong>1.5–3%</strong> of purchase price) and due diligence fees (inspection, appraisal). On a $400,000 purchase, expect $6,000–$12,000 in closing costs plus $500–$1,500 in inspections.</p>

        <h3>Rehab Costs and Contingency</h3>
        <p>Rehab costs cover all renovation labor and materials. Always add a contingency buffer: <strong>10%</strong> for cosmetic work with known scope, <strong>15–20%</strong> for structural work, older properties, or first-time flips. A $60,000 rehab with 15% contingency budgets $69,000 total.</p>

        <h3>Financing Costs</h3>
        <p>Financing costs include interest payments over the hold period, origination points, and lender flat fees. On a $340,000 hard money loan at 11% for 6 months with 2 points, total financing cost is approximately <strong>$25,500</strong> ($18,700 interest + $6,800 origination).</p>

        <h3>Holding Costs</h3>
        <p>Holding costs are recurring monthly expenses during ownership: property taxes, insurance, utilities, and HOA dues. On a typical $400,000 property, monthly holding costs (excluding financing) run <strong>$800–$1,500</strong>. Over a 6-month hold, that is $4,800–$9,000.</p>

        <h3>Selling Costs</h3>
        <p>Selling costs are often the most underestimated category. They include agent commission (<strong>5–6%</strong> of sale price), seller closing costs (<strong>1–2%</strong>), transfer taxes (<strong>0–2%</strong>), and staging ($1,500–$3,000). Total selling costs on a $500,000 sale typically reach <strong>$35,000–$45,000</strong>.</p>
      </section>

      {/* ═══ Grading ═══ */}
      <section id="grading" aria-labelledby="grading-heading" className="content-section">
        <h2 id="grading-heading">How Deal Grades Are Calculated</h2>
        <p>This calculator assigns a letter grade from A to F based on two metrics: annualized ROI and profit margin. Both thresholds must be met for each grade. A deal with negative net profit is automatically graded F regardless of other metrics.</p>
        <div className="overflow-x-auto my-6">
          <table className="content-table">
            <thead>
              <tr>
                <th>Grade</th>
                <th>Annualized ROI</th>
                <th>Profit Margin</th>
                <th>Assessment</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="font-bold text-calc-profit">A</td><td>≥ 40%</td><td>≥ 20%</td><td>Exceptional — strong buy</td></tr>
              <tr><td className="font-bold text-calc-profit">B</td><td>≥ 25%</td><td>≥ 15%</td><td>Solid — good deal with margin for error</td></tr>
              <tr><td className="font-bold text-calc-warning">C</td><td>≥ 15%</td><td>≥ 10%</td><td>Marginal — proceed with caution</td></tr>
              <tr><td className="font-bold text-calc-warning">D</td><td>&lt; 15%</td><td>&lt; 10%</td><td>Weak — thin margin, high risk</td></tr>
              <tr><td className="font-bold text-calc-loss">F</td><td colSpan={2}>Net profit ≤ $0</td><td>Money-losing deal</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ Financing Comparison ═══ */}
      <section id="financing" aria-labelledby="financing-heading" className="content-section">
        <h2 id="financing-heading">Financing Comparison: Hard Money vs Conventional vs Private</h2>
        <p>The financing structure of a fix and flip directly impacts total project cost, cash required, and ROI. Hard money is the most common for flips due to speed and flexibility. Conventional loans offer lower rates but slower closings. Private lending falls between the two.</p>
        <div className="overflow-x-auto my-6">
          <table className="content-table">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Hard Money</th>
                <th>Conventional</th>
                <th>Private</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Interest Rate</td><td>10–13%</td><td>6.5–8%</td><td>8–12%</td></tr>
              <tr><td>Origination Points</td><td>1.5–3</td><td>0–1</td><td>1–2</td></tr>
              <tr><td>LTC Range</td><td>75–90%</td><td>75–80%</td><td>70–85%</td></tr>
              <tr><td>LTV/ARV Cap</td><td>65–75%</td><td>70–80%</td><td>60–70%</td></tr>
              <tr><td>Typical Term</td><td>6–18 months</td><td>15–30 years</td><td>6–24 months</td></tr>
              <tr><td>Time to Close</td><td>7–14 days</td><td>30–45 days</td><td>5–21 days</td></tr>
              <tr><td>Best For</td><td>Speed, distressed properties</td><td>BRRRR, longer holds</td><td>Relationship-based, flexibility</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ Example Deals ═══ */}
      <section id="examples" aria-labelledby="examples-heading" className="content-section">
        <h2 id="examples-heading">Example Deals: Three Real-World Scenarios</h2>
        <p>These three worked examples show how the calculator handles different deal profiles — from a strong buy to a break-even scenario. Each uses realistic numbers for its respective market.</p>

        <h3>Example 1: Seattle Single-Family Rehab (Grade A)</h3>
        <p>A 1,400 sq ft single-family home in a Seattle suburb purchased at <strong>$425,000</strong> with an ARV of <strong>$625,000</strong> based on three comps ($610k, $635k, $630k). The property needs a full kitchen and bathroom remodel, new flooring, exterior paint, and landscaping.</p>
        <ul>
          <li><strong>Purchase price:</strong> $425,000 (closing costs: 2% = $8,500)</li>
          <li><strong>Rehab:</strong> $85,000 base + 10% contingency = $93,500</li>
          <li><strong>Financing:</strong> Hard money at 11%, 2 points, 85% LTC ($361,250 loan), 6-month hold</li>
          <li><strong>Holding costs:</strong> $5,400 taxes + $2,400 insurance + $250/mo utilities = $1,150/mo × 6 = $6,900</li>
          <li><strong>Selling costs:</strong> 5.5% commission ($34,375) + 1.5% closing ($9,375) + 0.5% transfer tax ($3,125) + $2,000 staging = $48,875</li>
          <li><strong>Total project cost:</strong> $590,000</li>
          <li><strong>Net profit:</strong> $35,000</li>
          <li><strong>Cash in deal:</strong> ~$155,000</li>
          <li><strong>Total ROI:</strong> 22.6% | Annualized: 50.3% | <strong>Grade: A</strong></li>
        </ul>
        <p>The 70% rule MAO is $343,500 ($625k × 0.70 − $93.5k). At $425,000, this deal does <em>not</em> pass the 70% rule — but the strong ARV and moderate rehab still produce an A-grade return. This illustrates why the 70% rule is a guideline, not a mandate.</p>

        <h3>Example 2: Phoenix Light Cosmetic Flip (Grade B)</h3>
        <p>A 1,200 sq ft ranch in Phoenix purchased at <strong>$285,000</strong> with an ARV of <strong>$365,000</strong>. The property needs paint, flooring, fixtures, and minor landscaping — no structural work.</p>
        <ul>
          <li><strong>Purchase price:</strong> $285,000 (closing costs: 2% = $5,700)</li>
          <li><strong>Rehab:</strong> $28,000 base + 10% contingency = $30,800</li>
          <li><strong>Financing:</strong> Conventional at 7.5%, 0.5 points, 80% LTC ($228,000 loan), 4-month hold</li>
          <li><strong>Holding costs:</strong> $3,200 taxes + $1,800 insurance + $200/mo utilities = $617/mo × 4 = $2,467</li>
          <li><strong>Selling costs:</strong> 5.5% ($20,075) + 1.5% ($5,475) + $1,500 staging = $27,050</li>
          <li><strong>Total project cost:</strong> $353,700</li>
          <li><strong>Net profit:</strong> $11,300</li>
          <li><strong>Total ROI:</strong> 8.9% | Annualized: 28.8% | <strong>Grade: B</strong></li>
        </ul>

        <h3>Example 3: Detroit Heavy Rehab — Break-Even Analysis (Grade F)</h3>
        <p>A 1,600 sq ft bungalow in Detroit purchased at <strong>$65,000</strong> with an ARV of <strong>$140,000</strong>. The property needs a full gut rehab: new HVAC, electrical, plumbing, roof, kitchen, bathrooms, and foundation work.</p>
        <ul>
          <li><strong>Purchase price:</strong> $65,000 (closing costs: 2% = $1,300)</li>
          <li><strong>Rehab:</strong> $70,000 base + 20% contingency = $84,000</li>
          <li><strong>Financing:</strong> Hard money at 12%, 3 points, 85% LTC ($55,250 loan), 10-month hold</li>
          <li><strong>Holding costs:</strong> $1,800 taxes + $1,200 insurance + $200/mo utilities = $450/mo × 10 = $4,500</li>
          <li><strong>Selling costs:</strong> 6% ($8,400) + 1.5% ($2,100) + $1,000 staging = $11,500</li>
          <li><strong>Total project cost:</strong> $172,500</li>
          <li><strong>Net profit:</strong> −$32,500</li>
          <li><strong>Deal grade: <strong className="text-calc-loss">F</strong></strong></li>
        </ul>
        <p>This deal loses money because the rehab-to-ARV ratio is too high. The $84,000 rehab on a $140,000 ARV leaves no margin after financing and selling costs. The 70% rule MAO would be $14,000 ($140k × 0.70 − $84k) — meaning you would need to acquire the property for $14,000 or less to make this work.</p>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" aria-labelledby="faq-heading" className="content-section">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <p>Common questions about fix and flip investing, deal analysis, and how this calculator works. Each answer is designed to stand alone as a complete, definitive response.</p>
        <div className="space-y-2 mt-6">
          {faqQuestions.map((faq, i) => (
            <details key={i} className="content-faq-item">
              <summary className="content-faq-question">{faq.q}</summary>
              <p className="content-faq-answer">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ Glossary ═══ */}
      <section id="glossary" aria-labelledby="glossary-heading" className="content-section">
        <h2 id="glossary-heading">Glossary of Fix and Flip Terms</h2>
        <p>Key terms used throughout this calculator and in the fix and flip industry. Each definition is written to be self-contained and directly extractable.</p>
        <dl className="content-glossary mt-6">
          {glossaryTerms.map((item, i) => (
            <div key={i} className="content-glossary-item">
              <dt>{item.term}</dt>
              <dd>{item.definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ═══ About ═══ */}
      <section id="about" aria-labelledby="about-heading" className="content-section">
        <h2 id="about-heading">About This Calculator</h2>
        <p>This fix and flip deal analyzer was built by <strong>Shepherd Mortgage</strong>, a nationwide investment property lender with over 15 years of experience in bridge, fix-and-flip, construction, and long-term rental financing.</p>
        <h3>Methodology</h3>
        <p>All calculations follow standard real estate investment formulas. Maximum Allowable Offer uses the 70% rule: <strong>(ARV × 0.70) − Rehab</strong>. Annualized ROI compounds total ROI: <strong>((1 + ROI) ^ (12 / hold months)) − 1</strong>. Loan amounts are calculated as the lesser of (Purchase × LTC%) and (ARV × LTV cap%). Interest is modeled as interest-only payments.</p>
        <h3>Sources</h3>
        <ul>
          <li>National Association of Realtors (NAR) — agent commission benchmarks</li>
          <li>Attom Data Solutions — fix and flip market statistics</li>
          <li>BiggerPockets — industry standard formulas and contingency benchmarks</li>
          <li>Freddie Mac / Fannie Mae — conventional loan guidelines</li>
        </ul>
        <p className="text-xs text-calc-muted mt-6">Last updated: April 2026. This calculator is for educational purposes and does not constitute financial advice. Consult a licensed professional before making investment decisions.</p>
      </section>
    </article>
  );
}
