import { lightTokens, darkTokens } from './tokens';
import { createTheme } from './createTheme';

// Exporta explícitamente los temas creados para usarlos individualmente
export const lightTheme = createTheme(lightTokens);
export const darkTheme = createTheme(darkTokens);

// También exporta tokens y componentes para quien los necesite
export { lightTokens, darkTokens };
export * from './components';
