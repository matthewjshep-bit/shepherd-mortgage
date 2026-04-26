'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  User,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [optIn, setOptIn] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, wire this to your backend / GHL webhook
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-charcoal py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Have a question or want to discuss a deal? Reach out directly — we
            respond within one business day.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-surface-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-border shadow-sm">
                {submitted ? (
                  <div className="text-center py-16 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-accent-green" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy mb-3">
                      Message Sent
                    </h2>
                    <p className="text-text-secondary max-w-md mx-auto">
                      Thank you for reaching out. Daniel will review your
                      message and respond within one business day.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-navy mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-text-secondary mb-8">
                      Fill out the form below and we&apos;ll get back to you
                      promptly.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="contact-first-name"
                            className="block text-sm font-medium text-text-primary mb-1.5"
                          >
                            First Name *
                          </label>
                          <input
                            id="contact-first-name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                            placeholder="First name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contact-last-name"
                            className="block text-sm font-medium text-text-primary mb-1.5"
                          >
                            Last Name *
                          </label>
                          <input
                            id="contact-last-name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-text-primary mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                          placeholder="you@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-sm font-medium text-text-primary mb-1.5"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-medium text-text-primary mb-1.5"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all resize-none"
                          placeholder="Tell us about your project or question..."
                        />
                      </div>

                      {/* SMS Opt-In Checkbox */}
                      <div className="bg-surface-secondary rounded-xl p-4 border border-border">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            id="contact-sms-optin"
                            type="checkbox"
                            checked={optIn}
                            onChange={(e) => setOptIn(e.target.checked)}
                            required
                            className="mt-1 w-4 h-4 rounded border-border text-navy focus:ring-navy/20 shrink-0 cursor-pointer"
                          />
                          <span className="text-sm text-text-secondary leading-relaxed">
                            I agree to receive SMS messages and phone calls from
                            Shepherd Mortgage regarding my inquiry. Message and
                            data rates may apply. Message frequency varies.
                            Reply STOP to opt out at any time. Reply HELP for
                            assistance. View our{' '}
                            <Link
                              href="/privacy"
                              className="text-navy font-medium underline underline-offset-2 hover:text-navy-light"
                            >
                              Privacy Policy
                            </Link>{' '}
                            and{' '}
                            <Link
                              href="/terms"
                              className="text-navy font-medium underline underline-offset-2 hover:text-navy-light"
                            >
                              Terms of Service
                            </Link>
                            .
                          </span>
                        </label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-xl hover:bg-navy-light transition-all text-lg cursor-pointer"
                      >
                        Send Message
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Direct Contact */}
              <div className="bg-white rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-navy mb-6">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <p className="text-sm text-text-tertiary">Principal</p>
                      <p className="font-medium text-text-primary">
                        Daniel Shepherd
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:+14088218245"
                    className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-surface-secondary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <p className="text-sm text-text-tertiary">Phone</p>
                      <p className="font-medium text-text-primary">
                        408.821.8245
                      </p>
                    </div>
                  </a>
                  <a
                    href="mailto:dan@shepmo.com"
                    className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-surface-secondary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <p className="text-sm text-text-tertiary">Email</p>
                      <p className="font-medium text-text-primary">
                        dan@shepmo.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-navy mb-6">
                  Office Location
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">
                      20491 Forrest Hills Dr.
                    </p>
                    <p className="text-text-secondary">Saratoga, CA 95070</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-8 border border-border">
                <h3 className="text-lg font-semibold text-navy mb-6">
                  Business Hours
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-navy" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-text-primary font-medium">
                      Monday – Friday
                    </p>
                    <p className="text-text-secondary">8:00 AM – 6:00 PM PT</p>
                    <p className="text-text-tertiary mt-2">
                      Weekend inquiries answered Monday morning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
