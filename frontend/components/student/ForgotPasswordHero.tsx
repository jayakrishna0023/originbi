import React from 'react';

interface ForgotPasswordHeroProps {
    variant?: 'forgot' | 'reset';
}

const ForgotPasswordHero: React.FC<ForgotPasswordHeroProps> = ({ variant = 'reset' }) => {

    // Content Configuration based on variant
    const content = {
        forgot: {
            title: "Recovery Made Simple",
            description: "Enter your registered email address and we'll send you a secure verification code to get you back on track.",
            badge: "Instant Delivery",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            checkIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            )
        },
        reset: {
            title: "Secure Recovery",
            description: "We've made recovering your account safe and simple. Follow the instructions sent to your email to get back on track instantly.",
            badge: "Instant Verification",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            checkIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            )
        }
    };

    const activeContent = content[variant];

    return (
        <div className="relative w-full h-full bg-white dark:bg-brand-dark-secondary rounded-3xl overflow-hidden p-8 flex flex-col justify-center items-center shadow-2xl transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Vector Patterns */}
                <div className="absolute inset-0 bg-[url('/Background_Light_Theme.svg')] bg-cover bg-center opacity-30 dark:hidden mix-blend-multiply" />
                <div className="absolute inset-0 bg-[url('/Background_Dark_Theme.svg')] bg-cover bg-center opacity-20 hidden dark:block text-brand-green" />

                {/* Gradient Blobs */}
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-brand-green/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-sm w-full flex flex-col items-center text-center">
                {/* Animated Icon Container */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-brand-green/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-24 h-24 bg-gradient-to-tr from-brand-green/10 to-brand-green/5 rounded-full flex items-center justify-center shadow-inner ring-1 ring-brand-green/20 backdrop-blur-sm text-brand-green">
                        {activeContent.icon}
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-brand-green rounded-full flex items-center justify-center border-4 border-white dark:border-brand-dark-secondary shadow-lg">
                        {activeContent.checkIcon}
                    </div>
                </div>

                <h3 className="text-3xl font-bold text-brand-text-light-primary dark:text-white mb-4 animate-fade-in delay-100 font-sans tracking-tight transition-colors duration-300">
                    {activeContent.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed animate-fade-in delay-200 transition-colors duration-300">
                    {activeContent.description}
                </p>

                <div className="mt-8 py-2 px-4 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-semibold animate-fade-in delay-300">
                    <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {activeContent.badge}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordHero;
