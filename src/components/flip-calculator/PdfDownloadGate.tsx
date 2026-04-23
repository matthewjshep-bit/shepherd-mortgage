'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, X } from 'lucide-react';

const GHL_FORM_ID = process.env.NEXT_PUBLIC_GHL_FORM_ID ?? '';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => Promise<void> | void;
}

export function PdfDownloadGate({ isOpen, onClose, onDownload }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [downloadFailed, setDownloadFailed] = useState(false);
  const scriptLoaded = useRef(false);

  // Stable callback refs to avoid stale closures in effects
  const onDownloadRef = useRef(onDownload);
  onDownloadRef.current = onDownload;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Check LocalStorage on mount for prior unlock
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('ff_pdf_unlocked') === 'true') {
      setUnlocked(true);
    }
  }, []);

  // Load GHL embed script once per page lifetime
  useEffect(() => {
    if (!isOpen || scriptLoaded.current) return;
    const existing = document.querySelector(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
    scriptLoaded.current = true;
  }, [isOpen]);

  // Repeat visitor: skip the modal, download immediately
  useEffect(() => {
    if (isOpen && unlocked) {
      (async () => {
        try {
          await onDownloadRef.current();
        } catch (err) {
          console.error('PDF download failed:', err);
        }
        onCloseRef.current();
      })();
    }
  }, [isOpen, unlocked]);

  // Listen for GHL form success postMessage
  useEffect(() => {
    if (!isOpen || unlocked) return;

    function handleMessage(event: MessageEvent) {
      if (
        !event.origin.includes('leadconnectorhq.com') &&
        !event.origin.includes('msgsndr.com')
      )
        return;

      const data = event.data ?? {};
      const isSuccess =
        data.type === 'form_submission_success' ||
        data.event === 'form:submit:success' ||
        data.action === 'form-submitted' ||
        data.eventName === 'formSubmitSuccess';

      if (!isSuccess) return;

      localStorage.setItem('ff_pdf_unlocked', 'true');
      setUnlocked(true);

      // Analytics
      const w = window as Window & { gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void };
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'pdf_download_gate_submitted');
      }
      if (typeof w.fbq === 'function') {
        w.fbq('track', 'Lead', {
          content_name: 'Fix Flip PDF Download',
        });
      }

      // Small delay so user sees the form confirmation before download fires
      setTimeout(async () => {
        try {
          await onDownloadRef.current();
          onCloseRef.current();
        } catch (err) {
          console.error('PDF download failed after form submission:', err);
          setDownloadFailed(true);
        }
      }, 600);
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isOpen, unlocked]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen && !unlocked) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, unlocked]);

  if (!isOpen || unlocked) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-gate-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[440px] rounded-2xl border border-calc-border bg-calc-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1 text-calc-muted transition hover:bg-calc-surface-hover hover:text-calc-text cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-calc-accent/10">
            <Download className="h-5 w-5 text-calc-accent" />
          </div>
          <h2
            id="pdf-gate-title"
            className="text-xl font-semibold tracking-tight text-calc-heading"
          >
            Download your deal report
          </h2>
          <p className="mt-1 text-sm text-calc-muted">
            Enter your email and your PDF will download instantly.
          </p>
        </div>

        {/* GHL Form Iframe */}
        {GHL_FORM_ID ? (
          <iframe
            src={`https://api.leadconnectorhq.com/widget/form/${GHL_FORM_ID}`}
            style={{ width: '100%', height: '220px', border: 'none' }}
            id={`inline-${GHL_FORM_ID}`}
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="Fix & Flip PDF Download"
            data-height="220"
            data-layout-iframe-id={`inline-${GHL_FORM_ID}`}
            data-form-id={GHL_FORM_ID}
            title="Fix & Flip PDF Download"
          />
        ) : (
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
            <p className="text-calc-muted">
              Form not configured. Set <code className="text-calc-text">NEXT_PUBLIC_GHL_FORM_ID</code> in your environment.
            </p>
            <button
              type="button"
              onClick={async () => {
                await onDownload();
                onClose();
              }}
              className="mt-2 text-sm font-semibold text-calc-accent underline hover:text-calc-accent/80 cursor-pointer"
            >
              Download PDF directly
            </button>
          </div>
        )}

        {downloadFailed && (
          <div className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm">
            <p className="text-calc-text">
              Download didn&apos;t start?{' '}
              <button
                type="button"
                onClick={async () => {
                  await onDownload();
                  onClose();
                }}
                className="font-semibold text-calc-accent underline hover:text-calc-accent/80 cursor-pointer"
              >
                Click here to download manually
              </button>
            </p>
          </div>
        )}

        <p className="mt-4 text-center text-[11px] text-calc-muted/60">
          Your PDF will download automatically after submitting.
        </p>
      </div>
    </div>
  );
}
