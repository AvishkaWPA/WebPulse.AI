import React from 'react';
import { ArrowUpOutlined, ArrowRightOutlined, ArrowDownOutlined } from '@ant-design/icons';

export interface PriorityStyle {
  bg: string;
  text: string;
  icon: React.ReactNode;
  tagColor: 'error' | 'warning' | 'default' | 'success' | 'blue';
}

export const getPriorityStyle = (priority: string): PriorityStyle => {
  const norm = priority.toUpperCase().trim();
  if (norm === 'HIGH') {
    return {
      bg: 'bg-danger-light border-danger/10',
      text: 'text-danger',
      icon: React.createElement(ArrowUpOutlined, { className: 'text-danger font-bold' }),
      tagColor: 'error',
    };
  }
  if (norm === 'MEDIUM') {
    return {
      bg: 'bg-warning-light border-warning/10',
      text: 'text-warning',
      icon: React.createElement(ArrowRightOutlined, { className: 'text-warning font-bold' }),
      tagColor: 'warning',
    };
  }
  return {
    bg: 'bg-accent-light border-accent/10',
    text: 'text-accent',
    icon: React.createElement(ArrowDownOutlined, { className: 'text-accent font-bold' }),
    tagColor: 'blue',
  };
};

export const getCategoryColor = (category: string): string => {
  const norm = category.toUpperCase().trim();
  if (norm === 'SEO') return 'purple';
  if (norm === 'UX') return 'cyan';
  if (norm === 'CONTENT') return 'blue';
  return 'orange';
};
