import { THEME } from '../constants/theme';

export type ScoreStatus = 'Good' | 'Average' | 'Poor';

export const getScoreColor = (value: number): string => {
  if (value >= 80) return THEME.colors.success; // Good (Green)
  if (value >= 50) return THEME.colors.warning; // Average (Orange)
  return THEME.colors.danger; // Poor (Red)
};

export const getScoreStatus = (value: number): ScoreStatus => {
  if (value >= 80) return 'Good';
  if (value >= 50) return 'Average';
  return 'Poor';
};

export const getScoreStatusClass = (value: number): string => {
  if (value >= 80) return 'text-success bg-success-light';
  if (value >= 50) return 'text-warning bg-warning-light';
  return 'text-danger bg-danger-light';
};
