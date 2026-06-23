import React from 'react';
import logoImg from '../../assets/logo.png';

interface LogoProps {
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ compact = false, className = '', onClick }) => {
  return (
    <div 
      className={`flex items-center space-x-1 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <img src={logoImg} alt="WebPulse AI Logo" className="w-9 h-9 rounded-xl object-contain flex-shrink-0" />

      <div className="flex flex-col text-left">
        <span className="sm:text-base text-sm  font-extrabold tracking-tight text-text-primary leading-none">
          WebPulse <span className="text-brand-primary">AI</span>
        </span>
        {!compact && (
          <span className="text-[10px] font-semibold text-text-secondary mt-1 leading-none">
            AI-Powered Website Audit & Insights
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
