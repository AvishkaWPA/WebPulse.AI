import React from 'react';
import { ArrowUpOutlined, ArrowRightOutlined, ArrowDownOutlined } from '@ant-design/icons';

export interface PriorityStyle {
  bg: string;
  text: string;
  icon: React.ReactNode;
  tagColor: 'error' | 'warning' | 'default' | 'success';
}

export const getPriorityStyle = (priority: string): PriorityStyle => {
  const norm = priority.toUpperCase().trim();
  if (norm === 'HIGH') {
    return {
      bg: 'bg-red-50 border-red-100',
      text: 'text-red-600',
      icon: React.createElement(ArrowUpOutlined, { className: 'text-red-500 font-bold' }),
      tagColor: 'error',
    };
  }
  if (norm === 'MEDIUM') {
    return {
      bg: 'bg-amber-50 border-amber-100',
      text: 'text-amber-600',
      icon: React.createElement(ArrowRightOutlined, { className: 'text-amber-500 font-bold' }),
      tagColor: 'warning',
    };
  }
  return {
    bg: 'bg-blue-50 border-blue-100',
    text: 'text-blue-600',
    icon: React.createElement(ArrowDownOutlined, { className: 'text-blue-500 font-bold' }),
    tagColor: 'default',
  };
};

export const getCategoryColor = (category: string): string => {
  const norm = category.toUpperCase().trim();
  if (norm === 'SEO') return 'purple';
  if (norm === 'UX') return 'cyan';
  if (norm === 'CONTENT') return 'blue';
  return 'orange';
};
