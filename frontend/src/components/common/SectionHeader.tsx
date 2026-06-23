import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`mb-6 text-left ${className}`}>
      <h2 className="text-lg sm:text-2xl font-bold text-text-primary m-0 tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-sm font-medium text-text-secondary mt-1 m-0">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
