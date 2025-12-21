"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ComingSoonProps {
    title: string;
    description: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description }) => {
    const router = useRouter();

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[70vh] w-full bg-white dark:bg-transparent overflow-hidden">

            {/* 1. Subtle Background Grid (Data/Architectural feel) */}
            <div className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: 'radial-gradient(circle, #E5E7EB 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:from-transparent dark:via-brand-dark-primary/50 dark:to-brand-dark-primary pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 animate-fade-in-up">

                {/* 2. Visual Element: Abstract "Building" Icon */}
                <div className="relative mb-8 group">
                    <div className="absolute inset-0 bg-brand-green/20 blur-xl rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="relative w-24 h-24 bg-white dark:bg-brand-dark-secondary rounded-2xl shadow-xl border border-gray-100 dark:border-brand-dark-tertiary flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-all duration-300">
                        <svg className="w-10 h-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>

                        {/* Status Badge floating on icon */}
                        <div className="absolute -top-2 -right-2 bg-brand-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-white dark:border-brand-dark-secondary">
                            WIP
                        </div>
                    </div>
                </div>

                {/* 3. Typography */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
                    {title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm md:text-base leading-relaxed mb-8">
                    {description}
                </p>

                {/* 4. Action */}
                <button
                    onClick={() => router.push('/corporate/dashboard')}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Dashboard</span>
                </button>
            </div>
        </div>
    );
};

export default ComingSoon;
