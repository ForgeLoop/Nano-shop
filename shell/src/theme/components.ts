import type { TokensType } from './createTheme';

export function getComponentThemes(tokens: TokensType) {
  return {
    Layout: {
      headerBg: tokens.colors.headerBg,
      headerHeight: 64,
      bodyBg: tokens.colors.background,
      siderBg: '#001529',
    },
    Menu: {
      darkItemBg: '#001529',
      darkItemColor: '#ffffff',
      darkItemHoverBg: tokens.colors.primary,
      darkItemSelectedBg: tokens.colors.primary,
    },
    Button: {
      primaryColor: tokens.colors.primary,
      borderRadius: 6,
    },
    Card: {
      borderRadius: 8,
      boxShadowTertiary: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24)',
    }
  }
}