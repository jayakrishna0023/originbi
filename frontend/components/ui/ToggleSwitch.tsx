import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
  activeColor?: string;
  onLabel?: string;
  offLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  disabled = false,
  activeColor = "bg-brand-green",
  onLabel = "ON",
  offLabel = "OFF",
}) => {
  return (
    <div
      onClick={!disabled ? onToggle : undefined}
      className={`relative inline-flex items-center w-[56px] h-[26px] shrink-0 rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${isOn
        ? activeColor
        : 'bg-gray-200 dark:bg-gray-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Text Labels */}
      <span className={`text-[9px] font-bold text-white absolute left-2 transition-opacity duration-300 ${isOn ? 'opacity-100' : 'opacity-0'}`}>
        {onLabel}
      </span>
      <span className={`text-[9px] font-bold text-gray-500 absolute right-2 transition-opacity duration-300 ${isOn ? 'opacity-0' : 'opacity-100'}`}>
        {offLabel}
      </span>

      {/* Sliding thumb */}
      <div
        className={`absolute top-[3px] left-[3px] bg-white rounded-full h-5 w-5 shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-[30px]' : 'translate-x-0'
          }`}
      />
    </div>
  );
};

export default ToggleSwitch;
