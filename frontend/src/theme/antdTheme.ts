import { THEME } from '../constants/theme';

export const antdTheme = {
  token: {
    colorPrimary: THEME.colors.primary,
    fontFamily: THEME.fonts.sans,
    borderRadius: 12,
    colorSuccess: THEME.colors.success,
    colorWarning: THEME.colors.warning,
    colorError: THEME.colors.danger,
    colorInfo: THEME.colors.accent,
    colorSuccessBg: 'var(--color-success-light)',
    colorSuccessBorder: 'rgba(34, 197, 94, 0.15)',
    colorWarningBg: 'var(--color-warning-light)',
    colorWarningBorder: 'rgba(245, 158, 11, 0.15)',
    colorErrorBg: 'var(--color-danger-light)',
    colorErrorBorder: 'rgba(239, 68, 68, 0.15)',
    colorInfoBg: 'var(--color-primary-light)',
    colorInfoBorder: 'rgba(108, 99, 255, 0.15)',
    colorBgContainer: THEME.colors.card,
    colorBgLayout: THEME.colors.bg,
    colorText: THEME.colors.text,
    colorTextSecondary: THEME.colors.textSecondary,
    colorBorder: THEME.colors.border,
  },
  components: {
    Button: {
      controlHeightLG: 48,
      borderRadiusLG: 12,
      fontWeight: 600,
    },
    Input: {
      controlHeightLG: 48,
      borderRadiusLG: 12,
      colorBorder: THEME.colors.border,
    },
    Card: {
      borderRadiusLG: 12,
      colorBorderBg: THEME.colors.border,
    },
    Progress: {
      remainingColor: 'var(--color-border-gray)',
    },
    Alert: {
      colorErrorBg: 'var(--color-danger-light)',
      colorErrorBorder: 'rgba(239, 68, 68, 0.15)',
      colorSuccessBg: 'var(--color-success-light)',
      colorSuccessBorder: 'rgba(34, 197, 94, 0.15)',
      colorWarningBg: 'var(--color-warning-light)',
      colorWarningBorder: 'rgba(245, 158, 11, 0.15)',
      colorInfoBg: 'var(--color-primary-light)',
      colorInfoBorder: 'rgba(108, 99, 255, 0.15)',
      colorText: 'var(--color-text-primary)',
    }
  }
};
