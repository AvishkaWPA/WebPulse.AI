import { THEME } from '../constants/theme';

export const antdTheme = {
  token: {
    colorPrimary: THEME.colors.primary,
    fontFamily: THEME.fonts.sans,
    borderRadius: 12,
    colorSuccess: THEME.colors.success,
    colorWarning: THEME.colors.warning,
    colorError: THEME.colors.danger,
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
    }
  }
};
