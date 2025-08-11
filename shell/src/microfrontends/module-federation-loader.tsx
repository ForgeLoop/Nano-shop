// Declaraciones globales para variables webpack Module Federation
declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };

import { microfrontendRegistry, MicrofrontendStrategy } from './index';

// Carga dinámica para Module Federation
export async function loadModuleFederationApp(scope: string, module: string) {
  await __webpack_init_sharing__('default');

  const container = (window as any)[scope];
  if (!container) throw new Error(`Scope ${scope} no encontrado`);

  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  return factory();
}

// Inicializar apps Module Federation
export async function initModuleFederationApps() {
  const mfApps = microfrontendRegistry.filter(
    app => app.strategy === MicrofrontendStrategy.MODULE_FEDERATION
  );

  for (const app of mfApps) {
    if (app.url && app.scope && app.module) {
      const script = document.createElement('script');
      script.src = app.url;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = async () => {
        const module = await loadModuleFederationApp(app.scope!, app.module!);
        if (module?.mount) module.mount();
      };
      document.head.appendChild(script);
    }
  }
}
