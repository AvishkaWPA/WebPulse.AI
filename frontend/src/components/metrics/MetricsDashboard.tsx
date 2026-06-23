import React from 'react';
import { Card } from 'antd';
import {
  FileTextOutlined,
  PictureOutlined,
  LinkOutlined,
  FontSizeOutlined,
  ClockCircleOutlined,
  BulbOutlined,
  PercentageOutlined,
  TagOutlined,
  AlignLeftOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import type { Metrics } from '../../types/audit';
import { SectionHeader } from '../common/SectionHeader';
import { MetricCard } from '../common/MetricCard';

interface MetricsDashboardProps {
  metrics: Metrics;
  responseTime?: number; // optional response time
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics }) => {
  // Helper to determine status for Word Count
  const getWordCountStatus = (count: number) => {
    if (count >= 1000) return 'Good';
    if (count >= 500) return 'Average';
    return 'Poor';
  };

  // Helper to determine status for Internal Links
  const getInternalLinksStatus = (count: number) => {
    if (count >= 15) return 'Good';
    if (count >= 5) return 'Average';
    return 'Poor';
  };

  // Helper to determine status for External Links
  const getExternalLinksStatus = (count: number) => {
    if (count <= 10) return 'Good';
    if (count <= 25) return 'Average';
    return 'Poor';
  };

  // Helper to determine status for H1 Count
  const getH1CountStatus = (count: number) => {
    if (count === 1) return 'Good';
    return 'Poor';
  };

  // Helper to determine status for H2/H3 Count
  const getHeadingStatus = (count: number) => {
    if (count >= 4) return 'Good';
    if (count >= 1) return 'Average';
    return 'Poor';
  };

  // Helper for alt text coverage status
  const getAltCoverageStatus = (coverage: number) => {
    if (coverage >= 90) return 'Good';
    if (coverage >= 60) return 'Average';
    return 'Poor';
  };

  // Helper for CTA count status
  const getCtaStatus = (count: number) => {
    if (count >= 4) return 'Good';
    if (count >= 2) return 'Average';
    return 'Poor';
  };

  // Helper for Text to HTML ratio status
  const getRatioStatus = (ratio: number) => {
    if (ratio >= 35) return 'Good';
    if (ratio >= 20) return 'Average';
    return 'Poor';
  };

  const altCoverage = Math.round(100 - metrics.missingAltPercentage);
  const metaTitleLength = metrics.metaTitle?.length || 0;
  const metaDescLength = metrics.metaDescription?.length || 0;

  // Generate recommendations for Meta tags
  const getMetaTitleRecommendation = () => {
    if (metaTitleLength === 0) return 'Critical: Meta title is missing! Add a title between 50-60 characters to improve search appearance.';
    if (metaTitleLength < 50) return `Improvement: Meta title is too short (${metaTitleLength} chars). Add more descriptive keywords to reach the optimal 50-60 characters.`;
    if (metaTitleLength > 60) return `Improvement: Meta title is too long (${metaTitleLength} chars). Trim the title to under 60 characters to avoid search snippet truncation.`;
    return 'Optimal: Meta title length is perfect (50-60 characters).';
  };

  const getMetaDescRecommendation = () => {
    if (metaDescLength === 0) return 'Critical: Meta description is missing! Add a description between 120-160 characters to summarize your content for search engines.';
    if (metaDescLength < 120) return `Improvement: Meta description is too short (${metaDescLength} chars). Expand the summary to reach the optimal 120-160 characters.`;
    if (metaDescLength > 160) return `Improvement: Meta description is too long (${metaDescLength} chars). Shorten it to under 160 characters to prevent search snippet truncation.`;
    return 'Optimal: Meta description length is perfect (120-160 characters).';
  };

  return (
    <Card 
      className="bg-card-bg border border-border-gray rounded-2xl shadow-card p-6 md:p-8 text-left"
    >

      <SectionHeader 
        title="Factual Metrics" 
        subtitle="Extracted from website structure." 
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Word Count"
          value={metrics.wordCount.toLocaleString()}
          icon={<FileTextOutlined />}
          iconBgColor="bg-success-light"
          iconColor="text-success"
          tooltip="Total words extracted from the visible webpage text."
          status={getWordCountStatus(metrics.wordCount)}
        />
        
        <MetricCard
          title="Images Count"
          value={metrics.imageCount}
          icon={<PictureOutlined />}
          iconBgColor="bg-primary-light"
          iconColor="text-primary"
          tooltip="Total image tags found on the webpage."
          status={metrics.imageCount > 0 ? 'Good' : 'Average'}
        />

        <MetricCard
          title="Internal Links"
          value={metrics.internalLinks}
          icon={<LinkOutlined />}
          iconBgColor="bg-warning-light"
          iconColor="text-warning"
          tooltip="Links pointing to the same website domain."
          status={getInternalLinksStatus(metrics.internalLinks)}
        />

        <MetricCard
          title="External Links"
          value={metrics.externalLinks}
          icon={<GlobalOutlined />}
          iconBgColor="bg-danger-light"
          iconColor="text-danger"
          tooltip="Links pointing to external domains."
          status={getExternalLinksStatus(metrics.externalLinks)}
        />

        <MetricCard
          title="H1 Count"
          value={metrics.h1Count}
          icon={<FontSizeOutlined />}
          iconBgColor="bg-success-light"
          iconColor="text-success"
          tooltip="Number of Heading 1 tags. Best practices suggest exactly one."
          status={getH1CountStatus(metrics.h1Count)}
        />

        <MetricCard
          title="H2 Count"
          value={metrics.h2Count}
          icon={<FontSizeOutlined />}
          iconBgColor="bg-success-light"
          iconColor="text-success"
          tooltip="Number of Heading 2 tags."
          status={getHeadingStatus(metrics.h2Count)}
        />

        <MetricCard
          title="H3 Count"
          value={metrics.h3Count}
          icon={<FontSizeOutlined />}
          iconBgColor="bg-warning-light"
          iconColor="text-warning"
          tooltip="Number of Heading 3 tags."
          status={getHeadingStatus(metrics.h3Count)}
        />

        <MetricCard
          title="Alt Text Coverage"
          value={`${altCoverage}%`}
          icon={<PictureOutlined />}
          iconBgColor="bg-warning-light"
          iconColor="text-warning"
          tooltip="Percentage of images that contain alt text attributes."
          status={getAltCoverageStatus(altCoverage)}
        />

        <MetricCard
          title="CTA Count"
          value={metrics.ctaCount}
          icon={<BulbOutlined />}
          iconBgColor="bg-warning-light"
          iconColor="text-warning"
          tooltip="Estimated count of call-to-action buttons or high-intent links."
          status={getCtaStatus(metrics.ctaCount)}
        />

        <MetricCard
          title="Reading Time"
          value={`${metrics.readingTime} min`}
          icon={<ClockCircleOutlined />}
          iconBgColor="bg-primary-light"
          iconColor="text-primary"
          tooltip="Estimated reading duration for the page content."
          status="approx."
          isStatusPill={false}
        />

        <MetricCard
          title="Content Length"
          value={metrics.wordCount.toLocaleString()}
          icon={<FileTextOutlined />}
          iconBgColor="bg-primary-light"
          iconColor="text-primary"
          tooltip="Text body word details."
          status="words"
          isStatusPill={false}
        />

        <MetricCard
          title="Text To HTML Ratio"
          value={`${Math.round(metrics.textToHtmlRatio)}%`}
          icon={<PercentageOutlined />}
          iconBgColor="bg-warning-light"
          iconColor="text-warning"
          tooltip="Text density compared to total HTML markup size."
          status={getRatioStatus(metrics.textToHtmlRatio)}
        />
      </div>

      <Card 
        className="!mt-6 bg-neutral-bg/40 border border-border-gray rounded-2xl p-6"
      >
        <div className="flex flex-col gap-12 md:flex-row md:gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-sm font-bold text-text-primary">
                <TagOutlined className="text-brand-primary" />
                <span>Meta Title</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                metaTitleLength >= 50 && metaTitleLength <= 60 
                  ? 'bg-success/10 text-success' 
                  : 'bg-warning/10 text-warning'
              }`}>
                {metaTitleLength} characters
              </span>
            </div>
            <div className="p-4 bg-card-bg rounded-xl border border-border-gray text-sm text-text-primary font-mono select-all break-words leading-relaxed">
              {metrics.metaTitle || <span className="text-danger italic font-sans font-normal">No title element detected in document header.</span>}
            </div>
            <div className="mt-2 text-xs font-semibold text-text-secondary">
              <span className="text-brand-primary font-bold">Recommendation:</span> {getMetaTitleRecommendation()}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-sm font-bold text-text-primary">
                <AlignLeftOutlined className="text-brand-primary" />
                <span>Meta Description</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                metaDescLength >= 120 && metaDescLength <= 160 
                  ? 'bg-success/10 text-success' 
                  : 'bg-warning/10 text-warning'
              }`}>
                {metaDescLength} characters
              </span>
            </div>
            <div className="p-4 bg-card-bg rounded-xl border border-border-gray text-sm text-text-primary font-mono select-all break-words leading-relaxed">
              {metrics.metaDescription || <span className="text-danger italic font-sans font-normal">No description meta tag detected in document header.</span>}
            </div>
            <div className="mt-2 text-xs font-semibold text-text-secondary">
              <span className="text-brand-primary font-bold">Recommendation:</span> {getMetaDescRecommendation()}
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default MetricsDashboard;
