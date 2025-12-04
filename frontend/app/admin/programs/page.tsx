"use client";

import React from 'react';
import Header from '@/components/admin/Sidebar';
import ProgramsManagement from '@/components/admin/ProgramsManagement';
import { useRouter } from 'next/navigation';
import RequireAdmin from '@/components/auth/RequireAdmin';   // 👈 add this

export default function RegistrationsPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/admin/login');
  };

  const handleNavigate = (view: 'dashboard' | 'programs') => {
    if (view === 'dashboard') router.push('/admin');
    if (view === 'programs') router.push('/admin/programs');
  };

  return (
    <RequireAdmin>   {/* 👈 protect this whole page */}
      <div className="min-h-screen bg-transparent">
        <Header
          onLogout={handleLogout}
          currentView={"programs" as any}
          portalMode="admin"
          onNavigate={handleNavigate as any}
        />
        <main className="p-6">
          <ProgramsManagement />
        </main>
      </div>
    </RequireAdmin>
  );
}
