import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App';

import { registerSingleSpaApps, startSingleSpa } from '@/microfrontends/single-spa-config';
import { initModuleFederationApps } from '@/microfrontends/module-federation-loader';

// --- Inicializar Single-SPA (vacío por ahora) ---
registerSingleSpaApps();
startSingleSpa();

// --- Inicializar Module Federation (vacío por ahora) ---
initModuleFederationApps();

// --- Renderizar App Host (React) ---
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
