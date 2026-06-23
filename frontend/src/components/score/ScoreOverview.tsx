import React from 'react';
import { Card, Progress, Row, Col } from 'antd';
import { THEME } from '../../constants/theme';
import type { Score } from '../../types/audit';
import { SectionHeader } from '../common/SectionHeader';
import { StatusBadge } from '../common/StatusBadge';
import { getScoreStatus } from '../../utils/scoreUtils';

interface ScoreOverviewProps {
  score: Score;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({ score }) => {
  const overallStatus = getScoreStatus(score.overall);

  const categories = [
    { label: 'SEO', value: score.seo },
    { label: 'Content', value: score.content },
    { label: 'UX', value: score.ux },
    { label: 'Best Practices', value: score.bestPractices }
  ];

  return (
    <Card
      className="bg-card-bg border border-border-gray rounded-2xl shadow-card p-6 md:p-8 text-left"
    >
      <SectionHeader
        title="Score Overview"
        subtitle="Overall website quality assessment."
        className="mb-8"
      />

      <div className="flex flex-col items-center justify-center pt-4 pb-8 border-b border-border-gray/70 w-full">
        <div className="relative flex items-center justify-center">
          <Progress
            type="dashboard"
            gapDegree={120}
            percent={score.overall}
            strokeWidth={8}
            strokeColor={{
              '0%': THEME.colors.primary,
              '100%': THEME.colors.secondary,
            }}
            width={180}
            format={(percent) => (
              <div className="flex flex-col items-center justify-center -mt-2">
                <span className="text-5xl font-extrabold text-text-primary tracking-tight">
                  {percent}
                </span>
                <span className="text-xs font-semibold text-text-secondary mt-1">
                  /100
                </span>
              </div>
            )}
          />
        </div>

        <div className="mt-4">
          <StatusBadge status={overallStatus} className="px-5 py-1.5 text-sm uppercase tracking-wider animate-fadeIn" />
        </div>
      </div>

      <div className="w-full pt-8 px-2">
        <Row gutter={[16, 24]} className="justify-center">
          {categories.map((cat, idx) => {
            const catStatus = getScoreStatus(cat.value);
            return (
              <Col xs={24} sm={12} md={6} key={idx} className="text-center">
                <div className="flex flex-col items-center space-y-2 border-r border-border-gray/40 last:border-r-0 md:h-20 justify-center">
                  <span className="text-sm font-bold text-text-primary tracking-tight">
                    {cat.label}
                  </span>
                  <span className="text-xs font-semibold text-text-secondary bg-neutral-bg px-2.5 py-0.5 rounded border border-border-gray">
                    {cat.value}/100
                  </span>
                  <StatusBadge status={catStatus} className="px-3.5 py-0.5 text-[10px]" />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Card>
  );
};

export default ScoreOverview;
