import Image from "next/image";
import {
  Phone,
  Mail,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle,
  Zap,
  Shield,
  HardHat,
  Landmark,
  PiggyBank,
  BarChart3,
  MessageSquareQuote,
  Briefcase,
} from "lucide-react";
import LoanRequestForm from "@/components/LoanRequestForm";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════════════════════════════════════
          Navigation
         ═══════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Shepherd Mortgage"
              width={280}
              height={84}
              className="h-14 w-auto"
              priority
            />
          </a>
          <div className="hidden sm:flex items-center gap-6">
            <a
              href="#about"
              className="text-sm font-medium text-text-secondary hover:text-navy transition-colors"
            >
              About
            </a>
            <a
              href="#specialties"
              className="text-sm font-medium text-text-secondary hover:text-navy transition-colors"
            >
              Specialties
            </a>
            <a
              href="#request"
              className="text-sm font-medium bg-navy text-white px-5 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
            >
              Request a Loan
            </a>
          </div>
          {/* Mobile CTA */}
          <a
            href="#request"
            className="sm:hidden text-sm font-medium bg-navy text-white px-4 py-2 rounded-lg"
          >
            Request a Loan
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          Hero
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-charcoal">
        {/* Subtle decorative orb */}
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
              <MapPin className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Nationwide Investment Property Lending
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Close your next deal with a lender who moves as fast as you&nbsp;do.
            </h1>

            <p className="text-lg sm:text-xl text-white/50 leading-relaxed mb-10 max-w-2xl">
              Bridge, fix and flip, ground-up construction, and long-term rental
              financing — structured around your timeline, your exit, and your
              business plan. Direct access. Real answers. Fewer surprises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#request"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg shadow-black/20 text-lg"
              >
                Request a Loan
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+14088218245"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-lg"
              >
                <Phone className="w-5 h-5" />
                Call 408.821.8245
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Stats Bar
         ═══════════════════════════════════════ */}
      <section className="bg-surface-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "$50M+", label: "Funded", icon: TrendingUp },
              { value: "100+", label: "Deals Closed", icon: CheckCircle },
              { value: "7–14 Days", label: "Typical Close", icon: Clock },
              { value: "CA-Focused", label: "Local Expertise", icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <stat.icon className="w-5 h-5 text-navy/40 mb-1" />
                <p className="text-2xl sm:text-3xl font-bold text-navy">
                  {stat.value}
                </p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          What I Finance (quick list)
         ═══════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-3">
              What I Finance
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "Private and bridge loans",
              "Fix and flip projects",
              "Ground-up construction",
              "30-year investor financing",
              "DSCR rental loans",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-surface-secondary border border-border rounded-full px-5 py-2.5"
              >
                <CheckCircle className="w-4 h-4 text-accent-green shrink-0" />
                <span className="text-sm font-medium text-text-primary">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          About
         ═══════════════════════════════════════ */}
      <section id="about" className="py-24 bg-surface-secondary scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
              Built for investors, by someone who thinks like one.
            </h2>
            <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
              <p>
                I work with real estate investors, developers, and brokers who
                need responsive financing and a lender who understands how to
                structure deals efficiently.
              </p>
              <p>
                My career has been built entirely around investment property
                lending — bridge, renovation, construction, and long-term debt.
                I&apos;ve closed deals across market cycles, which means I know
                what&apos;s actually financeable and what&apos;s going to fall
                apart at underwriting.
              </p>
              <p>
                What clients get: a direct line, honest feedback on the deal, and
                a loan structure matched to the exit — not a one-size term sheet.
                When I say I can close, I close.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Why Borrowers Call Me Back
         ═══════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-10">
              Why Borrowers Call Me Back
            </h2>
            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  text: "Direct access — no intake reps, no layers",
                },
                {
                  icon: MessageSquareQuote,
                  text: "Honest feedback before you waste time",
                },
                {
                  icon: TrendingUp,
                  text: "Loan structure matched to your exit",
                },
                {
                  icon: MapPin,
                  text: "California market knowledge, deal by deal",
                },
                {
                  icon: Shield,
                  text: "Clean execution from term sheet to funding",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface-secondary border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-navy" />
                  </div>
                  <p className="text-text-primary font-medium text-lg pt-1.5">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Lending Specialties
         ═══════════════════════════════════════ */}
      <section
        id="specialties"
        className="py-24 bg-surface-secondary scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Lending Specialties
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Focused products with the flexibility to match your asset,
              timeline, and exit strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Private & Bridge",
                best: "speed-sensitive buys",
                desc: "Flexible short-term capital when conventional timelines won't work. Asset-based, deal-specific structuring.",
              },
              {
                icon: Briefcase,
                title: "Fix & Flip",
                best: "value-add projects",
                desc: "Acquisition plus rehab in one loan, sized to your scope of work and comps-supported exit.",
              },
              {
                icon: HardHat,
                title: "Construction",
                best: "experienced builders",
                desc: "Ground-up and heavy rehab financing with draw schedules that match how you actually build.",
              },
              {
                icon: Landmark,
                title: "30-Year Investor",
                best: "long-term holds",
                desc: "Permanent debt for the hold strategy — built for cash flow, stability, and portfolio scaling.",
              },
              {
                icon: PiggyBank,
                title: "DSCR Rental",
                best: "cash-flowing rentals",
                desc: "Qualify on the property's performance, not your tax returns. Built for serious rental operators.",
              },
              {
                icon: BarChart3,
                title: "Portfolio Guidance",
                best: "active investors",
                desc: "A lender who thinks with you across multiple deals, refinances, and the next acquisition.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 border border-border hover:border-navy/20 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-5 group-hover:bg-navy/10 transition-colors">
                  <card.icon className="w-6 h-6 text-navy" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-accent-green font-medium mb-3">
                  Best for · {card.best}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Google Reviews
         ═══════════════════════════════════════ */}
      <section className="py-24 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              What Clients Are Saying
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Real reviews from real estate investors and developers.
            </p>
          </div>

          <GoogleReviews />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Request a Loan (Multi-Step Form)
         ═══════════════════════════════════════ */}
      <section
        id="request"
        className="py-24 bg-gradient-to-b from-surface-secondary to-white scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Got a deal? Let&apos;s look at it.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Send the scenario. I&apos;ll review it personally and get back to
              you with honest feedback — whether it&apos;s a fit or not.
            </p>
          </div>

          {/* Direct contact */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a
              href="tel:+14088218245"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-navy transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">408.821.8245</span>
            </a>
            <a
              href="mailto:dan@shepmo.com"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-navy transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium">dan@shepmo.com</span>
            </a>
          </div>

          {/* Multi-step form */}
          <LoanRequestForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
