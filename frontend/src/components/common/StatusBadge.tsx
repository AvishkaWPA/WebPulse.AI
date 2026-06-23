import React from 'react';

export type BadgeStatus = 'Good' | 'Average' | 'Poor' | 'Needs Improvement' | string;

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const norm = (status || '').toString().toLowerCase().trim();
  
  let bgClass = 'bg-gray-100 text-gray-600 border-gray-200';
  let text = status;

  if (norm === 'good' || norm === 'success' || norm === 'present') {
    bgClass = 'bg-[#22C55E12] text-[#22C55E] border-[#22C55E24]';
    text = 'Good';
  } else if (norm === 'average' || norm === 'warning' || norm === 'needs improvement') {
    bgClass = 'bg-[#F59E0B12] text-[#F59E0B] border-[#F59E0B24]';
    text = 'Average';
  } else if (norm === 'poor' || norm === 'danger' || norm === 'error' || norm === 'missing') {
    bgClass = 'bg-[#EF444412] text-[#EF4444] border-[#EF444424]';
    text = 'Poor';
  }

  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${bgClass} ${className}`}>
      {text}
    </span>
  );
};

export default StatusBadge;
