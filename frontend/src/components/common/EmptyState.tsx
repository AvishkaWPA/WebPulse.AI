import React from 'react';
import { Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const EmptyState: React.FC = () => {
  return (
    <Card 
      className="bg-card-bg border border-border-gray rounded-2xl p-8 w-full text-center shadow-card"
      bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}
    >
      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary mb-6">
        <SearchOutlined className="text-3xl" />
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2 m-0 tracking-tight">
        Ready to Audit Your Website?
      </h3>
      <p className="text-sm font-medium text-text-secondary leading-relaxed max-w-md m-0">
        Enter a publicly accessible URL in the search input above. We'll crawl its HTML structure and generate a comprehensive SEO, UX, and Content report.
      </p>
    </Card>
  );
};

export default EmptyState;
