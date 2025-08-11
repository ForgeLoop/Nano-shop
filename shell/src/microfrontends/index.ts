export * from './single-spa-config';
export * from './module-federation-loader';

// Estrategias soportadas
export const MicrofrontendStrategy = {
  MODULE_FEDERATION: 'module-federation',
  SINGLE_SPA: 'single-spa'
} as const;

export type MicrofrontendStrategy =
  typeof MicrofrontendStrategy[keyof typeof MicrofrontendStrategy];

// Configuración unificada de cualquier microfrontend
export interface UnifiedMicrofrontendConfig<TCustomProps extends Record<string, unknown> = Record<string, unknown>> {
  name: string;
  strategy: MicrofrontendStrategy;
  path: string;
  
  // Module Federation
  url?: string;
  scope?: string;
  module?: string;

  // Single-SPA
  app?: () => Promise<unknown>;
  activeWhen?: string | string[] | ((location: Location) => boolean);
  customProps?: TCustomProps;
}

// Registro de microfrontends (ejemplos)
export const microfrontendRegistry: UnifiedMicrofrontendConfig[] = [
  /*
  {
    name: 'react-products',
    strategy: MicrofrontendStrategy.MODULE_FEDERATION,
    path: '/products',
    url: 'http://localhost:3001/remoteEntry.js',
    scope: 'products',
    module: './App'
  },
  {
    name: 'vue-catalog',
    strategy: MicrofrontendStrategy.SINGLE_SPA,
    path: '/catalog',
    activeWhen: '/catalog',
    app: () => import('http://localhost:3002/js/app.js'),
    customProps: { theme: 'nano-shop' }
  }
  */
];
