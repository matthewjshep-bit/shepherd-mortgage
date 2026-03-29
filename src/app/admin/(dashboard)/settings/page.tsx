'use client';

import { useEffect, useState, useTransition } from 'react';
import { fetchRateConfig, fetchCompanySettings, saveRateConfigAction, saveCompanySettingsAction } from '@/app/admin/actions';
import type { RateConfig, RateAdjustments } from '@/types';
import { DEFAULT_RATE_CONFIG } from '@/lib/calculations';
import { Save, Loader2, Sliders, Building } from 'lucide-react';

export default function SettingsPage() {
  const [saving, startSaving] = useTransition();
  const [rateConfig, setRateConfig] = useState<RateConfig>(DEFAULT_RATE_CONFIG);
  const [company, setCompany] = useState({ company_name: 'Shepherd Mortgage', contact_email: '', contact_phone: '', logo_url: '' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [rc, cs] = await Promise.all([fetchRateConfig(), fetchCompanySettings()]);
      if (rc) setRateConfig(rc as RateConfig);
      if (cs) setCompany(cs as any);
      setLoaded(true);
    };
    loadData();
  }, []);

  const updateAdj = (key: keyof RateAdjustments, value: string) => {
    setRateConfig(prev => ({ ...prev, adjustments: { ...prev.adjustments, [key]: parseFloat(value) || 0 } }));
  };

  const handleSave = () => {
    startSaving(async () => {
      await Promise.all([
        saveRateConfigAction({
          base_rate: rateConfig.base_rate,
          base_points: rateConfig.base_points,
          adjustments: { ...rateConfig.adjustments },
        }),
        saveCompanySettingsAction({
          company_name: company.company_name,
          contact_email: company.contact_email,
          contact_phone: company.contact_phone,
        }),
      ]);
    });
  };

  if (!loaded) return <div className="p-8 text-text-tertiary">Loading settings...</div>;

  const adjFields: { key: keyof RateAdjustments; label: string }[] = [
    { key: 'ltv_75_80', label: 'LTV 75-80%' },
    { key: 'ltv_80_85', label: 'LTV 80-85%' },
    { key: 'ltv_85_plus', label: 'LTV 85%+' },
    { key: 'first_time_borrower', label: 'First-Time Borrower' },
    { key: 'low_experience', label: 'Low Experience (1-3 flips)' },
    { key: 'long_term', label: 'Loan Term > 12 months' },
    { key: 'condo_townhome', label: 'Condo / Townhome' },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Settings</h1>
          <p className="text-sm text-text-secondary">Manage rate matrix and company info</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-lg font-medium hover:bg-navy-light transition-colors disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save All
        </button>
      </div>

      {/* Rate Matrix */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Sliders className="w-5 h-5 text-accent-blue" />
          <h2 className="font-heading text-lg font-semibold text-navy">Rate Matrix</h2>
        </div>
        <p className="text-sm text-text-secondary mb-5">
          These values feed the borrower-facing calculator in real time. Changes take effect immediately after saving.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Base Rate (%)</label>
            <input type="number" step="0.1" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={rateConfig.base_rate} onChange={e => setRateConfig(prev => ({ ...prev, base_rate: parseFloat(e.target.value) || 0 }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Origination Points (%)</label>
            <input type="number" step="0.1" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={rateConfig.base_points} onChange={e => setRateConfig(prev => ({ ...prev, base_points: parseFloat(e.target.value) || 0 }))} />
          </div>
        </div>
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Rate Adjustments (+%)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {adjFields.map(f => (
            <div key={f.key} className="flex items-center justify-between bg-surface-secondary rounded-lg p-3">
              <span className="text-sm text-text-primary">{f.label}</span>
              <input type="number" step="0.05" className="w-20 border border-border rounded px-2 py-1 text-sm text-right focus:outline-none focus:ring-2 focus:ring-navy/20" value={rateConfig.adjustments[f.key]} onChange={e => updateAdj(f.key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Company Settings */}
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-5">
          <Building className="w-5 h-5 text-accent-blue" />
          <h2 className="font-heading text-lg font-semibold text-navy">Company Info</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Company Name</label>
            <input type="text" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={company.company_name} onChange={e => setCompany(prev => ({ ...prev, company_name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Contact Email</label>
            <input type="email" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={company.contact_email} onChange={e => setCompany(prev => ({ ...prev, contact_email: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Contact Phone</label>
            <input type="tel" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" value={company.contact_phone} onChange={e => setCompany(prev => ({ ...prev, contact_phone: e.target.value }))} />
          </div>
        </div>
      </div>
    </div>
  );
}
