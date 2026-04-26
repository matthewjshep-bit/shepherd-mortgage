import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, User, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Logo + Contact + Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Shepherd Mortgage"
              width={120}
              height={36}
              className="h-8 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Nationwide Investment Property Lending for Real Estate Investors
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-white/30 shrink-0" />
                <span className="text-sm text-white/40">
                  Daniel Shepherd, Principal
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white/30 shrink-0" />
                <a
                  href="tel:+14088218245"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  408.821.8245
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white/30 shrink-0" />
                <a
                  href="mailto:dan@shepmo.com"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  dan@shepmo.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                <span className="text-sm text-white/40">
                  20491 Forrest Hills Dr.<br />
                  Saratoga, CA 95070
                </span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Lending Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#request"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Request a Loan
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/flip-calculator"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Fix &amp; Flip Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SMS Opt-In Disclaimer */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <p className="text-xs text-white/25 leading-relaxed max-w-3xl">
            By submitting a form on this website, you agree to receive SMS messages and phone calls from Shepherd Mortgage regarding your inquiry. Message and data rates may apply. Message frequency varies. Reply STOP to opt out at any time. Reply HELP for assistance. View our{" "}
            <Link href="/privacy" className="underline hover:text-white/50 transition-colors">Privacy Policy</Link>{" "}
            and{" "}
            <Link href="/terms" className="underline hover:text-white/50 transition-colors">Terms of Service</Link>.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-xs text-white/25">
                &copy; {new Date().getFullYear()} Shepherd Mortgage. All rights
                reserved.
              </p>
              {/* TODO: Replace XXXXXX with real NMLS number */}
              <p className="text-xs text-white/15 mt-1">
                Loans made or arranged pursuant to a California Financing Law
                License. NMLS #XXXXXX.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
