'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { fetchApplications } from '@/app/admin/actions';
import { formatCurrency, formatPercent, formatDate, formatStatus, getStatusColor } from '@/lib/format';
import type { LoanApplication, ApplicationStatus } from '@/types';
import Search from 'lucide-react/dist/esm/icons/search';
import Filter from 'lucide-react/dist/esm/icons/filter';

export default function ApplicationsPage() {
  const [apps, setApps] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadApps = async () => {
      const data = await fetchApplications();
      setApps(data);
      setLoading(false);
    };
    loadApps();
  }, []);

  const filtered = useMemo(() => {
    let results = apps;
    if (statusFilter !== 'all') {
      results = results.filter(a => a.status === statusFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(a =>
        a.borrower_name?.toLowerCase().includes(q) ||
        a.property_address?.toLowerCase().includes(q) ||
        a.ref_number?.toLowerCase().includes(q)
      );
    }
    return results;
  }, [search, statusFilter, apps]);

  if (loading) return <div className="p-8 text-text-tertiary">Loading applications...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Applications</h1>
          <p className="text-sm text-text-secondary">{filtered.length} of {apps.length} applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search by name, address, or ref #..."
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-tertiary" />
          <select
            className="border border-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {(['new', 'in_review', 'approved', 'declined', 'funded', 'closed'] as ApplicationStatus[]).map(s => (
              <option key={s} value={s}>{formatStatus(s)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Ref #</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Borrower</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Property</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Loan</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">LTV</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">LTARV</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-surface-secondary transition-colors">
                  <td className="px-5 py-3">
                    <Link href={`/admin/applications/${app.id}`} className="font-mono text-navy font-medium hover:underline">
                      {app.ref_number}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{app.borrower_name}</td>
                  <td className="px-5 py-3 text-text-secondary max-w-[200px] truncate">{app.property_address}</td>
                  <td className="px-5 py-3 text-right font-medium">{formatCurrency(app.loan_amount_requested)}</td>
                  <td className="px-5 py-3 text-right">{formatPercent(app.ltv)}</td>
                  <td className="px-5 py-3 text-right">{formatPercent(app.ltarv)}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {formatStatus(app.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-text-secondary">{formatDate(app.created_at)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-text-tertiary">No applications match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
