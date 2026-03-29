'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, ChevronLeft, Database } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { createClient } = await import('@/lib/supabase');
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Local mode — no auth to clear
    }
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-sidebar min-h-screen flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="Shepherd Mortgage" 
            width={280} 
            height={84} 
            className="h-16 w-auto brightness-0 invert"
          />
        </Link>
      </div>

      {/* Local Mode Indicator */}
      <div className="mx-3 mt-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2">
        <Database className="w-3.5 h-3.5 text-white/40" />
        <span className="text-xs text-white/40">Local Storage Mode</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map(item => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-white/50 hover:bg-sidebar-hover hover:text-white/80'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:bg-sidebar-hover hover:text-white/60 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          Borrower Site
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:bg-sidebar-hover hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
