import React from 'react';
import { Card, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { StatusBadge } from './StatusBadge';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string; // e.g. 'bg-[#22C55E12]' or similar
  iconColor?: string; // e.g. 'text-[#22C55E]'
  tooltip?: string;
  status?: string; // e.g. 'Good', 'Average', 'Poor' or raw text like 'words', 'approx.'
  isStatusPill?: boolean; // if true, render StatusBadge, else render raw text
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  iconBgColor = 'bg-[#6C63FF12]',
  iconColor = 'text-[#6C63FF]',
  tooltip,
  status,
  isStatusPill = true,
}) => {
  return (
    <Card
      className="bg-white border border-[#E5E7EB] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 rounded-xl flex flex-col h-full justify-between"
      bodyStyle={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
    >
      {/* Top Section: Icon, Title & Tooltip */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${iconBgColor} ${iconColor}`}>
            <span className="text-base flex items-center">{icon}</span>
          </div>
          <span className="text-sm font-semibold text-text-secondary tracking-tight">
            {title}
          </span>
        </div>
        {tooltip && (
          <Tooltip title={tooltip} placement="top">
            <InfoCircleOutlined className="text-text-secondary hover:text-brand-primary cursor-help text-xs transition-colors" />
          </Tooltip>
        )}
      </div>

      {/* Middle Section: Value */}
      <div className="flex-grow flex items-center mb-4">
        <span className="text-3xl font-extrabold text-text-primary tracking-tight">
          {value}
        </span>
      </div>

      {/* Bottom Section: Badge/Label */}
      {status && (
        <div className="mt-auto pt-1 flex items-center">
          {isStatusPill ? (
            <StatusBadge status={status} />
          ) : (
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider bg-neutral-bg px-2 py-1 rounded border border-border-gray/50">
              {status}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
