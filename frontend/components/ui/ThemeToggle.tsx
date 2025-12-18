'use client';

import React from 'react';
import { LightModeIcon, DarkModeIcon } from '@/components/icons';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 rounded-full bg-brand-light-tertiary dark:bg-brand-dark-tertiary cursor-pointer border border-[#19211C]/10 dark:border-white/10 shadow-[inset_2px_4px_8px_0px_rgba(25,33,28,0.3)] dark:shadow-[inset_2px_4px_8px_0px_#19211C]"
      aria-label="Toggle theme"
    >
      {/* Background icons */}
      <div className="flex justify-between w-full px-2 text-gray-500 dark:text-gray-400">
        <LightModeIcon className="w-4 h-4" />
        <DarkModeIcon className="w-4 h-4 text-[#150089] dark:text-gray-400" />
      </div>

      {/* Switch thumb */}
      <div
        className="absolute top-0.6 left-1 flex items-center justify-center w-6 h-6 bg-brand-green rounded-full transform transition-transform duration-300 ease-in-out translate-x-0 dark:translate-x-8 shadow-[0_2px_4.9px_rgba(25,33,28,0.32)] dark:shadow-[0_4px_6.2px_rgba(25,33,28,0.88)]"
      >
        <DarkModeIcon className="w-3.5 h-3.5 text-white hidden dark:block" />
        <LightModeIcon className="w-4 h-4 text-white block dark:hidden" />
      </div>
    </button>
  );
};

export default ThemeToggle;
