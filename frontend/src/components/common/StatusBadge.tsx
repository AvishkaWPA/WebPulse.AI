import React from 'react';

export type BadgeStatus = 'Good' | 'Average' | 'Poor' | 'Needs Improvement' | string;

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const norm = (status || '').toString().toLowerCase().trim();
  
  let bgClass = 'bg-neutral-bg text-text-secondary border-border-gray/50';
  let text = status;

  if (norm === 'good' || norm === 'success' || norm === 'present') {
    bgClass = 'bg-success-light text-success border-success/15';
    text = 'Good';
  } else if (norm === 'average' || norm === 'warning' || norm === 'needs improvement') {
    bgClass = 'bg-warning-light text-warning border-warning/15';
    text = 'Average';
  } else if (norm === 'poor' || norm === 'danger' || norm === 'error' || norm === 'missing') {
    bgClass = 'bg-danger-light text-danger border-danger/15';
    text = 'Poor';
  }

  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${bgClass} ${className}`}>
      {text}
    </span>
  );
};

export default StatusBadge;
