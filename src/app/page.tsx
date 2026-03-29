import Link from "next/link";
import Image from "next/image";
import { Shield, Clock, TrendingUp, Calculator, ArrowRight, CheckCircle } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Shepherd Mortgage" width={280} height={84} className="h-16 w-auto" priority />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/calculator" className="text-sm font-medium text-text-secondary hover:text-navy transition-colors">
              Calculator
            </Link>
            <Link
              href="/apply"
              className="text-sm font-medium bg-navy text-white px-5 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-white animate-gentle-pulse" />
                <span className="text-white/90 text-sm font-medium tracking-wide">Now Funding Nationwide</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Fix & Flip Loans,{" "}
                <span className="relative">
                  Built for Speed
                  <span className="absolute left-0 -bottom-1 w-full h-1 bg-white/30 rounded-full" />
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
                Close in days, not months. Our streamlined process gives real estate investors 
                the capital they need with transparent terms and no surprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center gap-2 bg-white text-navy font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg shadow-black/20 text-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Model Your Deal
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-lg"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right — Video */}
            <HeroVideo />
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-surface-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-5 h-5 text-navy" />
              <span className="text-sm font-medium text-text-secondary">Bank-Level Security & Encryption</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-5 h-5 text-navy" />
              <span className="text-sm font-medium text-text-secondary">No Credit Check to Apply</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5 text-navy" />
              <span className="text-sm font-medium text-text-secondary">Close in as Fast as 7 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">How It Works</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              From initial quote to funded deal — our process is built for speed and transparency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Calculator,
                title: "Model Your Deal",
                description: "Use our interactive calculator to run your numbers and see your estimated terms instantly.",
              },
              {
                step: "02",
                icon: TrendingUp,
                title: "Submit Your Application",
                description: "Fill out a simple application and upload your documents. Takes about 10 minutes.",
              },
              {
                step: "03",
                icon: CheckCircle,
                title: "Get Funded",
                description: "We review your deal, issue a term sheet, and fund — often within a week.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-surface-secondary rounded-2xl p-8 border border-border hover:border-navy/20 hover:shadow-lg transition-all group"
              >
                <span className="text-5xl font-bold text-navy/5 group-hover:text-navy/10 transition-colors absolute top-4 right-6 font-heading">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center mb-5 group-hover:bg-navy/10 transition-colors">
                  <item.icon className="w-6 h-6 text-navy" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Parameters */}
      <section className="py-24 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Loan Programs</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Competitive terms designed for experienced and first-time fix-and-flip investors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Loan Amounts", value: "$75K – $2M+" },
              { label: "Rates From", value: "8.50%" },
              { label: "Terms", value: "6 – 24 Months" },
              { label: "Close In", value: "7 – 14 Days" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-6 border border-border text-center"
              >
                <p className="text-sm font-medium text-text-secondary mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-navy">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Fund Your Next Deal?
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-2xl mx-auto">
            Run the numbers with our calculator, or jump straight into an application. 
            Either way, you&#39;ll get a response within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all text-lg"
            >
              <Calculator className="w-5 h-5" />
              Open Calculator
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-lg"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Shepherd Mortgage" width={120} height={36} className="h-8 w-auto brightness-0 invert" />
            </div>
            <div className="flex items-center gap-8">
              <Link href="/calculator" className="text-sm text-white/40 hover:text-white/70 transition-colors">Calculator</Link>
              <Link href="/apply" className="text-sm text-white/40 hover:text-white/70 transition-colors">Apply</Link>
            </div>
            <p className="text-sm text-white/25">&copy; {new Date().getFullYear()} Shepherd Mortgage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
