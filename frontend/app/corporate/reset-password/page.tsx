import React, { Suspense } from 'react';
import ResetPasswordForm from '../../../components/corporate/ResetPasswordForm';

export default function CorporateResetPasswordPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#121417]">
            <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
