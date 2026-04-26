import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Shield,
  Target,
  Handshake,
  Users,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | Shepherd Mortgage — Investment Property Mortgage Brokerage",
  description:
    "Shepherd Mortgage is an investment property mortgage brokerage led by Daniel Shepherd — 15+ years of experience, $500M+ closed, and a direct-access approach to bridge, fix-and-flip, and rental financing.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-charcoal py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            About Shepherd Mortgage
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            An investment property mortgage brokerage built on 15+ years of
            market experience and $500M+ in closed transactions.
          </p>
        </div>
      </section>

      <main className="flex-1">
        {/* Mission & Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Shepherd Mortgage is an investment property mortgage brokerage
                built for real estate investors who need responsive, transparent
                financing. We connect investors with the right loan products —
                structured to their timeline and exit strategy — so they can
                focus on building their portfolio, not chasing approvals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Direct Access",
                  desc: "No intake reps, no call centers. You work directly with the decision-maker from first call to wire.",
                },
                {
                  icon: Shield,
                  title: "Honest Feedback",
                  desc: "We tell you if a deal works — and if it doesn't — before you waste a week. Straight answers save everyone time.",
                },
                {
                  icon: Handshake,
                  title: "Execution You Can Count On",
                  desc: "When we issue a term sheet, we close. Clean execution from commitment to funding, every time.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-surface-secondary rounded-2xl p-8 border border-border text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-navy" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principal Bio */}
        <section className="py-20 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                {/* Bio Text */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 bg-navy/5 rounded-full px-4 py-1.5 mb-4">
                    <Users className="w-3.5 h-3.5 text-navy/60" />
                    <span className="text-sm font-medium text-navy/70">
                      Meet the Principal
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
                    Daniel Shepherd
                  </h2>
                  <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
                    <p>
                      Daniel Shepherd has spent his entire career in investment
                      property lending — over 15 years across multiple market
                      cycles. He has personally closed more than $500 million in
                      transactions, ranging from single-family fix-and-flip
                      projects to multi-million-dollar ground-up construction
                      deals.
                    </p>
                    <p>
                      Before founding Shepherd Mortgage, Daniel worked at
                      several of the nation&apos;s leading private lending firms,
                      where he developed deep expertise in bridge lending, DSCR
                      programs, and construction financing. That experience gave
                      him a clear view of what borrowers need — and what most
                      brokers and lenders get wrong.
                    </p>
                    <p>
                      Today, Daniel works directly with every borrower. There
                      are no intake reps, no hand-offs, and no surprises. His
                      approach is simple: honest feedback, deal-specific
                      structure, and clean execution from term sheet to wire.
                    </p>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[
                      { value: "$500M+", label: "Closed", icon: TrendingUp },
                      { value: "500+", label: "Deals", icon: CheckCircle },
                      { value: "15+ Yrs", label: "Experience", icon: Clock },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white rounded-xl p-4 border border-border text-center"
                      >
                        <stat.icon className="w-5 h-5 text-navy/40 mx-auto mb-2" />
                        <p className="text-xl font-bold text-navy">
                          {stat.value}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="lg:col-span-2 order-1 lg:order-2">
                  <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
                    {/* TODO: Replace with real professional headshot */}
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl font-bold text-white">DS</span>
                    </div>
                    <h3 className="text-xl font-semibold text-navy text-center mb-1">
                      Daniel Shepherd
                    </h3>
                    <p className="text-sm text-text-tertiary text-center mb-6">
                      Principal & Founder
                    </p>

                    <div className="space-y-3">
                      <a
                        href="tel:+14088218245"
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary hover:bg-surface-tertiary transition-colors"
                      >
                        <Phone className="w-4 h-4 text-navy/40" />
                        <span className="text-sm text-text-secondary">
                          408.821.8245
                        </span>
                      </a>
                      <a
                        href="mailto:dan@shepmo.com"
                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary hover:bg-surface-tertiary transition-colors"
                      >
                        <Mail className="w-4 h-4 text-navy/40" />
                        <span className="text-sm text-text-secondary">
                          dan@shepmo.com
                        </span>
                      </a>
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary">
                        <MapPin className="w-4 h-4 text-navy/40 mt-0.5" />
                        <span className="text-sm text-text-secondary">
                          20491 Forrest Hills Dr.
                          <br />
                          Saratoga, CA 95070
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">
              Ready to talk about your next deal?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Whether you&apos;re looking for a quick bridge, a fix-and-flip
              line, or permanent rental financing — let&apos;s discuss it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#request"
                className="inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-light transition-all text-lg"
              >
                Request a Loan
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-surface-secondary text-navy font-semibold px-8 py-4 rounded-xl border border-border hover:bg-surface-tertiary transition-all text-lg"
              >
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
