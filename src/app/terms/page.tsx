import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Shepherd Mortgage",
  description:
    "Terms of Service for Shepherd Mortgage. Read our terms and conditions governing the use of our website and lending services.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Last updated: April 30, 2026
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

            {/* §2 — rewritten for B2B / business-purpose positioning */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                2. Description of Services
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Shepherd Mortgage is a commercial real estate financing advisory
                that arranges business-purpose investment property loans for
                real estate investors and developers, including bridge loans,
                fix-and-flip financing, ground-up construction, DSCR rental
                loans, and 30-year investor financing. Our services are limited
                to business-purpose lending; we do not originate
                consumer-purpose or owner-occupied residential mortgages. The
                Site includes informational content, a deal calculator, and an
                online inquiry form for prospective clients. All tools,
                estimates, and informational content on this Site are for
                informational purposes only and do not constitute a commitment
                to lend, a loan approval, or a binding offer of any kind.
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

            {/* §5 — NEW SMS section — required for A2P compliance */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                5. SMS / Text Messaging Program
              </h2>
              <div className="text-text-secondary leading-relaxed space-y-4">
                <p>
                  <strong className="text-text-primary">
                    Program Description.
                  </strong>{" "}
                  Shepherd Mortgage operates an SMS text messaging program for
                  the purpose of sending transactional and customer-service
                  messages to clients and prospects who have submitted a loan
                  inquiry through our website and explicitly opted in via a
                  consent checkbox.
                </p>
                <p>
                  <strong className="text-text-primary">Message Types.</strong>{" "}
                  Messages may include: confirmation of inquiry receipt,
                  appointment confirmations and reminders, document requests,
                  deal status and closing coordination updates, and replies to
                  client-initiated questions. We do not send promotional,
                  marketing, or rate-related messages via SMS.
                </p>
                <p>
                  <strong className="text-text-primary">
                    How to Opt Out.
                  </strong>{" "}
                  You may opt out of the SMS program at any time by replying{" "}
                  <strong>STOP</strong> to any message you receive. After opting
                  out, you will receive one confirmation message and no further
                  messages will be sent. To rejoin, reply <strong>START</strong>{" "}
                  or submit a new inquiry through our website.
                </p>
                <p>
                  <strong className="text-text-primary">
                    How to Get Help.
                  </strong>{" "}
                  Reply <strong>HELP</strong> to any message for assistance, or
                  contact our support team directly:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    Email:{" "}
                    <a
                      href="mailto:dan@shepmo.com"
                      className="text-navy font-medium hover:underline"
                    >
                      dan@shepmo.com
                    </a>
                  </li>
                  <li>Phone: 408.821.8245</li>
                  <li>Hours: Monday – Friday, 8:00 AM – 6:00 PM PT</li>
                </ul>
                <p>
                  <strong className="text-text-primary">Costs.</strong> Message
                  and data rates may apply based on your mobile carrier plan.
                  Message frequency varies based on the status of your inquiry.
                  Carriers are not liable for delayed or undelivered messages.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                6. User Conduct
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
                7. Intellectual Property
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
                8. Disclaimer of Warranties
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
                9. Limitation of Liability
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
                10. Governing Law
              </h2>
              <p className="text-text-secondary leading-relaxed">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of California, without regard to its
                conflict of law provisions. Any legal action or proceeding
                arising under these Terms shall be brought exclusively in the
                courts located in Santa Clara County, California.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                11. Contact Information
              </h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at:{" "}
                <a
                  href="mailto:dan@shepmo.com"
                  className="text-navy font-medium hover:underline"
                >
                  dan@shepmo.com
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
