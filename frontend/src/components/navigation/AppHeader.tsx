import React from 'react';
import { Layout, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Logo } from '../common/Logo';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Header className="!bg-card-bg border-b border-border-gray px-4 md:px-8 h-16 flex items-center justify-between sticky top-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,0.01)] max-w-[1440px] w-full mx-auto">

      <Logo onClick={handleReload} />

      <div className="flex items-center hidden sm:flex">
        <Button 
          type="primary" 
          size="middle" 
          icon={<PlusOutlined />} 
          onClick={handleReload}
          className="rounded-lg shadow-sm bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary border-none text-xs font-bold"
        >
          New Analysis
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
