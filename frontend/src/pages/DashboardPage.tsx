import React, { useState } from 'react';
import { Input, Button, Alert, Skeleton, Row, Col, Card } from 'antd';
import { 
  GlobalOutlined, 
  SafetyOutlined, 
  ReloadOutlined
} from '@ant-design/icons';
import { ScoreOverview } from '../components/score/ScoreOverview';
import { MetricsDashboard } from '../components/metrics/MetricsDashboard';
import { AiInsights } from '../components/insights/AiInsights';
import { RecommendationsList } from '../components/recommendations/RecommendationsList';
import { EmptyState } from '../components/common/EmptyState';
import { auditApi } from '../services/auditApi';
import { validateClientUrl } from '../utils/urlValidation';
import type { AuditResult } from '../types/audit';

// import heroImg from '../assets/hero.png';
import searchPageImg from '../assets/searchPageImg.png';

export const DashboardPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [inputStatus, setInputStatus] = useState<'' | 'error'>('');
  const [responseTime, setResponseTime] = useState<number>(1.42);

  const handleAnalyze = async () => {
    setError(null);
    setInputStatus('');
    
    if (!url.trim()) {
      setError('Please enter a website URL');
      setInputStatus('error');
      return;
    }

    if (!validateClientUrl(url)) {
      setError('Please enter a valid URL (including http:// or https://)');
      setInputStatus('error');
      return;
    }

    setIsLoading(true);
    const startTime = performance.now();

    try {
      const data = await auditApi.analyzeWebsite(url.trim());
      
      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      setResponseTime(durationSeconds > 0.1 ? durationSeconds : 1.25);
      
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
      setInputStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setError(null);
    setResult(null);
    setInputStatus('');
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto px-4 md:px-8 py-8 flex-grow flex flex-col space-y-8">
      <Card 
        className="bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-6 md:p-8"
      >
        <Row gutter={[32, 32]} align="middle" className="flex-col-reverse md:flex-row">
          <Col xs={24} md={14} className="text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-4 leading-tight">
              Analyze any website in seconds
            </h1>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl mb-8 font-medium">
              Enter a URL below to run a comprehensive website audit. Receive factual website metrics, deterministic score overview, AI insights, and prioritized recommendations.
            </p>

            <div className="max-w-2xl bg-white p-1 rounded-2xl border border-border-gray shadow-soft flex items-center pr-2 focus-within:border-brand-primary transition-all">
              <Input
                size="large"
                placeholder="Enter website URL (e.g. https://example.com)"
                prefix={<GlobalOutlined className="text-[#6B7280] mr-2" />}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                status={inputStatus}
                onPressEnter={handleAnalyze}
                className="flex-grow rounded-xl border-none shadow-none focus:ring-0 focus-visible:outline-none"
                aria-label="Website URL input"
                style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
              />
              <Button
                type="primary"
                size="large"
                loading={isLoading}
                onClick={handleAnalyze}
                className="h-11 px-8 rounded-xl font-bold tracking-wide transition-all shadow-md bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary border-none"
              >
                Analyze
              </Button>
            </div>

            <div className="flex items-center space-x-2 mt-4 mb-2 text-xs font-semibold text-text-secondary">
              <SafetyOutlined className="text-brand-primary text-sm" />
              <span>We scan publicly available content only. No login required.</span>
            </div>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                closable
                onClose={() => setError(null)}
                className="mt-6 max-w-2xl rounded-xl font-semibold border-red-200"
              />
            )}
          </Col>
<Col
  xs={24}
  md={10}
  className="flex justify-center items-center items-center"
>
  <img
    src={searchPageImg}
    alt="WebPulse AI Website Audit Illustration"
    className="max-h-[280px] w-auto object-contain"
  />
</Col>
        </Row>
      </Card>

      <div className="w-full flex-grow">
      {isLoading && (
        <div className="space-y-8 animate-fadeIn mt-8">
          <Card className="rounded-2xl border border-border-gray p-8">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <Skeleton.Avatar active size={120} shape="circle"/>
              <div className="mt-4">
                <Skeleton.Button active shape="round" style={{ width: 120 }}/>
              </div>
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Skeleton.Input active size="small"
                      style={{
                        width: 70,
                        marginBottom: 12,
                      }}
                    />
                    <Skeleton.Button active shape="round"
                      style={{
                        width: 50,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Metrics Dashboard Skeleton */}
          <div>
            <Skeleton.Input
              active
              size="large"
              style={{
                width: 200,
                marginBottom: 24,
                marginTop: 16,
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Card key={i} className="rounded-xl border border-border-gray ">
                    <div className="h-[100px] flex flex-col justify-center ">
                    <Skeleton.Input active size="small"
                      style={{
                        width: 80,
                        marginBottom: 16,
                      }}                  
                    />
                    <Skeleton.Input active size="large"
                      style={{
                        width: 100,
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

        {/* Empty/Ready State */}
        {!isLoading && !result && (
          <div className="py-8 flex flex-col items-center justify-center">
            <EmptyState />
          </div>
        )}

        {/* Results State */}
        {!isLoading && result && (
            <div className="flex flex-col gap-8 animate-fadeIn mt-8">

            <ScoreOverview score={result.score} />

            <MetricsDashboard metrics={result.metrics} responseTime={responseTime} />

            <AiInsights insights={result.insights} score={result.score} ctaCount={result.metrics.ctaCount} />

            <RecommendationsList recommendations={result.recommendations} />

            <div className="flex justify-center pt-8">
              <Button
                type="default"
                size="large"
                icon={<ReloadOutlined />}
                onClick={handleReset}
                className="h-12 px-8 rounded-xl font-bold border-brand-primary text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary/80 transition-colors"
              >
                Analyze Another Website
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
