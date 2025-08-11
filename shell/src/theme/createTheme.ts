// createTheme.ts
import { getComponentThemes } from './components';

// Definimos el tipo esperado para tokens (estructura común para light y dark)
export type TokensType = {
  colors: {
    primary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    container: string;
    white: string;
    headerBg: string;
  };
  typography: {
    fontFamily: string;
  };
  spacing?: Record<string, string>;      // opcional
  breakpoints?: Record<string, string>;  // opcional
};

export function createTheme(tokens: TokensType) {
  return {
    token: {
      colorPrimary: tokens.colors.primary,
      colorSuccess: tokens.colors.success,
      colorWarning: tokens.colors.warning,
      colorError: tokens.colors.error,
      colorInfo: tokens.colors.info,
      colorBgBase: tokens.colors.background,
      colorBgContainer: tokens.colors.container,
      fontFamily: tokens.typography.fontFamily,
      colorWhite: tokens.colors.white,
    },
    components: getComponentThemes(tokens),
  }
}
