import React, { useState } from 'react';
import { Card } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { StatusBadge } from './StatusBadge';

interface InsightCardProps {
  title: string;
  subtitle: string;
  content: string;
  status: 'Good' | 'Average' | 'Poor';
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  subtitle,
  content,
  status,
  icon,
  iconBgColor = 'bg-[#6C63FF12]',
  iconColor = 'text-[#6C63FF]',
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={`bg-white border border-[#E5E7EB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 rounded-xl mb-4 overflow-hidden cursor-pointer`}
      bodyStyle={{ padding: 0 }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header Row */}
      <div className="p-5 flex items-center justify-between gap-4 select-none">
        {/* Left Side: Icon, Title & Subtitle */}
        <div className="flex items-center space-x-4 flex-grow min-w-0">
          <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${iconBgColor} ${iconColor}`}>
            <span className="text-xl flex items-center">{icon}</span>
          </div>
          <div className="min-w-0 flex-grow">
            <h4 className="text-base font-bold text-text-primary m-0 tracking-tight leading-tight">
              {title}
            </h4>
            <p className="text-xs font-medium text-text-secondary mt-1 m-0 truncate">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Status Badge & Chevron */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <StatusBadge status={status} />
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-bg border border-border-gray/60 text-text-secondary text-xs">
            {expanded ? <UpOutlined /> : <DownOutlined />}
          </div>
        </div>
      </div>

      {/* Expanded Content Section */}
      {expanded && (
        <div className="px-5 pb-5 pt-1 border-t border-border-gray/50 bg-[#F8F9FC]/40 animate-fadeIn">
          <p className="text-sm font-medium leading-relaxed text-text-secondary m-0">
            {content}
          </p>
        </div>
      )}
    </Card>
  );
};

export default InsightCard;
