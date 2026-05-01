import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';

export default function ContactPage() {
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
            {/* GHL Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-border shadow-sm">
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Send Us a Message
                </h2>
                <p className="text-text-secondary mb-8">
                  Fill out the form below and we&apos;ll get back to you
                  promptly.
                </p>
                <div style={{ height: '771px' }}>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/UAZYCgYsBflEklfuTQPd"
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                    id="inline-UAZYCgYsBflEklfuTQPd"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Shepherd Mortgage"
                    data-height="771"
                    data-layout-iframe-id="inline-UAZYCgYsBflEklfuTQPd"
                    data-form-id="UAZYCgYsBflEklfuTQPd"
                    title="Shepherd Mortgage"
                  />
                </div>
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

      {/* GHL form embed script */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
