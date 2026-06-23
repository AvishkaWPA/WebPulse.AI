import React from 'react';
import { ConfigProvider } from 'antd';
import { antdTheme } from './theme/antdTheme';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './pages/DashboardPage';

export const App: React.FC = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    </ConfigProvider>
  );
};

export default App;
