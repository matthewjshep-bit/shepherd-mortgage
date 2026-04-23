// JSON-LD structured data for the Fix & Flip Calculator page
// All 5 schema blocks as specified in the SEO/AEO prompt

const SITE_URL = 'https://shepmo.com/calculator';
const BUILD_DATE = '2026-04-23';

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Fix and Flip Deal Analyzer',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description:
    'Real-time calculator for analyzing fix-and-flip real estate deals. Computes ROI, net profit, maximum allowable offer, and deal grade.',
  url: SITE_URL,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Purchase price and ARV analysis',
    '70% rule and Maximum Allowable Offer calculation',
    'Total ROI and annualized ROI',
    'Deal grade scoring (A through F)',
    'Waterfall, donut, and sensitivity visualizations',
    'Save and compare deals',
  ],
  dateModified: BUILD_DATE,
};

export const faqQuestions = [
  {
    q: 'What is a fix and flip calculator?',
    a: 'A fix and flip calculator is a financial analysis tool that estimates net profit, return on investment, and deal viability for real estate rehab projects. You enter the purchase price, After Repair Value (ARV), rehab costs, financing terms, and holding period. The calculator computes total project cost, profit margin, and deal grade in real time.',
  },
  {
    q: 'What is the 70% rule in real estate?',
    a: 'The 70% rule states that a real estate investor should pay no more than 70% of the After Repair Value (ARV) minus estimated rehab costs. For example, if a property has an ARV of $300,000 and needs $40,000 in repairs, the maximum offer is $170,000. This leaves room for financing, holding costs, and profit.',
  },
  {
    q: 'How do you calculate ROI on a house flip?',
    a: 'Total ROI on a house flip equals net profit divided by total cash invested, expressed as a percentage. If you invest $80,000 of your own cash and net $24,000 in profit, your total ROI is 30%. Annualized ROI adjusts this for hold period: a 30% return in 6 months annualizes to approximately 69%.',
  },
  {
    q: 'What are typical holding costs for a fix and flip?',
    a: 'Typical monthly holding costs for a fix and flip include property taxes ($200–$800/month depending on market), hazard insurance ($150–$300/month), utilities ($150–$350/month), and HOA dues if applicable. On a $400,000 property, expect $800–$1,500 per month in holding costs before financing charges.',
  },
  {
    q: 'How much contingency should I budget for rehab?',
    a: 'Budget 10–20% contingency on top of your base rehab estimate. A 10% contingency is standard for cosmetic renovations with known scope. Use 15–20% for older properties, structural work, or projects where you have not yet opened walls. Experienced flippers rarely go below 10%.',
  },
  {
    q: 'What is a good profit margin on a fix and flip?',
    a: 'A good profit margin on a fix and flip is 15–20% of the After Repair Value (ARV). Below 10% is risky because cost overruns or market shifts can erase your profit. Deals with margins above 20% are considered strong. This calculator grades deals with 20%+ margins and 40%+ annualized ROI as A-grade.',
  },
  {
    q: 'What is Maximum Allowable Offer (MAO)?',
    a: 'Maximum Allowable Offer (MAO) is the highest price a flipper should pay for a property while maintaining target profit margins. Using the 70% rule, MAO equals ARV multiplied by 0.70 minus total rehab costs. Some investors use 75% in competitive markets, but 70% provides a safer margin for error.',
  },
  {
    q: 'How do hard money loans work for fix and flips?',
    a: 'Hard money loans are short-term, asset-based loans used to finance fix and flip projects. Lenders typically fund 75–90% of the purchase price (LTC) up to 65–75% of ARV. Interest rates range from 10–13% annually with 1–3 origination points. Terms are usually 6–18 months with interest-only payments.',
  },
  {
    q: 'What is the difference between LTV and LTC?',
    a: 'LTV (Loan-to-Value) measures the loan amount against the property value — for flips, this typically means ARV. LTC (Loan-to-Cost) measures the loan against the purchase price or total project cost. A lender offering 85% LTC and 70% LTV ARV cap will fund the lesser of those two calculations.',
  },
  {
    q: 'How long does a typical fix and flip take?',
    a: 'A typical fix and flip takes 4–9 months from purchase to sale. Light cosmetic flips can close in 3–4 months. Moderate rehabs average 5–7 months. Heavy structural renovations with permitting can extend to 9–12 months. Longer hold periods increase financing and holding costs, reducing annualized ROI.',
  },
  {
    q: 'What selling costs should I expect when flipping?',
    a: 'Selling costs on a flip typically total 7–9% of the sale price. This includes agent commission (5–6%), seller closing costs (1–2%), transfer taxes (0–2% depending on state), and staging ($1,500–$3,000). On a $400,000 sale, expect $28,000–$36,000 in total selling costs.',
  },
  {
    q: 'How is annualized ROI different from total ROI?',
    a: 'Total ROI measures your return on a single deal regardless of time. Annualized ROI normalizes that return to a 12-month period for comparison. A 20% total ROI in 4 months annualizes to approximately 73%, while 20% over 12 months stays at 20%. Annualized ROI reveals how efficiently your capital is working.',
  },
  {
    q: 'What is After Repair Value (ARV)?',
    a: 'After Repair Value (ARV) is the estimated market value of a property after all renovations are complete. ARV is determined by analyzing comparable sold properties within a half-mile radius, sold within 90 days, with similar size and condition. ARV is the most critical number in any flip analysis.',
  },
  {
    q: 'Should I use the 70% rule or 75% rule?',
    a: 'The 70% rule is the conservative standard and recommended for new investors. The 75% rule works in highly competitive markets where deal flow is limited, but it leaves less margin for error. In markets with rising prices and fast absorption, 75% may be acceptable. In declining or uncertain markets, stick to 70% or lower.',
  },
];

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqQuestions.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Analyze a Fix and Flip Deal',
  description: 'Step-by-step guide to evaluating whether a fix and flip deal is profitable.',
  step: [
    { '@type': 'HowToStep', name: 'Estimate After Repair Value (ARV)', text: 'Research comparable sold properties within 0.5 miles, sold within 90 days, similar size and condition. Average the top 3-5 comps.', position: 1 },
    { '@type': 'HowToStep', name: 'Scope the rehab and add contingency', text: 'Walk the property with a contractor, list every repair line item, sum them, and add 10-20% contingency.', position: 2 },
    { '@type': 'HowToStep', name: 'Apply the 70% rule for maximum offer', text: 'Multiply ARV by 0.70 and subtract rehab. This is your Maximum Allowable Offer (MAO).', position: 3 },
    { '@type': 'HowToStep', name: 'Model financing costs', text: 'Enter loan terms, points, and hold period to see total financing cost.', position: 4 },
    { '@type': 'HowToStep', name: 'Add holding and selling costs', text: 'Include taxes, insurance, utilities, HOA, agent commission, closing costs, and staging.', position: 5 },
    { '@type': 'HowToStep', name: 'Review deal grade and profit margin', text: 'A-grade deals have annualized ROI above 40% and profit margins above 20%. Below C-grade, reconsider.', position: 6 },
  ],
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://shepmo.com/' },
    { '@type': 'ListItem', position: 2, name: 'The Ultimate Fix and Flip Calculator', item: SITE_URL },
  ],
};

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Fix and Flip Analyzer',
  url: 'https://shepmo.com/',
};

export const glossaryTerms = [
  { term: 'After Repair Value (ARV)', definition: 'The estimated market value of a property after all renovations are complete. Determined by analyzing recent comparable sales in the area.' },
  { term: 'Maximum Allowable Offer (MAO)', definition: 'The highest price a flipper should pay for a property to maintain target profit margins. Calculated as ARV × 0.70 minus total rehab costs using the 70% rule.' },
  { term: 'Loan-to-Cost (LTC)', definition: 'The ratio of the loan amount to the purchase price or total project cost. A lender offering 85% LTC will fund 85% of the purchase price.' },
  { term: 'Loan-to-Value (LTV)', definition: 'The ratio of the loan amount to the property value. For flips, this typically refers to ARV. Most hard money lenders cap LTV at 65–75% of ARV.' },
  { term: 'Hard Money Loan', definition: 'A short-term, asset-based loan used to finance real estate investments. Rates typically range from 10–13% annually with 1–3 origination points and terms of 6–18 months.' },
  { term: 'Origination Points', definition: 'Upfront fees charged by a lender at closing, expressed as a percentage of the loan amount. One point equals 1% of the loan. Typical hard money loans charge 1.5–3 points.' },
  { term: 'Contingency Budget', definition: 'An additional percentage (typically 10–20%) added on top of the base rehab estimate to cover unexpected costs, material price increases, or hidden damage.' },
  { term: 'Hold Period', definition: 'The total time from property purchase to final sale. Includes rehab time plus listing and closing time. Longer hold periods increase carrying costs and reduce annualized returns.' },
  { term: 'Holding Costs', definition: 'Recurring monthly expenses incurred while owning a property before sale. Includes property taxes, insurance, utilities, HOA dues, and loan interest payments.' },
  { term: 'Closing Costs', definition: 'Fees and expenses paid at the close of a real estate transaction. Buyer closing costs are typically 1.5–3% of purchase price. Seller closing costs are 1–2% of sale price.' },
  { term: 'Transfer Tax', definition: 'A tax imposed by state or local governments when real estate changes ownership. Varies significantly by jurisdiction — from 0% in some states to over 2% in others.' },
  { term: 'Net Profit', definition: 'The total money earned from a flip after subtracting all costs: purchase price, closing costs, rehab, financing, holding costs, and selling costs from the sale price.' },
  { term: 'Total ROI', definition: 'Net profit divided by total cash invested in the deal, expressed as a percentage. Does not account for the time period of the investment.' },
  { term: 'Annualized ROI', definition: 'Total ROI normalized to a 12-month period using compound growth. Calculated as ((1 + Total ROI) ^ (12 / hold months)) − 1. Allows comparison across deals with different hold periods.' },
  { term: 'Profit Margin', definition: 'Net profit expressed as a percentage of the sale price (ARV). A margin of 15–20% is considered healthy for fix and flip projects.' },
  { term: 'Break-Even Sale Price', definition: 'The minimum sale price required to recover all invested capital with zero profit. Any sale above this price generates profit; below it, you lose money.' },
  { term: 'Deal Grade', definition: 'A letter grade (A through F) assigned to a deal based on annualized ROI and profit margin thresholds. A-grade deals have 40%+ annualized ROI and 20%+ profit margin.' },
  { term: 'Comparable Sales (Comps)', definition: 'Recently sold properties similar in size, condition, and location used to estimate a property\'s market value. Best comps are within 0.5 miles, sold within 90 days.' },
];
