import React from 'react';
import { Layout } from 'antd';
import { AppHeader } from '../components/navigation/AppHeader';
import { AppFooter } from '../components/footer/AppFooter';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen bg-neutral-bg font-sans flex flex-col">
      <AppHeader />
      <Content className="flex-grow flex flex-col">
        {children}
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
