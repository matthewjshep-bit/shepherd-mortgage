import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Briefcase,
  HardHat,
  Landmark,
  PiggyBank,
  BarChart3,
  ClipboardCheck,
  Search,
  FileText,
  BadgeDollarSign,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Investment Property Lending Services | Shepherd Mortgage Brokerage",
  description:
    "Shepherd Mortgage is an investment property mortgage brokerage offering bridge loans, fix-and-flip financing, ground-up construction, 30-year investor loans, and DSCR rental programs.",
};

const services = [
  {
    icon: Zap,
    title: "Private & Bridge Loans",
    best: "Speed-sensitive acquisitions",
    desc: "When conventional timelines don't work, bridge financing gets you to the closing table. Asset-based, deal-specific capital designed for investors who need to move fast.",
    features: ["Close in 7–14 days", "Asset-based underwriting", "6–24 month terms", "Interest-only available"],
  },
  {
    icon: Briefcase,
    title: "Fix & Flip Financing",
    best: "Value-add investment projects",
    desc: "Acquisition plus rehab in one loan, sized to your scope and comp-supported exit. Draws structured to match your project timeline.",
    features: ["Up to 90% of purchase price", "100% rehab costs available", "Aligned draw schedules", "6–18 month terms"],
  },
  {
    icon: HardHat,
    title: "Ground-Up Construction",
    best: "Experienced builders and developers",
    desc: "Full construction financing for ground-up residential and small commercial projects with draw schedules that match how you actually build.",
    features: ["Competitive rates", "Flexible draw schedules", "Spec and pre-sold projects", "Up to 24 months"],
  },
  {
    icon: Landmark,
    title: "30-Year Investor Loans",
    best: "Long-term buy-and-hold strategies",
    desc: "Permanent debt for the long hold. Lock in a 30-year fixed rate and build your portfolio with stability and predictable payments.",
    features: ["30-year fixed options", "Cash-out refi available", "No personal income verification", "SFR through small multifamily"],
  },
  {
    icon: PiggyBank,
    title: "DSCR Rental Loans",
    best: "Cash-flowing rental properties",
    desc: "Qualify based on the property's rental income — not your personal tax returns. Built for serious rental operators who want to scale.",
    features: ["Qualify on property cash flow", "No tax returns or W-2s", "Fixed and adjustable rates", "Available for LLCs"],
  },
  {
    icon: BarChart3,
    title: "Portfolio Guidance",
    best: "Active investors with multiple deals",
    desc: "A financing partner who thinks with you across your entire portfolio — refinancing, acquiring, or planning your next move.",
    features: ["Multi-deal strategy", "Refi timing guidance", "Cross-collateral structuring", "Ongoing portfolio review"],
  },
];

const processSteps = [
  { icon: ClipboardCheck, step: "1", title: "Submit Your Scenario", desc: "Fill out a quick loan request with your property type, loan purpose, and deal details." },
  { icon: Search, step: "2", title: "Deal Review", desc: "Daniel personally reviews your scenario and provides honest feedback — typically within 24 hours." },
  { icon: FileText, step: "3", title: "Term Sheet", desc: "If the deal works, you receive a clear term sheet with rates, fees, and timeline. No surprises." },
  { icon: BadgeDollarSign, step: "4", title: "Close & Fund", desc: "We move through underwriting fast and close on your timeline. Bridge deals can close in 7–14 days." },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="bg-gradient-to-br from-navy via-navy-light to-charcoal py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">Lending Services</h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">Focused financing products for real estate investors — structured to your asset, your exit, and your timeline.</p>
        </div>
      </section>

      <main className="flex-1">
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">Why Investors Choose Shepherd Mortgage</h2>
            <p className="text-lg text-text-secondary leading-relaxed">As an investment property mortgage brokerage, we provide direct access to the decision-maker, deal-specific structuring, and execution you can count on. Unlike traditional banks and retail brokers, every loan is personally reviewed by Daniel Shepherd — 15+ years in the market, $500M+ closed.</p>
          </div>
        </section>

        <section className="py-20 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Our Lending Products</h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">Each product is designed for a specific investment strategy. Not sure which fits? Request a loan and we&apos;ll guide you.</p>
            </div>
            <div className="space-y-8">
              {services.map((svc) => (
                <div key={svc.title} className="bg-white rounded-2xl p-8 lg:p-10 border border-border hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                          <svc.icon className="w-6 h-6 text-navy" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-navy">{svc.title}</h3>
                          <p className="text-sm text-accent-green font-medium">Best for · {svc.best}</p>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed">{svc.desc}</p>
                    </div>
                    <div className="lg:border-l lg:border-border lg:pl-8">
                      <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">Key Features</p>
                      <ul className="space-y-2.5">
                        {svc.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-green mt-1.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">How It Works</h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">From inquiry to funding — a straightforward process with no surprises.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((s) => (
                <div key={s.title} className="bg-surface-secondary rounded-2xl p-8 border border-border text-center">
                  <div className="w-10 h-10 rounded-full bg-navy text-white text-lg font-bold flex items-center justify-center mx-auto mb-5">{s.step}</div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-navy to-navy-light">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Got a deal? Let&apos;s look at it.</h2>
            <p className="text-lg text-white/50 mb-8">Send the scenario. Daniel will review it personally and get back with honest feedback.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#request" className="inline-flex items-center gap-2 bg-white text-navy font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all text-lg shadow-lg shadow-black/20">
                Request a Loan <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
