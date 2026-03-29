'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApplications } from '@/app/admin/actions';
import { formatCurrency, formatPercent, formatDate, formatStatus, getStatusColor } from '@/lib/format';
import type { LoanApplication, DashboardKPIs, ApplicationStatus } from '@/types';
import { TrendingUp, FileText, DollarSign, BarChart3, Users } from 'lucide-react';

export default function DashboardPage() {
  const [kpis, setKPIs] = useState<DashboardKPIs | null>(null);
  const [recentApps, setRecentApps] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const apps = await fetchApplications();

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      const statusBreakdown: Record<ApplicationStatus, number> = {
        new: 0, in_review: 0, approved: 0, declined: 0, funded: 0, closed: 0,
      };
      let totalLoanVolume = 0;
      let totalLTV = 0;
      let thisMonthCount = 0;

      apps.forEach((app) => {
        statusBreakdown[app.status as ApplicationStatus] = (statusBreakdown[app.status as ApplicationStatus] || 0) + 1;
        totalLoanVolume += app.loan_amount_requested || 0;
        totalLTV += app.ltv || 0;
        if (app.created_at >= startOfMonth) thisMonthCount++;
      });

      setKPIs({
        totalApplications: apps.length,
        applicationsThisMonth: thisMonthCount,
        statusBreakdown,
        totalLoanVolume,
        averageLTV: apps.length > 0 ? totalLTV / apps.length : 0,
      });

      setRecentApps(apps.slice(0, 10));
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-text-tertiary">Loading dashboard...</div>
      </div>
    );
  }

  const kpiCards = kpis ? [
    { label: 'Total Applications', value: kpis.totalApplications.toString(), icon: FileText, color: 'text-accent-blue' },
    { label: 'This Month', value: kpis.applicationsThisMonth.toString(), icon: Users, color: 'text-accent-green' },
    { label: 'Loan Volume', value: formatCurrency(kpis.totalLoanVolume), icon: DollarSign, color: 'text-accent-amber' },
    { label: 'Avg LTV', value: formatPercent(kpis.averageLTV), icon: TrendingUp, color: 'text-purple-500' },
  ] : [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-sm text-text-secondary">Pipeline overview and recent activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiCards.map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-secondary">{card.label}</span>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-bold text-navy">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Status Breakdown */}
      {kpis && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {(Object.entries(kpis.statusBreakdown) as [ApplicationStatus, number][]).map(([status, count]) => (
            <div key={status} className="bg-white rounded-lg border border-border p-3 text-center">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {formatStatus(status)}
              </span>
              <p className="text-lg font-bold text-navy mt-1">{count}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Applications */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-blue" />
            <h2 className="font-heading text-lg font-semibold text-navy">Recent Applications</h2>
          </div>
          <Link href="/admin/applications" className="text-sm text-accent-blue hover:underline font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-secondary">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Ref #</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Borrower</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Property</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Loan Amount</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">LTV</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentApps.map(app => (
                <tr key={app.id} className="hover:bg-surface-secondary transition-colors cursor-pointer" onClick={() => window.location.href = `/admin/applications/${app.id}`}>
                  <td className="px-5 py-3 font-mono text-navy font-medium">{app.ref_number}</td>
                  <td className="px-5 py-3">{app.borrower_name}</td>
                  <td className="px-5 py-3 text-text-secondary max-w-[200px] truncate">{app.property_address}</td>
                  <td className="px-5 py-3 text-right font-medium">{formatCurrency(app.loan_amount_requested)}</td>
                  <td className="px-5 py-3 text-right">{formatPercent(app.ltv)}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {formatStatus(app.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-text-secondary">{formatDate(app.created_at)}</td>
                </tr>
              ))}
              {recentApps.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-text-tertiary">No applications yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
