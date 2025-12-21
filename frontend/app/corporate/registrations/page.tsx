"use client";

import React from "react";
import Header from "@/components/corporate/Header";
import MyEmployees from "@/components/corporate/MyEmployees";
import { useRouter } from "next/navigation";

export default function RegistrationsPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Redirect to corporate login (or wherever you prefer)
    router.push("/corporate/login");
  };

  const handleNavigate = (
    view: "dashboard" | "assessment" | "registrations" | "jobs" | "origindata" | "settings"
  ) => {
    if (view === "dashboard") router.push("/corporate/dashboard");
    if (view === "registrations") router.push("/corporate/registrations");
    if (view === "jobs") router.push("/corporate/jobs");
    if (view === "origindata") router.push("/corporate/origindata");
    if (view === "settings") router.push("/corporate/settings");
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Header
        onLogout={handleLogout}
        currentView="registrations"
        portalMode="corporate"
        onNavigate={handleNavigate}
        onSwitchPortal={() => router.push('/corporate/profile')}
      />
      <main className="p-6">
        <MyEmployees />
      </main>
    </div>
  );
}
