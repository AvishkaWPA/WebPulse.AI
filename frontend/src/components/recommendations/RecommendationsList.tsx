import React from 'react';
import { Card, Tag, Collapse } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { Recommendation } from '../../types/audit';
import { SectionHeader } from '../common/SectionHeader';
import { getPriorityStyle, getCategoryColor } from '../../utils/recommendationUtils';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  return (
    <Card 
      className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-6 md:p-8 text-left"
      bodyStyle={{ padding: 0 }}
    >
      {/* Section Header */}
      <SectionHeader 
        title="Recommendations" 
        subtitle="Actionable improvements to increase website quality." 
        className="mb-8"
      />

      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#22C55E10] text-[#22C55E] flex items-center justify-center mb-4">
              <CheckCircleOutlined className="text-2xl" />
            </div>
            <h4 className="font-bold text-text-primary text-lg m-0">All Clear!</h4>
            <p className="text-sm font-medium text-text-secondary mt-2 max-w-sm m-0">
              No recommendations found. Your website structure is highly optimized!
            </p>
          </div>
        ) : (
          <Collapse 
            accordion 
            ghost 
            expandIconPosition="end"
            className="bg-transparent border-none space-y-3"
          >
            {recommendations.map((rec, index) => {
              const num = index + 1;
              const pStyle = getPriorityStyle(rec.priority);

              return (
                <Collapse.Panel
                  key={index}
                  className="bg-white border border-[#E5E7EB] rounded-xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all overflow-hidden"
                  header={
                    <div className="flex items-center justify-between w-full pr-2 select-none">
                      <div className="flex items-center space-x-3.5 flex-grow min-w-0">
                        {/* Number block */}
                        <div className="w-8 h-8 rounded-lg bg-[#6C63FF10] text-brand-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {num}
                        </div>
                        {/* Title and summary */}
                        <div className="text-left min-w-0 flex-grow pr-4">
                          <h4 className="text-sm md:text-base font-bold text-text-primary m-0 tracking-tight leading-tight truncate">
                            {rec.title}
                          </h4>
                          <p className="text-xs font-semibold text-text-secondary mt-1 mb-0 truncate hidden sm:block">
                            {rec.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Priority Tag */}
                      <Tag 
                        color={pStyle.tagColor} 
                        className="uppercase font-bold text-[10px] tracking-wider px-2.5 py-0.5 rounded border-none shadow-none font-sans mr-2"
                      >
                        {rec.priority}
                      </Tag>
                    </div>
                  }
                >
                  {/* Expandable details body: why it matters, impacted metric, suggested improvement */}
                  <div className="px-1 py-2 text-sm leading-relaxed text-text-secondary font-medium space-y-4">
                    <div>
                      <span className="font-extrabold text-text-primary block mb-1">Why it matters:</span>
                      <p className="m-0 text-xs md:text-sm">{rec.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#E5E7EB]/50 mt-3 text-xs md:text-sm">
                      <div>
                        <span className="font-extrabold text-text-primary block mb-1">Impacted Metric:</span>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="bg-neutral-bg px-2.5 py-0.5 rounded font-mono border border-border-gray/70 text-text-primary text-[10.5px]">
                            {rec.metricImpacted}
                          </span>
                          <Tag color={getCategoryColor(rec.category)} className="uppercase font-bold text-[9px] tracking-wider rounded border-none shadow-none">
                            {rec.category}
                          </Tag>
                        </div>
                      </div>
                      <div>
                        <span className="font-extrabold text-text-primary block mb-1">Suggested Improvement:</span>
                        <p className="m-0 text-xs md:text-sm italic text-text-secondary/90 leading-normal">
                          Optimize or adjust the page HTML structure relative to '{rec.metricImpacted}' to boost overall compliance score and search snippet display.
                        </p>
                      </div>
                    </div>
                  </div>
                </Collapse.Panel>
              );
            })}
          </Collapse>
        )}
      </div>
    </Card>
  );
};

export default RecommendationsList;
