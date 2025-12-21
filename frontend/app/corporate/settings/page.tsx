"use client";

import React from "react";
import Header from "@/components/corporate/Header";
import ComingSoon from "@/components/ui/ComingSoon";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push("/corporate/login");
        sessionStorage.clear();
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
                currentView="settings"
                portalMode="corporate"
                onNavigate={handleNavigate}
                onSwitchPortal={() => router.push('/corporate/profile')}
            />
            <main className="p-6">
                <ComingSoon
                    title="Settings"
                    description="Global configuration and system preferences are under development."
                />
            </main>
        </div>
    );
}
