import Link from "next/link";
import Image from "next/image";
import { Calculator, Shield } from "lucide-react";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Fix & Flip Loan Calculator | Shepherd Mortgage",
  description: "Model your fix-and-flip deal economics in real time. See estimated rates, monthly payments, profit projections, and apply instantly.",
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Shepherd Mortgage" width={280} height={84} className="h-16 w-auto" priority />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-text-secondary hover:text-navy transition-colors">Home</Link>
            <Link href="/apply" className="text-sm font-medium bg-navy text-white px-5 py-2.5 rounded-lg hover:bg-navy-light transition-colors">
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Calculator className="w-8 h-8 text-accent-green" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Fix & Flip Calculator</h1>
          </div>
          <p className="text-white/50 text-lg max-w-2xl">
            Model your deal economics in real time. Adjust any input and see how it impacts your rate, costs, and projected profit.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Shield className="w-4 h-4 text-accent-green" />
            <span className="text-sm text-white/35">No account required. Your data stays in your browser.</span>
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <CalculatorForm />
      </div>

      <Footer />
    </div>
  );
}
