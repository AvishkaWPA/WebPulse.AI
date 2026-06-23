import React from 'react';
import { Card, Collapse } from 'antd';
import {
  SearchOutlined,
  MessageOutlined,
  ThunderboltOutlined,
  ReadOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import type { Insights, Score } from '../../types/audit';
import { SectionHeader } from '../common/SectionHeader';
import { StatusBadge } from '../common/StatusBadge';
import { getScoreStatus } from '../../utils/scoreUtils';

interface AiInsightsProps {
  insights: Insights;
  score: Score;
  ctaCount: number;
}

export const AiInsights: React.FC<AiInsightsProps> = ({ insights, score, ctaCount }) => {

  const getCtaStatus = (count: number): 'Good' | 'Average' | 'Poor' => {
    if (count >= 4) return 'Good';
    if (count >= 2) return 'Average';
    return 'Poor';
  };

  const seoStatus = getScoreStatus(score.seo) as 'Good' | 'Average' | 'Poor';
  const contentStatus = getScoreStatus(score.content) as 'Good' | 'Average' | 'Poor';
  const uxStatus = getScoreStatus(score.ux) as 'Good' | 'Average' | 'Poor';
  const ctaStatus = getCtaStatus(ctaCount);
  const messagingStatus = contentStatus;

  const insightItems = [
    {
      title: 'SEO Structure',
      subtitle: 'Evaluation of headings, meta tags, site structure, and on-page SEO.',
      content: insights.seoStructure,
      status: seoStatus,
      icon: <SearchOutlined />,
      iconBgColor: 'bg-[#6C63FF12]',
      iconColor: 'text-[#6C63FF]',
    },
    {
      title: 'Messaging Clarity',
      subtitle: 'Clarity and relevance of your messaging and content.',
      content: insights.messagingClarity,
      status: messagingStatus,
      icon: <MessageOutlined />,
      iconBgColor: 'bg-[#4F8CFF12]',
      iconColor: 'text-[#4F8CFF]',
    },
    {
      title: 'CTA Usage',
      subtitle: 'Effectiveness and visibility of call-to-action elements.',
      content: insights.ctaUsage,
      status: ctaStatus,
      icon: <ThunderboltOutlined />,
      iconBgColor: 'bg-[#EF444412]',
      iconColor: 'text-[#EF4444]',
    },
    {
      title: 'Content Depth',
      subtitle: 'Depth, usefulness, and comprehensiveness of content.',
      content: insights.contentDepth,
      status: contentStatus,
      icon: <ReadOutlined />,
      iconBgColor: 'bg-[#22C55E12]',
      iconColor: 'text-[#22C55E]',
    },
    {
      title: 'UX Concerns',
      subtitle: 'Usability issues and user experience improvements.',
      content: insights.uxConcerns,
      status: uxStatus,
      icon: <DesktopOutlined />,
      iconBgColor: 'bg-[#F59E0B12]',
      iconColor: 'text-[#F59E0B]',
    },
  ];

  return (
    <Card
      className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-6 md:p-8 text-left"
    >
      <SectionHeader
        title="AI Insights"
        subtitle="AI-generated analysis of website content and structure."
        className="mb-8"
      />

      <Collapse
        accordion
        ghost
        expandIconPosition="end"
        className="bg-transparent border-none space-y-3"
      >
        {insightItems.map((item, idx) => (
          <Collapse.Panel
            key={idx}
            className="bg-white border border-[#E5E7EB] rounded-xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all overflow-hidden"
            header={
              <div className="flex items-center justify-between w-full pr-2 select-none">
                <div className="flex items-center space-x-3.5">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 ${item.iconBgColor} ${item.iconColor}`}>
                    <span className="text-lg flex items-center">{item.icon}</span>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm md:text-base font-bold text-text-primary m-0 tracking-tight leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-text-secondary mt-1 mb-0 hidden sm:block">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <StatusBadge status={item.status} className="mr-2" />
              </div>
            }
          >
            <div className="px-1 py-1 text-sm leading-relaxed text-text-secondary font-medium">
              {item.content}
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>
    </Card>
  );
};

export default AiInsights;
