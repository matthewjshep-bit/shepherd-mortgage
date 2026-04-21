import { Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import { FileText, Shield } from "lucide-react";
import ApplicationForm from "@/components/application/ApplicationForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Apply for a Loan | Shepherd Mortgage",
  description: "Submit your fix-and-flip loan application in minutes. Upload documents and get a response within 24 hours.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Shepherd Mortgage" width={280} height={84} className="h-16 w-auto" priority />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/calculator" className="text-sm font-medium text-text-secondary hover:text-navy transition-colors">Calculator</Link>
            <Link href="/" className="text-sm font-medium text-text-secondary hover:text-navy transition-colors">Home</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-8 h-8 text-accent-green" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Loan Application</h1>
          </div>
          <p className="text-white/60 text-lg max-w-2xl">
            Complete the form below to submit your fix-and-flip loan request. The whole process takes about 10 minutes.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Shield className="w-4 h-4 text-accent-green" />
            <span className="text-sm text-white/40">256-bit encryption. Your data is always secure.</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <Suspense fallback={<div className="text-center py-20 text-text-tertiary">Loading form...</div>}>
          <ApplicationForm />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
