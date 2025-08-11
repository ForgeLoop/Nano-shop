import { registerApplication, start } from 'single-spa';
import type { LifeCycles } from 'single-spa';
import { microfrontendRegistry, MicrofrontendStrategy } from './index';

export function registerSingleSpaApps() {
  microfrontendRegistry
    .filter(app => app.strategy === MicrofrontendStrategy.SINGLE_SPA)
    .forEach(app => {
      if (typeof app.app === 'function' && app.activeWhen) {
        registerApplication({
          name: app.name,
          app: app.app as () => Promise<LifeCycles<unknown>>,
          activeWhen: app.activeWhen,
          customProps: app.customProps ?? {}
        });
      }
    });
}

export function startSingleSpa() {
  start();
}
