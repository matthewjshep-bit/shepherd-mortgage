import Link from "next/link";
import {
  Phone,
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
import Navbar from "@/components/Navbar";
import LoanRequestForm from "@/components/LoanRequestForm";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════════════════════════════════════
          Navigation
         ═══════════════════════════════════════ */}
      <Navbar />

      {/* ═══════════════════════════════════════
          Hero
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-charcoal">
        {/* Subtle decorative orb */}
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
              <MapPin className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Investment Property Mortgage Brokerage
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              A mortgage broker who moves as fast as{' '}
              <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] bg-clip-text text-transparent">your deal.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/50 leading-relaxed mb-10 max-w-2xl mx-auto">
              Bridge, fix-and-flip, construction, and long-term rental
              financing — structured to your timeline and your exit.
            </p>

            <div className="flex flex-col items-center gap-3">
              <a
                href="#request"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg shadow-black/20 text-lg"
              >
                Request a Loan
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-white/40 text-sm">
                Prefer to talk first?{' '}
                <a href="tel:+14088218245" className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">408.821.8245</a>
              </p>
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
              { value: "$500M+", label: "Closed", icon: TrendingUp },
              { value: "500+", label: "Deals Done", icon: CheckCircle },
              { value: "7–14 Days", label: "Typical Close", icon: Clock },
              { value: "15+ Years", label: "In the Market", icon: MapPin },
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
              Built for investors. Run by someone who thinks like one.
            </h2>
            <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
              <p>
                I work with investors, developers, and brokers who need
                responsive financing — not generic term sheets. My entire career
                has been investment property lending, across multiple cycles. I
                know what&apos;s financeable and what falls apart at underwriting.
              </p>
              <p>
                Direct line. Honest feedback. Structure matched to your exit.
                When I say I can close, I close.
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#request"
                className="inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-light transition-all text-lg"
              >
                Request a Loan
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 text-navy font-semibold px-8 py-4 rounded-xl border border-border hover:bg-surface-tertiary transition-all text-lg"
              >
                Learn More About Us
              </Link>
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
                  text: "Direct line. No intake reps.",
                },
                {
                  icon: MessageSquareQuote,
                  text: "Honest feedback before you waste a week.",
                },
                {
                  icon: TrendingUp,
                  text: "Structure matched to your exit.",
                },
                {
                  icon: Shield,
                  text: "Clean execution from term sheet to wire.",
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
              Focused products, structured to your asset and exit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Private & Bridge",
                best: "speed-sensitive buys",
                desc: "Flexible short-term capital when conventional timelines don't work. Asset-based, deal-specific structure.",
              },
              {
                icon: Briefcase,
                title: "Fix & Flip",
                best: "value-add projects",
                desc: "Acquisition plus rehab in one loan, sized to your scope and comp-supported exit.",
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
                desc: "Permanent debt for the hold — cash flow, stability, portfolio scale.",
              },
              {
                icon: PiggyBank,
                title: "DSCR Rental",
                best: "cash-flowing rentals",
                desc: "Qualify on property performance, not tax returns. Built for serious rental operators.",
              },
              {
                icon: BarChart3,
                title: "Portfolio Guidance",
                best: "active investors",
                desc: "A lender who thinks with you across deals, refis, and the next acquisition.",
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a
              href="#request"
              className="inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-light transition-all text-lg"
            >
              Request a Loan
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 text-navy font-semibold px-8 py-4 rounded-xl border border-border hover:bg-surface-tertiary transition-all text-lg"
            >
              View All Services
            </Link>
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
              What Clients Say
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              15 reviews · 5.0 average ·{' '}
              <a
                href="https://www.google.com/search?q=Shepherd+Mortgage+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline"
              >
                Read them on Google →
              </a>
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
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
              Send the scenario. I&apos;ll review it personally and get back
              with honest feedback — fit or not.
            </p>
            <div className="flex flex-col items-center gap-2">
              <a
                href="#request"
                className="inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-light transition-all text-lg"
              >
                Request a Loan
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-text-tertiary">
                Prefer to talk first?{' '}
                <a href="tel:+14088218245" className="hover:text-navy transition-colors">408.821.8245</a>
                {' · '}
                <a href="mailto:dan@shepmo.com" className="hover:text-navy transition-colors">dan@shepmo.com</a>
              </p>
            </div>
          </div>

          {/* Multi-step form */}
          <LoanRequestForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
