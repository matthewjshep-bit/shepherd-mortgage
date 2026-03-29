'use client';

import { useEffect, useState, useTransition, use } from 'react';
import { fetchApplication, fetchDocuments, updateApplicationAction } from '@/app/admin/actions';
import { calculateDealEconomics, DEFAULT_RATE_CONFIG } from '@/lib/calculations';
import { formatCurrency, formatCurrencyWithCents, formatPercent, formatDate, formatStatus, getStatusColor, getLTVColor, formatFileSize } from '@/lib/format';
import type { LoanApplication, ApplicationDocument, CalculatorInputs, UnderwritingChecklist, ApplicationStatus } from '@/types';
import { ArrowLeft, FileText, Eye, X, Save, Loader2, CheckSquare, Square, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';
import Link from 'next/link';

const CHECKLIST_ITEMS: { key: keyof UnderwritingChecklist; label: string }[] = [
  { key: 'purchase_contract_reviewed', label: 'Purchase contract reviewed' },
  { key: 'sow_reviewed', label: 'SOW / Rehab budget reviewed' },
  { key: 'proof_of_funds_verified', label: 'Proof of funds verified' },
  { key: 'entity_docs_reviewed', label: 'Entity docs reviewed' },
  { key: 'id_verified', label: 'ID verified' },
  { key: 'title_search_ordered', label: 'Title / lien search ordered' },
  { key: 'appraisal_ordered', label: 'Appraisal / BPO ordered' },
  { key: 'insurance_verified', label: 'Insurance verified' },
  { key: 'loan_docs_prepared', label: 'Loan docs prepared' },
  { key: 'funding_scheduled', label: 'Funding scheduled' },
];

const STATUSES: ApplicationStatus[] = ['new', 'in_review', 'approved', 'declined', 'funded', 'closed'];

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [app, setApp] = useState<LoanApplication | null>(null);
  const [docs, setDocs] = useState<ApplicationDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, startSaving] = useTransition();

  const [status, setStatus] = useState<ApplicationStatus>('new');
  const [notes, setNotes] = useState('');
  const [checklist, setChecklist] = useState<UnderwritingChecklist>({});
  const [approvedAmount, setApprovedAmount] = useState('');
  const [approvedRate, setApprovedRate] = useState('');
  const [approvedPoints, setApprovedPoints] = useState('');
  const [approvedTerm, setApprovedTerm] = useState('');
  const [holdback, setHoldback] = useState('');
  const [conditions, setConditions] = useState('');
  const [viewingDoc, setViewingDoc] = useState<ApplicationDocument | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      const [appData, docsData] = await Promise.all([
        fetchApplication(id),
        fetchDocuments(id),
      ]);
      if (appData) {
        setApp(appData);
        setStatus(appData.status);
        setNotes(appData.lender_notes || '');
        setChecklist(appData.underwriting_checklist || {});
        setApprovedAmount(appData.approved_loan_amount?.toString() || '');
        setApprovedRate(appData.approved_rate?.toString() || '');
        setApprovedPoints(appData.approved_points?.toString() || '');
        setApprovedTerm(appData.approved_term_months?.toString() || '');
        setHoldback(appData.holdback_amount?.toString() || '');
        setConditions(appData.conditions || '');
      }
      setDocs(docsData);
      setLoading(false);
    };
    loadData();
  }, [id]);

  const handleSave = () => {
    startSaving(async () => {
      await updateApplicationAction(id, {
        status,
        lender_notes: notes,
        underwriting_checklist: checklist as Record<string, boolean>,
        approved_loan_amount: approvedAmount ? parseFloat(approvedAmount) : null,
        approved_rate: approvedRate ? parseFloat(approvedRate) : null,
        approved_points: approvedPoints ? parseFloat(approvedPoints) : null,
        approved_term_months: approvedTerm ? parseInt(approvedTerm) : null,
        holdback_amount: holdback ? parseFloat(holdback) : null,
        conditions: conditions || null,
      });
    });
  };

  const toggleChecklist = (key: keyof UnderwritingChecklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) return <div className="p-8 text-text-tertiary">Loading application...</div>;
  if (!app) return <div className="p-8 text-text-tertiary">Application not found.</div>;

  const inputs: CalculatorInputs = {
    propertyAddress: app.property_address,
    purchasePrice: app.purchase_price,
    rehabBudget: app.rehab_budget,
    arv: app.arv,
    loanAmountRequested: app.loan_amount_requested,
    loanTermMonths: app.loan_term_months,
    ficoScore: 0,
    propertyType: app.property_type as CalculatorInputs['propertyType'],
    exitStrategy: app.exit_strategy as CalculatorInputs['exitStrategy'],
    borrowerExperience: app.borrower_experience as CalculatorInputs['borrowerExperience'],
  };
  const outputs = calculateDealEconomics(inputs, DEFAULT_RATE_CONFIG);
  const ltvColor = getLTVColor(outputs.ltarv);
  const colorMap = { green: 'text-accent-green', yellow: 'text-accent-amber', red: 'text-accent-red' };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/applications" className="text-text-tertiary hover:text-navy transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-navy">{app.ref_number}</h1>
            <p className="text-sm text-text-secondary">{app.borrower_name} — {app.property_address}</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-lg font-medium hover:bg-navy-light transition-colors disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Metrics */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-heading text-base font-semibold text-navy mb-4">Deal Metrics</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'LTV', value: formatPercent(outputs.ltv) },
                { label: 'LTC', value: formatPercent(outputs.ltc) },
                { label: 'LTARV', value: formatPercent(outputs.ltarv) },
              ].map(m => (
                <div key={m.label} className={`rounded-lg border p-3 text-center ${ltvColor === 'green' ? 'bg-emerald-50 border-emerald-200' : ltvColor === 'yellow' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                  <p className="text-xs opacity-60 mb-0.5">{m.label}</p>
                  <p className={`text-xl font-bold ${colorMap[ltvColor]}`}>{m.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex justify-between"><span className="text-text-tertiary">Purchase Price</span><span className="font-medium">{formatCurrency(app.purchase_price)}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Rehab Budget</span><span className="font-medium">{formatCurrency(app.rehab_budget)}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">ARV</span><span className="font-medium">{formatCurrency(app.arv)}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Loan Requested</span><span className="font-medium">{formatCurrency(app.loan_amount_requested)}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Est. Rate</span><span className="font-medium">{formatPercent(outputs.estimatedRate, 2)}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Monthly Payment</span><span className="font-medium">{formatCurrencyWithCents(outputs.monthlyInterestPayment)}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Total Loan Cost</span><span className="font-medium">{formatCurrency(outputs.totalLoanCost)}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Est. Profit</span><span className={`font-medium ${outputs.estimatedProfit >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{formatCurrency(outputs.estimatedProfit)}</span></div>
            </div>
          </div>

          {/* Borrower Info */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-heading text-base font-semibold text-navy mb-4">Borrower Info</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex justify-between"><span className="text-text-tertiary">Name</span><span className="font-medium">{app.borrower_name}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Email</span><span className="font-medium">{app.borrower_email}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Phone</span><span className="font-medium">{app.borrower_phone}</span></div>
              <div className="flex justify-between"><span className="text-text-tertiary">Experience</span><span className="font-medium">{app.borrower_experience}</span></div>
              {app.entity_name && <div className="flex justify-between col-span-2"><span className="text-text-tertiary">Entity</span><span className="font-medium">{app.entity_name} ({app.entity_state})</span></div>}
            </div>
            {app.rehab_plan_description && (
              <div className="mt-4 bg-surface-secondary rounded-lg p-3">
                <p className="text-xs font-medium text-text-secondary mb-1">Rehab Plan</p>
                <p className="text-sm text-text-primary">{app.rehab_plan_description}</p>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-heading text-base font-semibold text-navy mb-4">Documents ({docs.length})</h3>
            {docs.length > 0 ? (
              <div className="space-y-2">
                {docs.map(doc => {
                  const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(doc.file_name);
                  const isPdf = /\.pdf$/i.test(doc.file_name);
                  const isViewable = isImage || isPdf;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => { if (isViewable) { setViewingDoc(doc); setZoom(1); } else { window.open(`/api/documents?path=${encodeURIComponent(doc.storage_path)}`, '_blank'); } }}
                      className="w-full flex items-center gap-3 bg-surface-secondary rounded-lg p-3 border border-border hover:border-navy/30 hover:bg-navy/5 transition-all cursor-pointer text-left group"
                    >
                      {isImage ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-border shrink-0">
                          <img 
                            src={`/api/documents?path=${encodeURIComponent(doc.storage_path)}`}
                            alt={doc.file_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <FileText className="w-4 h-4 text-accent-blue shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.file_name}</p>
                        <p className="text-xs text-text-tertiary">{doc.document_type.replace(/_/g, ' ')} · {formatFileSize(doc.file_size)}</p>
                      </div>
                      <div className="flex items-center gap-1 text-text-tertiary group-hover:text-navy transition-colors">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-medium">View</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-text-tertiary">No documents uploaded.</p>
            )}
          </div>
        </div>

        {/* Right: Underwriting */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-heading text-base font-semibold text-navy mb-3">Status</h3>
            <select className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20" value={status} onChange={e => setStatus(e.target.value as ApplicationStatus)}>
              {STATUSES.map(s => <option key={s} value={s}>{formatStatus(s)}</option>)}
            </select>
          </div>

          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-heading text-base font-semibold text-navy mb-3">Underwriting Checklist</h3>
            <div className="space-y-2">
              {CHECKLIST_ITEMS.map(item => (
                <button key={item.key} type="button" onClick={() => toggleChecklist(item.key)} className="w-full flex items-center gap-3 text-left text-sm py-1.5 hover:bg-surface-secondary rounded px-1 transition-colors">
                  {checklist[item.key] ? <CheckSquare className="w-4 h-4 text-accent-green shrink-0" /> : <Square className="w-4 h-4 text-text-tertiary shrink-0" />}
                  <span className={checklist[item.key] ? 'text-text-primary' : 'text-text-secondary'}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-5 space-y-3">
            <h3 className="font-heading text-base font-semibold text-navy">Proposed Terms</h3>
            {[
              { label: 'Approved Amount ($)', value: approvedAmount, setter: setApprovedAmount },
              { label: 'Approved Rate (%)', value: approvedRate, setter: setApprovedRate },
              { label: 'Approved Points (%)', value: approvedPoints, setter: setApprovedPoints },
              { label: 'Approved Term (months)', value: approvedTerm, setter: setApprovedTerm },
              { label: 'Holdback Amount ($)', value: holdback, setter: setHoldback },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-medium text-text-secondary mb-1">{f.label}</label>
                <input type="text" className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={f.value} onChange={e => f.setter(e.target.value)} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Conditions / Stipulations</label>
              <textarea rows={3} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none" value={conditions} onChange={e => setConditions(e.target.value)} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-heading text-base font-semibold text-navy mb-3">Lender Notes</h3>
            <textarea rows={5} className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 resize-none" placeholder="Internal notes..." value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          <p className="text-xs text-text-tertiary text-center">
            Submitted {formatDate(app.created_at)} · Last updated {formatDate(app.updated_at)}
          </p>
        </div>
      </div>

      {/* ---- Document Viewer Modal ---- */}
      {viewingDoc && (() => {
        const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(viewingDoc.file_name);
        const isPdf = /\.pdf$/i.test(viewingDoc.file_name);
        const docUrl = `/api/documents?path=${encodeURIComponent(viewingDoc.storage_path)}`;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setViewingDoc(null)}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal content */}
            <div className="relative z-10 w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-black/60">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-white/60 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{viewingDoc.file_name}</p>
                    <p className="text-xs text-white/50">{viewingDoc.document_type.replace(/_/g, ' ')} · {formatFileSize(viewingDoc.file_size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isImage && (
                    <>
                      <button
                        onClick={() => setZoom(z => Math.max(0.25, z - 0.25))}
                        className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        title="Zoom out"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-white/50 w-12 text-center">{Math.round(zoom * 100)}%</span>
                      <button
                        onClick={() => setZoom(z => Math.min(4, z + 0.25))}
                        className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        title="Zoom in"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <div className="w-px h-5 bg-white/20 mx-1" />
                    </>
                  )}
                  <button
                    onClick={() => window.open(docUrl, '_blank')}
                    className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewingDoc(null)}
                    className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Viewer area */}
              <div className="flex-1 overflow-auto flex items-center justify-center p-4" onClick={() => setViewingDoc(null)}>
                {isImage && (
                  <img
                    src={docUrl}
                    alt={viewingDoc.file_name}
                    className="max-w-none rounded-lg shadow-2xl transition-transform duration-200"
                    style={{ transform: `scale(${zoom})` }}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {isPdf && (
                  <iframe
                    src={docUrl}
                    className="w-full max-w-5xl h-full rounded-lg shadow-2xl bg-white"
                    title={viewingDoc.file_name}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
