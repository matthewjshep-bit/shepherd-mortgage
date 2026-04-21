import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Shepherd Mortgage",
  description:
    "Terms of Service for Shepherd Mortgage. Read our terms and conditions governing the use of our website and lending services.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Shepherd Mortgage"
              width={280}
              height={84}
              className="h-16 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/calculator"
              className="text-sm font-medium text-text-secondary hover:text-navy transition-colors"
            >
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

      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Last updated: April 21, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-text-secondary leading-relaxed">
                By accessing or using the Shepherd Mortgage website
                (&quot;Site&quot;), you agree to be bound by these Terms of
                Service (&quot;Terms&quot;). If you do not agree to all of these
                Terms, you may not use the Site. We reserve the right to update
                or modify these Terms at any time without prior notice. Your
                continued use of the Site following any changes constitutes
                acceptance of those changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                2. Description of Services
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Shepherd Mortgage provides information about hard money lending,
                fix-and-flip bridge loans, and related financial products. The
                Site includes a loan calculator for estimating deal economics and
                an online loan application portal. All tools and estimates
                provided on this Site are for informational purposes only and do
                not constitute a commitment to lend, a loan approval, or a
                binding offer of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                3. Eligibility
              </h2>
              <p className="text-text-secondary leading-relaxed">
                You must be at least 18 years of age and capable of forming a
                binding contract to use our services. By submitting a loan
                application, you represent that all information provided is
                accurate, complete, and current. Shepherd Mortgage reserves the
                right to verify any information submitted and to decline any
                application at its sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                4. Loan Terms and Conditions
              </h2>
              <p className="text-text-secondary leading-relaxed">
                All loan terms, including interest rates, origination fees, loan
                amounts, and repayment schedules, are subject to underwriting
                review and may differ from any estimates provided on this Site.
                Actual loan terms will be detailed in a formal loan agreement.
                Rates and terms displayed on this Site are subject to change
                without notice and are not guaranteed until a loan agreement is
                fully executed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                5. User Conduct
              </h2>
              <p className="text-text-secondary leading-relaxed">
                You agree not to: (a) use the Site for any unlawful purpose;
                (b) submit false, misleading, or fraudulent information; (c)
                interfere with or disrupt the Site or its servers; (d) attempt
                to gain unauthorized access to any portion of the Site; or (e)
                use the Site to transmit any harmful code, viruses, or malicious
                software.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                6. Intellectual Property
              </h2>
              <p className="text-text-secondary leading-relaxed">
                All content on this Site, including but not limited to text,
                graphics, logos, images, software, and design elements, is the
                property of Shepherd Mortgage or its licensors and is protected
                by copyright, trademark, and other intellectual property laws.
                You may not reproduce, distribute, modify, or create derivative
                works from any content on this Site without prior written
                consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                7. Disclaimer of Warranties
              </h2>
              <p className="text-text-secondary leading-relaxed">
                The Site and all information, content, and services provided are
                offered on an &quot;as is&quot; and &quot;as available&quot;
                basis without warranties of any kind, either express or implied.
                Shepherd Mortgage does not warrant that the Site will be
                uninterrupted, error-free, or free of viruses or other harmful
                components. We disclaim all warranties, including but not
                limited to, implied warranties of merchantability, fitness for a
                particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                8. Limitation of Liability
              </h2>
              <p className="text-text-secondary leading-relaxed">
                To the fullest extent permitted by law, Shepherd Mortgage and
                its officers, directors, employees, and agents shall not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages arising out of or related to your use of the
                Site or services, whether based on warranty, contract, tort, or
                any other legal theory, even if we have been advised of the
                possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                9. Governing Law
              </h2>
              <p className="text-text-secondary leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Texas, without regard to its
                conflict of law provisions. Any legal action or proceeding
                arising under these Terms shall be brought exclusively in the
                courts located in Dallas County, Texas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                10. Contact Information
              </h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at:{" "}
                <a
                  href="mailto:info@shepherdmortgage.com"
                  className="text-navy font-medium hover:underline"
                >
                  info@shepherdmortgage.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
