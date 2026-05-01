import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Shepherd Mortgage",
  description:
    "Privacy Policy for Shepherd Mortgage. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Privacy Policy
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
                1. Introduction
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Shepherd Mortgage (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your personal information when you visit our website
                or use our services. By using our Site, you consent to the
                practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                2. Information We Collect
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                We may collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-2">
                <li>
                  <strong className="text-text-primary">
                    Personal Information:
                  </strong>{" "}
                  Name, email address, phone number, mailing address, and other
                  information you provide when submitting a loan application.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Financial Information:
                  </strong>{" "}
                  Property details, purchase price, loan amount requested, rehab
                  budgets, and other deal-related financial data submitted
                  through our calculator or application forms.
                </li>
                <li>
                  <strong className="text-text-primary">Documents:</strong>{" "}
                  Purchase contracts, scopes of work, proof of funds, entity
                  documents, photo identification, and any other documents you
                  upload as part of your application.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Usage Information:
                  </strong>{" "}
                  IP address, browser type, operating system, referring URLs,
                  and browsing behavior on our Site, collected automatically
                  through cookies and similar technologies.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                3. How We Use Your Information
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-2">
                <li>Process and evaluate your loan application</li>
                <li>Communicate with you regarding your application status</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>
                  Improve our website, services, and user experience
                </li>
                <li>
                  Comply with legal obligations and regulatory requirements
                </li>
                <li>
                  Detect and prevent fraud or other unauthorized activities
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                We do not sell, rent, or trade your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-2">
                <li>
                  <strong className="text-text-primary">
                    Service Providers:
                  </strong>{" "}
                  With trusted third-party service providers who assist us in
                  operating our business (e.g., hosting, analytics, document
                  processing), subject to confidentiality agreements.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Legal Compliance:
                  </strong>{" "}
                  When required by law, regulation, legal process, or
                  governmental request.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Business Transfers:
                  </strong>{" "}
                  In connection with any merger, acquisition, or sale of assets,
                  your information may be transferred as a business asset.
                </li>
                <li>
                  <strong className="text-text-primary">
                    With Your Consent:
                  </strong>{" "}
                  We may share your information for purposes not described here
                  only with your express consent.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                5. Data Security
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information, including 256-bit encryption for data in
                transit, secure document storage, and access controls. However,
                no method of electronic storage or transmission is 100% secure,
                and we cannot guarantee absolute security. You are responsible
                for maintaining the confidentiality of any account credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We may use cookies, web beacons, and similar technologies to
                collect information about your browsing activity. These
                technologies help us analyze website traffic, personalize
                content, and improve our services. You may disable cookies
                through your browser settings, but some features of the Site may
                not function properly as a result.
              </p>
            </section>

            {/* §7 — NEW SMS section — required for A2P compliance */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                7. SMS / Text Messaging Program
              </h2>
              <div className="text-text-secondary leading-relaxed space-y-4">
                <p>
                  <strong className="text-text-primary">Opt-In.</strong> We
                  send SMS text messages only to individuals who have explicitly
                  opted in by checking the SMS consent checkbox on a form on our
                  website (e.g., the contact form at /contact) and providing
                  their mobile phone number. Opt-in is never assumed and is not
                  a condition of any service.
                </p>
                <p>
                  <strong className="text-text-primary">
                    Types of Messages.
                  </strong>{" "}
                  Messages are limited to transactional and customer-service
                  communications related to your loan inquiry, including:
                  confirmation of inquiry receipt, appointment confirmations and
                  reminders, document requests for in-progress underwriting,
                  deal status and closing coordination updates, and responses to
                  client-initiated questions. We do not send promotional,
                  marketing, or rate-related SMS messages.
                </p>
                <p>
                  <strong className="text-text-primary">
                    Frequency and Costs.
                  </strong>{" "}
                  Message frequency varies based on the status of your inquiry.
                  Message and data rates may apply, depending on your mobile
                  carrier plan.
                </p>
                <p>
                  <strong className="text-text-primary">Opt-Out.</strong> You
                  can opt out at any time by replying STOP to any message you
                  receive from us. After opting out, you will receive a
                  confirmation message and no further SMS messages will be sent.
                  Reply HELP for help, or contact us directly at{" "}
                  <a
                    href="mailto:dan@shepmo.com"
                    className="text-navy font-medium hover:underline"
                  >
                    dan@shepmo.com
                  </a>{" "}
                  or 408.821.8245.
                </p>
                <p>
                  <strong className="text-text-primary">
                    No Sharing of Mobile Information.
                  </strong>{" "}
                  We do not share, sell, rent, or otherwise disclose mobile
                  phone numbers or SMS opt-in consent information to third
                  parties or affiliates for marketing or promotional purposes.
                  Mobile information may be shared only with subprocessors
                  necessary to deliver the SMS service itself (e.g., our
                  messaging platform), and only for the purpose of delivering
                  messages you have consented to receive.
                </p>
                <p>
                  <strong className="text-text-primary">Carriers.</strong>{" "}
                  Carriers are not liable for delayed or undelivered messages.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                8. Your Rights
              </h2>
              <p className="text-text-secondary leading-relaxed mb-3">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 ml-2">
                <li>
                  Access the personal information we hold about you
                </li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>
                  Request deletion of your personal information, subject to
                  legal retention requirements
                </li>
                <li>Opt out of marketing communications at any time</li>
                <li>
                  Withdraw consent where processing is based on consent
                </li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:dan@shepmo.com"
                  className="text-navy font-medium hover:underline"
                >
                  dan@shepmo.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                9. Data Retention
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We retain your personal information for as long as necessary to
                fulfill the purposes described in this Privacy Policy, unless a
                longer retention period is required or permitted by law.
                Application data and associated documents may be retained for
                regulatory compliance and recordkeeping purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                10. Third-Party Links
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Our Site may contain links to third-party websites. We are not
                responsible for the privacy practices or content of those sites.
                We encourage you to review the privacy policies of any
                third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                11. Children&apos;s Privacy
              </h2>
              <p className="text-text-secondary leading-relaxed">
                Our Site and services are not directed at individuals under the
                age of 18. We do not knowingly collect personal information from
                children. If we become aware that we have inadvertently
                collected information from a child, we will take steps to delete
                it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                12. Changes to This Policy
              </h2>
              <p className="text-text-secondary leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated &quot;Last
                updated&quot; date. Your continued use of the Site after changes
                are posted constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                13. Contact Us
              </h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:{" "}
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
