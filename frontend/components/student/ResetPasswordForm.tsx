'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { confirmResetPassword } from 'aws-amplify/auth';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon } from '@/components/icons';
import Logo from '@/components/ui/Logo';

const ResetPasswordForm: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const validatePassword = (pwd: string) => {
        if (pwd.length < 8) return 'Password must be at least 8 characters long.';
        if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter.';
        if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter.';
        if (!/[0-9]/.test(pwd)) return 'Password must contain at least one number.';
        if (!/[\W_]/.test(pwd)) return 'Password must contain at least one special character.';
        return '';
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email) {
            setError('Email address is required.');
            return;
        }
        if (!otp) {
            setError('Verification Code (OTP) is required.');
            return;
        }

        const pwdError = validatePassword(newPassword);
        if (pwdError) {
            setError(pwdError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            setIsSubmitting(true);
            await confirmResetPassword({
                username: email,
                confirmationCode: otp,
                newPassword: newPassword
            });
            setSuccessMessage('Your password has been updated successfully. You can now log in using your new password.');
        } catch (err: any) {
            console.error('Reset password error:', err);
            setError(err.message || 'Unable to reset password. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const iconColorClass = 'text-brand-green';

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                router.push('/student/login');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, router]);

    // 3️⃣ Password Reset Success Screen
    if (successMessage) {

        return (
            <div className="w-full max-w-md mx-auto p-10 bg-white dark:bg-[#1E2124] rounded-2xl shadow-xl text-center space-y-8 animate-fade-in flex flex-col items-center">
                <Logo className="h-10 w-auto mb-2" />

                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce-short">
                    <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-brand-text-primary dark:text-white">Password Reset Successful</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-4">
                        {successMessage}
                    </p>
                    <p className="text-xs text-gray-400">Redirecting to login in 5 seconds...</p>
                </div>

                <Link
                    href="/student/login"
                    className="w-full text-white bg-brand-green hover:bg-brand-green/90 font-bold rounded-full text-base px-5 py-4 transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                    Go to Login
                </Link>
            </div>
        );
    }

    // 2️⃣ Reset Password Screen
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
                {/* Email Display (Static Text) */}
                <div className="space-y-1">
                    <label className="block font-sans text-[clamp(14px,0.9vw,18px)] font-semibold text-brand-text-light-secondary dark:text-white mb-2 leading-none tracking-[0px]">
                        Email Address
                    </label>
                    <div className="text-base font-semibold text-brand-text-light-primary dark:text-brand-text-secondary px-1 tracking-wide truncate">
                        {email}
                    </div>
                </div>

                {/* OTP Field - 6 Digit Split Input */}
                <div className="space-y-2">
                    <label className="block font-sans text-[clamp(14px,0.9vw,18px)] font-semibold text-brand-text-light-secondary dark:text-white mb-2 leading-none tracking-[0px]">
                        Verification Code (OTP)
                    </label>
                    <div className="flex justify-between gap-2 sm:gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                autoFocus={index === 0}
                                value={otp[index] || ''}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    if (!val && !e.target.value) {
                                        const newOtp = otp.split('');
                                        newOtp[index] = '';
                                        setOtp(newOtp.join(''));
                                        return;
                                    }
                                    if (val) {
                                        const newOtp = otp.split('');
                                        newOtp[index] = val;
                                        setOtp(newOtp.join(''));
                                        if (index < 5) {
                                            const nextInput = document.getElementById(`otp-${index + 1}`);
                                            nextInput?.focus();
                                        }
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        if (!otp[index] && index > 0) {
                                            const prevInput = document.getElementById(`otp-${index - 1}`);
                                            prevInput?.focus();
                                        }
                                        const newOtp = otp.split('');
                                        newOtp[index] = '';
                                        setOtp(newOtp.join(''));
                                    }
                                }}
                                onPaste={(e) => {
                                    e.preventDefault();
                                    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                                    if (pastedData) {
                                        setOtp(pastedData);
                                        const focusIndex = Math.min(pastedData.length, 5);
                                        document.getElementById(`otp-${focusIndex}`)?.focus();
                                    }
                                }}
                                className="w-full aspect-square bg-brand-light-secondary dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-brand-dark-tertiary text-brand-text-light-primary dark:text-brand-text-primary placeholder:text-brand-text-light-secondary dark:placeholder:text-brand-text-secondary text-lg sm:text-xl font-bold rounded-xl text-center outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all"
                                required
                                disabled={isSubmitting}
                            />
                        ))}
                    </div>
                </div>

                {/* New Password Field */}
                <div>
                    <label className="block font-sans text-[clamp(14px,0.9vw,18px)] font-semibold text-brand-text-light-secondary dark:text-white mb-2 leading-none tracking-[0px]">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => {
                                const val = e.target.value;
                                setNewPassword(val);
                                // Real-time validation (Sequential)
                                if (val.length > 0) {
                                    if (val.length < 8) setError('Password must be at least 8 characters long.');
                                    else if (!/[A-Z]/.test(val)) setError('Password must contain at least one uppercase letter.');
                                    else if (!/[a-z]/.test(val)) setError('Password must contain at least one lowercase letter.');
                                    else if (!/[0-9]/.test(val)) setError('Password must contain at least one number.');
                                    else if (!/[\W_]/.test(val)) setError('Password must contain at least one special character.');
                                    else setError(''); // All good
                                } else {
                                    setError('');
                                }
                            }}
                            className="bg-brand-light-secondary dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-brand-dark-tertiary text-brand-text-light-primary dark:text-brand-text-primary placeholder:text-brand-text-light-secondary dark:placeholder:text-brand-text-secondary font-sans text-[clamp(14px,0.83vw,16px)] font-normal leading-none tracking-[0px] rounded-full block w-full pr-12 transition-colors duration-300 focus:ring-brand-green focus:border-brand-green"
                            style={{ padding: 'clamp(14px,1vw,20px)' }}
                            placeholder="Min 8 chars, Upper, Lower, Number, Symbol"
                            required
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4"
                            tabIndex={-1}
                        >
                            {passwordVisible ? (
                                <EyeIcon className={`h-5 w-5 ${iconColorClass}`} />
                            ) : (
                                <EyeOffIcon className={`h-5 w-5 ${iconColorClass}`} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label className="block font-sans text-[clamp(14px,0.9vw,18px)] font-semibold text-brand-text-light-secondary dark:text-white mb-2 leading-none tracking-[0px]">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => {
                                const val = e.target.value;
                                setConfirmPassword(val);
                                if (val && newPassword && val !== newPassword) {
                                    setError('Passwords do not match.');
                                } else if (val && newPassword && val === newPassword) {
                                    // Re-check new password validity to be safe, or clear error
                                    const pwdError = validatePassword(newPassword);
                                    setError(pwdError);
                                }
                            }}
                            className="bg-brand-light-secondary dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-brand-dark-tertiary text-brand-text-light-primary dark:text-brand-text-primary placeholder:text-brand-text-light-secondary dark:placeholder:text-brand-text-secondary font-sans text-[clamp(14px,0.83vw,16px)] font-normal leading-none tracking-[0px] rounded-full block w-full pr-12 transition-colors duration-300 focus:ring-brand-green focus:border-brand-green"
                            style={{ padding: 'clamp(14px,1vw,20px)' }}
                            placeholder="Repeat new password"
                            required
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4"
                            tabIndex={-1}
                        >
                            {confirmPasswordVisible ? (
                                <EyeIcon className={`h-5 w-5 ${iconColorClass}`} />
                            ) : (
                                <EyeOffIcon className={`h-5 w-5 ${iconColorClass}`} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 px-1 animate-fade-in text-red-500 dark:text-red-400 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ padding: 'clamp(14px,1vw,20px)' }}
                    className="w-full text-white bg-brand-green cursor-pointer hover:bg-brand-green/90 focus:ring-4 focus:outline-none focus:ring-brand-green/30 font-sans font-semibold rounded-full text-[clamp(16px,1vw,20px)] leading-none tracking-[0px] text-center transition-colors duration-300 disabled:bg-brand-green/50 disabled:cursor-not-allowed flex justify-center items-center mt-2"
                >
                    {isSubmitting ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : 'Reset Password'}
                </button>

                <div className="text-center pt-1">
                    <Link
                        href="/student/login"
                        className="text-sm font-medium text-brand-text-light-secondary dark:text-brand-text-secondary hover:text-brand-green transition-colors"
                    >
                        Back to Login
                    </Link>
                </div>
            </form>
        </React.Fragment>
    );
};

export default ResetPasswordForm;
