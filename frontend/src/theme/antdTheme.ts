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
    },
    Card: {
      borderRadiusLG: 12,
    },
    Progress: {
      remainingColor: '#F3F4F6',
    }
  }
};
