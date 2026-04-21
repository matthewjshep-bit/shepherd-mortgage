import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: Logo + Contact + Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
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
              Fast, transparent fix-and-flip bridge loans for real estate investors nationwide.
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
                  href="tel:+14088218163"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  (408) 821-8163
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white/30 shrink-0" />
                <a
                  href="mailto:info@shepherdmortgage.com"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  info@shepherdmortgage.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  Apply Now
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

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} Shepherd Mortgage. All rights reserved.
            </p>
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
