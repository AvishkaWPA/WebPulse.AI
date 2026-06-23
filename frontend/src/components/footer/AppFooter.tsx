import React from 'react';
import { Layout } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { Logo } from '../common/Logo';

const { Footer } = Layout;

export const AppFooter: React.FC = () => {
  return (
    <Footer className="bg-card-bg border-t border-border-gray py-8 text-sm text-text-secondary w-full mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo compact />

        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs font-semibold">
          <a href="#" className="hover:text-brand-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-brand-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-brand-primary transition-colors">
            Contact
          </a>
        </div>

        <div className="flex flex-col items-center sm:items-end gap-1">
          <span className="text-xs">
            © {new Date().getFullYear()} <strong>WebPulse AI</strong>. All rights reserved.
          </span>
          <span className="flex items-center gap-1 text-[10px] text-text-secondary font-medium">
            Built with <HeartFilled className="text-red-500 text-[10px]" /> using React & Spring Boot.
          </span>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
